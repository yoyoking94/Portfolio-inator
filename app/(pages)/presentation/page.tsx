import CustomCursor from '@/app/components/common/CustomCursor'
import Footer from '@/app/components/layout/Footer'
import Nav from '@/app/components/layout/Nav'
import { getProfile, getCentresInteret } from '@/app/lib/database'
import * as motion from "motion/react-client"

const PresentationPage = async () => {
    const [profil] = await Promise.all([
        getProfile(),
        getCentresInteret(),
    ])

    return (
        <>
            <CustomCursor />
            <Nav />

            <main>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <svg
                        viewBox="0 0 1560 420"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Présentation"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <rect width="1560" height="420" fill="#F7F1E8" />

                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="150"
                            fontWeight="900"
                            letterSpacing="-10"
                            fill="#E8E0DA"
                            opacity="0.9"
                        >
                            PRÉSENTATION
                        </text>

                        <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="100"
                            fontWeight="900"
                            letterSpacing="-6"
                            fill="#411222"
                        >
                            PRÉSENTATION
                        </text>
                    </svg>
                </motion.div>

                <section className="mb-30">
                    <motion.article
                        className="mb-20"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="my-5 font-bold">-- Mes valeurs --</h3>
                        <p className="text-justify whitespace-pre-line">{profil.valeurs}</p>
                    </motion.article>

                    <motion.article
                        className="my-20"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                    >
                        <h3 className="my-5 font-bold">-- Mon projet --</h3>
                        <p className="text-justify whitespace-pre-line">{profil.projet}</p>
                    </motion.article>

                    <motion.article
                        className="my-20"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="my-5 font-bold">-- Mes qualités --</h3>
                        <p className="text-justify whitespace-pre-line">{profil.qualitees}</p>
                    </motion.article>

                    <motion.article
                        className="my-20"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <h3 className="my-5 font-bold">-- Mes centres d&apos;intérêts --</h3>
                        <p className="text-justify whitespace-pre-line">{profil.centre_interet}</p>
                    </motion.article>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default PresentationPage