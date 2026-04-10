import CustomCursor from '@/app/components/common/CustomCursor'
import Footer from '@/app/components/layout/Footer'
import Nav from '@/app/components/layout/Nav'
import { getProfile, getCentresInteret } from '@/app/lib/database'

const PresentationPage = async () => {
    const [profil, centresInteret] = await Promise.all([
        getProfile(),
        getCentresInteret(),
    ])

    return (
        <>
            <CustomCursor />
            <Nav />
            <main className="min-h-dvh flex flex-col items-center justify-center py-50">
                <h2 className='text-center'>Présentation</h2>
                <section>
                    <article className='py-10'>
                        <h3>Mes valeurs :</h3>
                        <p className='py-5 text-justify'>{profil.valeurs}</p>
                    </article>

                    <article className='py-10'>
                        <h3>Mon projet :</h3>
                        <p className='pt-5 text-justify'>{profil.projet}</p>
                    </article>

                    <article className='py-10'>
                        <h3>Mes qualités :</h3>
                        <p className='pt-5 text-justify'>{profil.qualitees}</p>
                    </article>

                    <article className='py-10'>
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
                    </article>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default PresentationPage