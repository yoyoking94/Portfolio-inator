import CustomCursor from "@/app/components/common/CustomCursor"
import TemplateCompetence from "@/app/components/feature/TemplateCompetence"
import Footer from "@/app/components/layout/Footer"
import Nav from "@/app/components/layout/Nav"
import { getCompetenceTechniqueItemBySlug, getCompetenceComportementaleBySlug } from "@/app/lib/database"
import { CompetenceDetailData } from "@/app/types"
import { notFound } from "next/navigation"


interface Props {
    params: Promise<{ slug: string }>
}

const CompetenceDetailPage = async ({ params }: Props) => {
    const { slug } = await params

    const techItem = await getCompetenceTechniqueItemBySlug(slug)

    if (techItem) {
        const data: CompetenceDetailData = {
            type: 'technique',
            competenceTechniqueItem: techItem,
        }
        return (
            <>
                <CustomCursor />
                <Nav />
                <main className="min-h-dvh py-20">
                    <TemplateCompetence data={data} />
                </main>
                <Footer />
            </>
        )
    }

    const compItem = await getCompetenceComportementaleBySlug(slug)

    if (compItem) {
        const data: CompetenceDetailData = {
            type: 'comportementale',
            competenceComportementale: compItem,
        }
        return (
            <>
                <CustomCursor />
                <Nav />
                <main className="min-h-dvh py-20">
                    <TemplateCompetence data={data} />
                </main>
                <Footer />
            </>
        )
    }

    notFound()
}

export default CompetenceDetailPage