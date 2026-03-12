'use client';

import { GitHubRepo, ReadmeContent } from '@/app/types';
import { useEffect, useState } from 'react';

const PROJECT_TO_COMPETENCES: Record<string, { techniques: string[]; comportementales: string[] }> = {
    "log-inator": { techniques: ["JavaScript", "NoSQL"], comportementales: ["Planification", "Priorisation"] },
    "fitness-inator": { techniques: ["TypeScript"], comportementales: ["Autonomie", "Gestion du temps"] },
    "password-inator-2": { techniques: ["Python"], comportementales: ["Discipline"] },
    "porfolio-inator": { techniques: ["TypeScript", "SQL"], comportementales: ["Adaptabilité"] },
    "diet-inator": { techniques: ["NoSQL"], comportementales: ["Résilience"] },
};

type ReadmeTab = keyof ReadmeContent;
const README_TABS: { key: ReadmeTab; label: string }[] = [
    { key: 'presentation', label: 'Présentation' },
    { key: 'objectifs', label: 'Objectifs' },
    { key: 'etapes', label: 'Étapes' },
    { key: 'acteurs', label: 'Acteurs' },
    { key: 'resultats', label: 'Résultats' },
    { key: 'lendemains', label: 'Lendemains' },
    { key: 'regard_critique', label: 'Regard critique' },
];

function RepoCard({ repo }: { repo: GitHubRepo }) {
    const availableTabs = README_TABS.filter(
        (tab) => repo.readme?.[tab.key] !== null && repo.readme?.[tab.key] !== undefined
    );
    const [activeTab, setActiveTab] = useState<ReadmeTab>(
        availableTabs[0]?.key ?? 'presentation'
    );

    return (
        <article
            className="border-2 border-black flex flex-col"
            style={{ minHeight: '250px', margin: '10px 0 0 0' }}
        >
            <div
                className="flex flex-wrap items-center justify-between border-b-2 border-black shrink-0 gap-2"
                style={{ padding: '8px 12px' }}
            >
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="uppercase tracking-widest font-bold text-sm md:text-base">
                        {repo.name}
                    </h3>
                    {repo.language ? (
                        <span className="border-l border-black text-xs" style={{ padding: '2px 8px' }}>
                            {repo.language}
                        </span>
                    ) : (
                        <span className="border-l border-black text-xs" style={{ padding: '2px 8px' }}>
                            NoSQL
                        </span>
                    )}
                    {repo.stargazers_count > 0 && (
                        <span className="text-xs md:text-sm">★ {repo.stargazers_count}</span>
                    )}
                </div>
                <div className="flex gap-2 shrink-0">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-black text-xs hoverable cursor-none hover:bg-black hover:text-white"
                        style={{ padding: '4px 10px' }}
                    >
                        GitHub
                    </a>
                    {repo.homepage && (
                        <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-black text-xs hoverable cursor-none hover:bg-black hover:text-white"
                            style={{ padding: '4px 10px' }}
                        >
                            🌐 Demo
                        </a>
                    )}
                </div>
            </div>

            {repo.description && (
                <p className="text-xs md:text-sm shrink-0" style={{ padding: '6px 12px' }}>
                    {repo.description}
                </p>
            )}

            {availableTabs.length > 0 ? (
                <>
                    <div className="flex flex-wrap border-b border-black shrink-0">
                        {availableTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{ padding: '4px 10px' }}
                                className={`text-xs hoverable cursor-none border-r border-black
                                    ${activeTab === tab.key
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-gray-100'
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div
                        className="overflow-y-auto flex-1 text-xs md:text-sm leading-relaxed whitespace-pre-wrap"
                        style={{ padding: '8px 12px', maxHeight: '200px' }}
                    >
                        {repo.readme?.[activeTab] ?? (
                            <span className="opacity-50">Non renseigné</span>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center opacity-50 text-sm">
                    Aucune documentation disponible
                </div>
            )}
        </article>
    );
}

function CompetencesLiees({
    repoName,
    onSelectItem,
    onSelectComportementale,
}: {
    repoName: string;
    onSelectItem: (nom: string) => void;
    onSelectComportementale: (nom: string) => void;
}) {
    const competences = PROJECT_TO_COMPETENCES[repoName.toLowerCase()] ?? null;
    if (!competences) return null;

    return (
        <div className="border-2 border-black border-t-0 flex flex-col gap-3" style={{ padding: '12px' }}>
            <p className="uppercase tracking-widest text-xs font-bold">Compétences liées</p>

            {competences.techniques.length > 0 && (
                <div className="flex flex-col gap-1">
                    <p className="uppercase tracking-widest text-xs opacity-60">Techniques</p>
                    <div className="flex flex-wrap gap-2">
                        {competences.techniques.map((nom) => (
                            <button
                                key={nom}
                                onClick={() => onSelectItem(nom)}
                                style={{ padding: '3px 12px' }}
                                className="border border-black text-xs hoverable cursor-none hover:bg-black hover:text-white uppercase tracking-widest"
                            >
                                {nom}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {competences.comportementales.length > 0 && (
                <div className="flex flex-col gap-1">
                    <p className="uppercase tracking-widest text-xs opacity-60">Comportementales</p>
                    <div className="flex flex-wrap gap-2">
                        {competences.comportementales.map((nom) => (
                            <button
                                key={nom}
                                onClick={() => onSelectComportementale(nom)}
                                style={{ padding: '3px 12px' }}
                                className="border border-black text-xs hoverable cursor-none hover:bg-black hover:text-white uppercase tracking-widest"
                            >
                                {nom}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const Projets = () => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeRepo, setActiveRepo] = useState<number | null>(null);

    function scrollToCompetence(section: 'techniques' | 'comportementales', nom: string) {
        const el = document.getElementById('competences');
        if (el) el.scrollIntoView({ behavior: 'smooth' });

        window.dispatchEvent(new CustomEvent('selectCompetence', {
            detail: { section, nom }
        }));
    }

    useEffect(() => {
        fetch('/api/github')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: GitHubRepo[]) => {
                setRepos(data);
                setActiveRepo(data[0]?.id ?? null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <section><p>Chargement...</p></section>;
    if (error) return <section><p>Erreur : {error}</p></section>;

    const selectedRepo = repos.find((r) => r.id === activeRepo);

    return (
        <section id='projets' className="scroll-mt-[8dvh]">
            <h2 className="flex items-center place-content-around" style={{ height: '50px', width: '100%' }}>
                Projets
            </h2>

            <div className="w-full" style={{ padding: '0 10px' }}>
                <div className="flex flex-wrap gap-1 mb-3">
                    {repos.map((repo) => (
                        <button
                            key={repo.id}
                            onClick={() => setActiveRepo(repo.id)}
                            style={{ padding: '6px 14px' }}
                            className={`hoverable cursor-none text-xs md:text-sm
                                ${activeRepo === repo.id
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black border'
                                }
                            `}
                        >
                            {repo.name}
                        </button>
                    ))}
                </div>

                {selectedRepo && (
                    <>
                        <RepoCard repo={selectedRepo} />
                        <CompetencesLiees
                            repoName={selectedRepo.name}
                            onSelectItem={(nom) => scrollToCompetence('techniques', nom)}
                            onSelectComportementale={(nom) => scrollToCompetence('comportementales', nom)}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default Projets;
