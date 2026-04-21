import 'server-only';
import type { GitHubRepo } from '@/app/types';

const FEATURED_REPOS = [
    'pmt-inator',
    'shopwise-inator',
    'if-inator',
    'fitness-inator',
    'portfolio-inator',
];

const fetchRepo = async (username: string, token: string, name: string): Promise<GitHubRepo | null> => {
    const res = await fetch(
        `https://api.github.com/repos/${username}/${name}`,
        {
            headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
            next: { revalidate: 3600 },
        }
    );
    if (!res.ok) return null;
    const repo = await res.json();

    return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
    };
};

export async function getGithubRepos(): Promise<GitHubRepo[]> {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;
    if (!token || !username) return [];

    const repos = await Promise.all(
        FEATURED_REPOS.map((name) => fetchRepo(username, token, name))
    );

    return repos.filter((r): r is GitHubRepo => r !== null);
}

export async function getGithubRepoBySlug(slug: string): Promise<GitHubRepo | null> {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;
    if (!token || !username) return null;

    return fetchRepo(username, token, slug);
}