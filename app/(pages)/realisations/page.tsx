import CustomCursor from "@/app/components/common/CustomCursor";
import Footer from "@/app/components/layout/Footer";
import Nav from "@/app/components/layout/Nav";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { getGithubRepos } from "@/app/lib/github";
import type { GitHubRepo } from "@/app/types";
import * as motion from "motion/react-client";

import fitness from "@/public/projets/fitness.png";
import portfolio from "@/public/projets/portfolio.png";
import pmt from "@/public/projets/pmt.png";
import if_inator from "@/public/projets/if.png";
import shopwise from "@/public/projets/shopwise.png";

const PROJET_IMAGES: Record<string, StaticImageData> = {
    "fitness-inator": fitness,
    "portfolio-inator": portfolio,
    "pmt-inator": pmt,
    "shopwise-inator": shopwise,
    "if-inator":if_inator,
};

const gridVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

const RealisationPage = async () => {
    const repos = await getGithubRepos();

    return (
        <>
            <CustomCursor />
            <Nav />

            <main>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                    <svg viewBox="0 0 1560 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Réalisations" style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="xMidYMid meet">
                        <rect width="1560" height="420" fill="#F7F1E8" />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="150" fontWeight="900" letterSpacing="-10" fill="#E8E0DA" opacity="0.9">RÉALISATIONS</text>
                        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontSize="100" fontWeight="900" letterSpacing="-6" fill="#411222">RÉALISATIONS</text>
                    </svg>
                </motion.div>

                <section>
                    <motion.article className="flex flex-wrap justify-center items-center pb-50 gap-6" variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
                        {repos.map((repo: GitHubRepo) => {
                            const src = PROJET_IMAGES[repo.name.toLowerCase()];

                            return (
                                <motion.div key={repo.name} variants={cardVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} >
                                    <Link href={`/realisations/${repo.name.toLowerCase()}`}
                                        className="group relative w-[500px] h-[300px] overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 block hoverable">
                                        <Image src={src} alt={repo.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" draggable={false} sizes="500px" loading="eager" priority />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                                            <h3 className="text-white text-xl font-semibold tracking-wide uppercase">
                                                {repo.name}
                                            </h3>

                                            {repo.description && (
                                                <p className="text-white/70 text-sm mt-1">
                                                    {repo.description}
                                                </p>
                                            )}

                                            <span className="mt-3 inline-flex items-center gap-1 text-white/80 text-sm font-medium">
                                                Voir le projet →
                                            </span>
                                        </div>

                                        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-white group-hover:w-full transition-all duration-500" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.article>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default RealisationPage;