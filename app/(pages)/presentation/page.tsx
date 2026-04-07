import CustomCursor from '@/app/components/common/CustomCursor'
import Footer from '@/app/components/layout/Footer'
import Nav from '@/app/components/layout/Nav'
import { getProfile, getCentresInteret } from '@/app/lib/database'

const Presentation = async () => {
    const [profil, centresInteret] = await Promise.all([
        getProfile(),
        getCentresInteret(),
    ])

    return (
        <>
            <CustomCursor />
            <Nav />
            <main className="min-h-dvh flex flex-col items-center justify-center py-50">
                <h2 className='py-5'>Présentation</h2>

                <section className='py-10 scroll-mt-[10dvh]' id='valeur'>
                    <h3>Mes valeurs :</h3>
                    <p className='py-5 text-justify'>{profil.valeurs}</p>
                </section>

                <section className='py-10 scroll-mt-[10dvh]' id='projet'>
                    <h3>Mon projet :</h3>
                    <p className='pt-5 text-justify'>{profil.projet}</p>
                </section>

                <section className='py-10 scroll-mt-[10dvh]' id='qualite'>
                    <h3>Mes qualités :</h3>
                    <p className='pt-5 text-justify'>{profil.qualitees}</p>
                </section>

                <section className='py-10 scroll-mt-[10dvh]' id='centreInteret'>
                    <h3>Mes centres d&apos;intérêts :</h3>
                    {centresInteret.length > 0 ? (
                        <ul className='pt-5 flex flex-wrap gap-3'>
                            {centresInteret.map((centre) => (
                                <li
                                    key={centre.id}
                                    className='border px-5 py-3 text-sm'
                                >
                                    {centre.nom}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='pt-5 text-justify'>{profil.centre_interet}</p>
                    )}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Presentation