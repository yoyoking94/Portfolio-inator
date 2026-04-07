import 'server-only';
import type { GitHubRepo, ReadmeContent } from '@/app/types';

const FEATURED_REPOS = [
    'log-inator',
    'fitness-inator',
    'password-inator-2',
    'porfolio-inator',
    'diet-inator',
];

const SECTION_MARKERS: { key: keyof ReadmeContent; markers: string[] }[] = [
    { key: 'presentation', markers: ['la présentation'] },
    { key: 'objectifs', markers: ['les objectifs'] },
    { key: 'etapes', markers: ['les étapes', 'les etapes'] },
    { key: 'acteurs', markers: ['les acteurs'] },
    { key: 'resultats', markers: ['les résultats', 'les resultats'] },
    { key: 'lendemains', markers: ['les lendemains'] },
    { key: 'regard_critique', markers: ['mon regard critique', 'regard critique'] },
];

function parseReadme(rawMarkdown: string): ReadmeContent {
    const result: ReadmeContent = {
        presentation: null, objectifs: null, etapes: null, acteurs: null,
        resultats: null, lendemains: null, regard_critique: null,
    };
    const blocks = rawMarkdown.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
    for (let i = 0; i < blocks.length; i++) {
        const blockLower = blocks[i].toLowerCase();
        for (const { key, markers } of SECTION_MARKERS) {
            if (markers.some((m) => blockLower.startsWith(m))) {
                result[key] = blocks[i + 1]?.trim() ?? null;
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
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
                next: { revalidate: 3600 },
            }
        );
        if (!res.ok) return null;
        const data = await res.json();
        const rawMarkdown = Buffer.from(data.content, 'base64').toString('utf-8');
        return parseReadme(rawMarkdown);
    } catch {
        return null;
    }
}

export async function getGithubRepos(): Promise<GitHubRepo[]> {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;
    if (!token || !username) return [];

    const repos = await Promise.all(
        FEATURED_REPOS.map(async (name) => {
            const res = await fetch(
                `https://api.github.com/repos/${username}/${name}`,
                {
                    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
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


    return filtered;
}

export async function getGithubRepoBySlug(slug: string): Promise<GitHubRepo | null> {
    const repos = await getGithubRepos();

    const repo = repos.find(
        (r) =>
            r.name.toLowerCase() === slug.toLowerCase() ||
            r.html_url.toLowerCase().endsWith(`/${slug.toLowerCase()}`)
    );


    return repo ?? null;
}