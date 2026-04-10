import CustomCursor from "@/app/components/common/CustomCursor"
import Footer from "@/app/components/layout/Footer"
import Nav from "@/app/components/layout/Nav"
import Projets from "@/app/components/feature/Projets"

const RealisationPage = () => {
    return (
        <>
            <CustomCursor />
            <Nav />
            <main className="min-h-dvh flex flex-col items-center justify-center py-20">
                <Projets />
            </main>
            <Footer />
        </>
    )
}

export default RealisationPage