import { notFound } from "next/navigation"
import CustomCursor from "@/app/components/common/CustomCursor"
import TemplateProjet from "@/app/components/feature/TemplateProjet"
import Footer from "@/app/components/layout/Footer"
import Nav from "@/app/components/layout/Nav"
import { getGithubRepoBySlug } from "@/app/lib/github"
import { getProjetBySlug } from "@/app/lib/database"

interface PageProps {
  params: Promise<{ slug: string }>
}

const ProjetDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params

  const [repo, projet] = await Promise.all([
    getGithubRepoBySlug(slug),
    getProjetBySlug(slug),
  ])

  if (!repo) notFound()

  return (
    <>
      <CustomCursor />
      <Nav />
      <main className="min-h-dvh">
        <TemplateProjet repo={repo} projet={projet} />
      </main>
      <Footer />
    </>
  )
}

export default ProjetDetailPage