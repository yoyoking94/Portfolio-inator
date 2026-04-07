import { notFound } from "next/navigation";
import CustomCursor from "@/app/components/common/CustomCursor";
import TemplateCompetence from "@/app/components/feature/TemplateCompetence";
import Footer from "@/app/components/layout/Footer";
import Nav from "@/app/components/layout/Nav";
import {
    getCompetenceTechniqueItemBySlug,
    getCompetenceComportementaleBySlug,
} from "@/app/lib/database";
import type {
    CompetenceDetailData,
} from "@/app/types";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const CompetencePage = async ({ params }: PageProps) => {
    const { slug } = await params;

    const competenceTechniqueItem = await getCompetenceTechniqueItemBySlug(slug);
    const competenceComportementale = !competenceTechniqueItem
        ? await getCompetenceComportementaleBySlug(slug)
        : null;

    if (!competenceTechniqueItem && !competenceComportementale) {
        notFound();
    }

    const data: CompetenceDetailData = competenceTechniqueItem
        ? {
            type: "technique",
            competenceTechniqueItem,
            competenceTechnique: null,
            competenceComportementale: null,
        }
        : {
            type: "comportementale",
            competenceTechniqueItem: null,
            competenceTechnique: null,
            competenceComportementale: competenceComportementale!,
        };

    return (
        <>
            <CustomCursor />
            <Nav />
            <main className="min-h-dvh flex flex-col items-center justify-center">
                <TemplateCompetence data={data} />
            </main>
            <Footer />
        </>
    );
};

export default CompetencePage;