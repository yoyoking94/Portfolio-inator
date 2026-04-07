import { NextResponse } from 'next/server';
import { getGithubRepos } from '@/app/lib/github';

export const revalidate = 3600;

export async function GET() {
    const repos = await getGithubRepos();
    return NextResponse.json(repos);
}