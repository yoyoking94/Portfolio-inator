// app/api/github/route.ts
import { NextResponse } from 'next/server';
import type { GitHubRepo, ReadmeContent } from '@/app/types';

const FEATURED_REPOS = [
    'log-inator',
    'fitness-inator',
    'password-inator-2',
    'porfolio-inator',
    'diet-inator',
];

const README_SECTION_MAP: Record<keyof ReadmeContent, string[]> = {
    presentation: ['présentation', 'presentation'],
    objectifs: ['objectifs', 'contexte', 'enjeux'],
    etapes: ['étapes', 'etapes'],
    acteurs: ['acteurs', 'interactions'],
    resultats: ['résultats', 'resultats'],
    lendemains: ['lendemains'],
    regard_critique: ['regard critique', 'regard'],
};

function parseReadme(rawMarkdown: string): ReadmeContent {
    const result: ReadmeContent = {
        presentation: null, objectifs: null, etapes: null, acteurs: null,
        resultats: null, lendemains: null, regard_critique: null,
    };

    // Tes sections sont séparées par des lignes vides + un label texte suivi de ":"
    const SECTION_MARKERS: { key: keyof ReadmeContent; markers: string[] }[] = [
        { key: 'presentation', markers: ['la présentation'] },
        { key: 'objectifs', markers: ['les objectifs'] },
        { key: 'etapes', markers: ['les étapes', 'les etapes'] },
        { key: 'acteurs', markers: ['les acteurs'] },
        { key: 'resultats', markers: ['les résultats', 'les resultats'] },
        { key: 'lendemains', markers: ['les lendemains'] },
        { key: 'regard_critique', markers: ['mon regard critique', 'regard critique'] },
    ];

    // Découpe le texte en blocs séparés par une ligne vide
    const blocks = rawMarkdown.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

    for (let i = 0; i < blocks.length; i++) {
        const blockLower = blocks[i].toLowerCase();

        for (const { key, markers } of SECTION_MARKERS) {
            if (markers.some((m) => blockLower.startsWith(m))) {
                // Le contenu est le bloc suivant
                const nextBlock = blocks[i + 1]?.trim() ?? null;
                result[key] = nextBlock;
                break;
            }
        }
    }

    return result;
}


async function fetchReadme(
    username: string,
    repoName: string,
    token: string
): Promise<ReadmeContent | null> {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${username}/${repoName}/readme`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
                next: { revalidate: 3600 },
            }
        );
        if (!res.ok) {
            console.log(`[README] ${repoName} → pas de README (${res.status})`);
            return null;
        }

        const data = await res.json();
        const rawMarkdown = Buffer.from(data.content, 'base64').toString('utf-8');


        const parsed = parseReadme(rawMarkdown);


        return parsed;
    } catch (err) {
        console.log(`[README ERROR] ${repoName}:`, err);
        return null;
    }
}


export const revalidate = 3600;

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;

    if (!token || !username) {
        return NextResponse.json({ error: 'Configuration manquante' }, { status: 500 });
    }

    const repos = await Promise.all(
        FEATURED_REPOS.map(async (name) => {
            const res = await fetch(
                `https://api.github.com/repos/${username}/${name}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/vnd.github.v3+json',
                    },
                    next: { revalidate: 3600 },
                }
            );
            if (!res.ok) return null;

            const repo = await res.json() as GitHubRepo;
            const readme = await fetchReadme(username, name, token);

            return { ...repo, readme };
        })
    );

    const filtered = repos.filter((r): r is GitHubRepo => r !== null);
    return NextResponse.json(filtered);
}
