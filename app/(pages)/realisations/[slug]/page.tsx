import { notFound } from "next/navigation"
import CustomCursor from "@/app/components/common/CustomCursor"
import TemplateProjet from "@/app/components/feature/TemplateProjet"
import Footer from "@/app/components/layout/Footer"
import Nav from "@/app/components/layout/Nav"
import { getGithubRepoBySlug } from "@/app/lib/github"
import type { GitHubRepo } from "@/app/types"

interface PageProps {
    params: Promise<{ slug: string }>
}

const ProjetDetailPage = async ({ params }: PageProps) => {
    const { slug } = await params
    const repo: GitHubRepo | null = await getGithubRepoBySlug(slug)

    if (!repo) notFound()

    return (
        <>
            <CustomCursor />
            <Nav />
            <main className="min-h-dvh py-20">
                <TemplateProjet repo={repo} />
            </main>
            <Footer />
        </>
    )
}

export default ProjetDetailPage