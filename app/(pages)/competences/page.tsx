import CustomCursor from "@/app/components/common/CustomCursor"
import Competences from "@/app/components/feature/Competences"
import Footer from "@/app/components/layout/Footer"
import Nav from "@/app/components/layout/Nav"

const CompetencesPage = () => {
    return (
        <>
            <CustomCursor />
            <Nav />
            <main className="min-h-dvh flex flex-col items-center justify-center py-20">
                <Competences />
            </main>
            <Footer />
        </>
    )
}

export default CompetencesPage