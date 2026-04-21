import CustomCursor from '@/app/components/common/CustomCursor'
import Footer from '@/app/components/layout/Footer'
import Nav from '@/app/components/layout/Nav'
import { getProfile } from '@/app/lib/database'
import * as motion from "motion/react-client"

const SECTIONS = [
    { key: "valeurs" as const, label: "Mes valeurs", delay: 0 },
    { key: "projet" as const, label: "Mon projet", delay: 0.05 },
    { key: "qualitees" as const, label: "Mes qualités", delay: 0.1 },
    { key: "centre_interet" as const, label: "Mes centres d'intérêts", delay: 0.15 },
]

const PresentationPage = async () => {
    const profil = await getProfile()

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
                    <svg viewBox="0 0 1560 420" xmlns="http://www.w3.org/2000/svg"
                        role="img" aria-label="Présentation"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <rect width="1560" height="420" fill="#F7F1E8" />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                            fontSize="150" fontWeight="900" letterSpacing="-10" fill="#E8E0DA" opacity="0.9"
                        >
                            PRÉSENTATION
                        </text>
                        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle"
                            fontSize="100" fontWeight="900" letterSpacing="-6" fill="#411222"
                        >
                            PRÉSENTATION
                        </text>
                    </svg>
                </motion.div>

                <section className="mb-30">
                    {SECTIONS.map(({ key, label, delay }, i) => (
                        <motion.article
                            key={key}
                            className={i === 0 ? "mb-20" : "my-20"}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay }}
                        >
                            <h3 className="my-5 font-bold">-- {label} --</h3>
                            <p className="text-justify whitespace-pre-line">{profil[key]}</p>
                        </motion.article>
                    ))}
                </section>
            </main>

            <Footer />
        </>
    )
}

export default PresentationPage