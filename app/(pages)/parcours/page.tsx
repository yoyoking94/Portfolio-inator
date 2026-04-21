"use client";

import CustomCursor from "@/app/components/common/CustomCursor";
import Footer from "@/app/components/layout/Footer";
import Nav from "@/app/components/layout/Nav";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import "./style.css";

interface Lien { label: string; slug: string }

interface TimelineItem {
    type: "formation" | "experience";
    titre: string;
    lieu: string;
    periode: string;
    diplome?: string;
    poste?: string;
    statut?: string;
    responsabilite?: string;
    detail: string;
    siteOfficiel?: string;
    competences?: Lien[];
    realisations?: Lien[];
}

const parcours: TimelineItem[] = [
    {
        type: "formation",
        titre: "ISCOD",
        lieu: "Paris",
        periode: "Sept. 2024 → Juil. 2026",
        diplome: "Master Bac+5 – Expert en Ingénierie du Logiciel",
        siteOfficiel: "https://www.iscod.fr",
        detail: "L'ISCOD est une école 100% en ligne et 100% en alternance, spécialisée dans les métiers du numérique. Membre du groupe AD Education, elle propose un accompagnement personnalisé via des learning coachs et un réseau de plus de 600 entreprises partenaires.",
        competences: [
            { label: "Angular", slug: "angular" },
            { label: "Spring Boot", slug: "spring-boot" },
            { label: "Docker", slug: "docker" },
            { label: "TypeScript", slug: "typescript" },
        ],
        realisations: [
            { label: "PMT-inator", slug: "pmt-inator" },
            { label: "Portfolio-inator", slug: "portfolio-inator" },
            { label: "IF-inator", slug: "ef-inator" },
            { label: "Shopwise-inator", slug: "shopwise-inator" },
        ],
    },
    {
        type: "experience",
        titre: "Lactalis International",
        lieu: "Choisy-Le-Roi",
        periode: "Mai 2024 → Aujourd'hui",
        poste: "Technicien Support Application & Micro-Informatique",
        statut: "Alternant",
        responsabilite: "Technicien Support N1/N2",
        siteOfficiel: "https://www.lactalis-international.com/",
        detail: "Diagnostic et résolution rapide des problèmes applicatifs. Gestion du parc : installation, configuration et maintenance (Windev, Webdev, MYSQL Developer). Suivi des incidents via ticketing. Formation utilisateurs Microsoft 365. Lactalis est le 2ème groupe laitier mondial (CA 30 Mds € en 2024).",
        competences: [
            { label: "MYSQL", slug: "mysql" },
            { label: "Planification", slug: "planification" },
        ],
        realisations: [],
    },
    {
        type: "experience",
        titre: "Elyotech",
        lieu: "Asnières-sur-Seine",
        periode: "Fév. 2022 → Aujourd'hui",
        poste: "Développeur Web & Mobile Full-Stack",
        statut: "Alternant",
        responsabilite: "Développeur Full-Stack",
        siteOfficiel: "https://www.pappers.fr/entreprise/elyotech-840155360",
        detail: "Création d'applications web et mobiles de A à Z : React TSX, HTML, SCSS, Node.js, Firebase, AWS S3. Analyse des besoins clients et traduction en solutions techniques adaptées.",
        competences: [{ label: "TypeScript", slug: "typescript" }],
        realisations: [{ label: "Fitness-inator", slug: "fitness-inator" }],
    },
    {
        type: "formation",
        titre: "Cloud Campus",
        lieu: "Paris",
        periode: "Fév. 2022 → Fév. 2023",
        diplome: "Licence Bac+3 – Développeur Web Full-Stack",
        siteOfficiel: "https://www.cloudcampus.fr",
        detail: "Centre de formation en alternance dédié aux métiers du numérique. Pédagogie axée sur 80% de pratique et 20% de théorie avec des formateurs issus du monde professionnel.",
        competences: [{ label: "TypeScript", slug: "typescript" }],
        realisations: [{ label: "Portfolio-inator", slug: "portfolio-inator" }],
    },
    {
        type: "formation",
        titre: "CFA UTEC",
        lieu: "Emerainville",
        periode: "Sept. 2019 → Jan. 2022",
        diplome: "BTS Bac+2 – Systèmes Informatiques aux Organisations",
        siteOfficiel: "https://www.utec77.fr",
        detail: "École de la CCI Seine-et-Marne, formant environ 2 000 jeunes par an. Pôle IT Cyber Academy avec encadrement individualisé. Cursus : administration systèmes & réseaux, PHP, PostgreSQL, Python, Java, domotique, algorithmique.",
        competences: [{ label: "MYSQL", slug: "mysql" }],
        realisations: [{ label: "Password-inator 2", slug: "password-inator-2" }],
    },
    {
        type: "experience",
        titre: "Circeo",
        lieu: "Paris",
        periode: "Déc. 2019 → Juil. 2021",
        poste: "Développeur Web Front-end",
        statut: "Alternant",
        responsabilite: "Développeur Front-end",
        siteOfficiel: "https://circeo.today/fr",
        detail: "Création de parcours de souscription pour BNP Paribas, Société Générale, Fiat, Renault, Carrefour. Conception de composants UI (HTML, CSS, JS), intégration continue et tests qualité.",
        competences: [
            { label: "JavaScript", slug: "javascript" },
            { label: "Adaptabilité", slug: "adaptabilite" },
        ],
        realisations: [],
    },
    {
        type: "formation",
        titre: "IUT de Valenciennes",
        lieu: "Maubeuge",
        periode: "Sept. 2018 → Juil. 2019",
        diplome: "DUT Bac+2 – Informatique",
        siteOfficiel: "https://www.uphf.fr",
        detail: "Établissement public rattaché à l'Université Polytechnique Hauts-de-France. Cursus : POO Java, Linux Debian/Ubuntu, MySQL, systèmes d'exploitation, virtualisation, réseaux informatiques.",
        competences: [{ label: "MYSQL", slug: "mysql" }],
        realisations: [],
    },
    {
        type: "experience",
        titre: "Netapsys / Sodifrance",
        lieu: "Paris",
        periode: "Fév. 2018",
        poste: "Développeur Web Full-stack",
        statut: "Stagiaire",
        responsabilite: "Développeur Web",
        siteOfficiel: "https://www.soprasteria.fr/",
        detail: "Immersion dans les différents départements. Étude des méthodologies Sprint et du cycle DevOps. Découverte des technologies HTML, CSS, PHP. Groupe Sodifrance : CA 2024 de 110M €.",
        competences: [
            { label: "Adaptabilité", slug: "adaptabilite" },
            { label: "Résilience", slug: "resilience" },
        ],
        realisations: [],
    },
];

const listVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

const TimelineCard = ({ item, isEven }: { item: TimelineItem; isEven: boolean }) => {
    const [open, setOpen] = useState(false);
    const isFormation = item.type === "formation";

    const titleColor = isFormation ? "text-violet-400" : "text-emerald-400";
    const btnClass = isFormation
        ? "border-violet-400/40 text-violet-400 hover:bg-violet-400/10"
        : "border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10";
    const tagClass = isFormation
        ? "border-violet-400/30 text-violet-400 hover:bg-violet-400/10"
        : "border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10";

    const align = isEven
        ? "items-start text-left sm:items-end sm:text-right"
        : "items-start text-left";

    return (
        <motion.div
            className={`flex flex-col gap-1 p-2 ${align}`}
            variants={cardVariants}
        >
            <div className="relative">
                <h2 className={`font-semibold text-base ${titleColor}`}>{item.titre}</h2>
            </div>

            <h3 className="text-sm font-bold opacity-80">{item.poste ?? item.diplome}</h3>
            <p className="text-xs opacity-50">{item.lieu}</p>
            <p className="text-xs opacity-40 italic">{item.periode}</p>

            {/* Bouton toggle */}
            <div className="mt-2">
                <div
                    onClick={() => setOpen((v) => !v)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium border px-3 py-1.5 cursor-pointer select-none hoverable ${btnClass}`}
                >
                    {open ? "Moins" : "Plus"}
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11" height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                </div>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="flex flex-col gap-3 pt-1 items-start text-left">
                            {(item.statut || item.responsabilite) && (
                                <div className="flex flex-wrap gap-2">
                                    {item.statut && (
                                        <span className="text-xs px-2 py-0.5 border border-current/15 opacity-60">
                                            {item.statut}
                                        </span>
                                    )}
                                    {item.responsabilite && (
                                        <span className="text-xs px-2 py-0.5 border border-current/15 opacity-60">
                                            {item.responsabilite}
                                        </span>
                                    )}
                                </div>
                            )}

                            <p className="text-xs opacity-60 leading-relaxed">{item.detail}</p>

                            {item.competences && item.competences.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider opacity-35 mb-1.5">
                                        Compétences
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.competences.map(({ label, slug }) => (
                                            <Link
                                                key={slug}
                                                href={`/competences/${slug}`}
                                                className={`text-xs px-4 py-2 border hoverable ${tagClass}`}
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {item.realisations && item.realisations.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider opacity-35 mb-1.5">
                                        Réalisations
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.realisations.map(({ label, slug }) => (
                                            <Link
                                                key={slug}
                                                href={`/projets/${slug}`}
                                                className="text-xs px-4 py-2 border border-current/20 opacity-60 hover:opacity-100 hoverable"
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {item.siteOfficiel && (
                                <a
                                    href={item.siteOfficiel}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs opacity-40 hover:opacity-70 transition-opacity underline underline-offset-2 hoverable"
                                >
                                    Site officiel ↗
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
const ParcoursPage = () => {
    return (
        <>
            <CustomCursor />
            <Nav />

            <main>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                    <svg viewBox="0 0 1560 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parcours" style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="xMidYMid meet">
                        <rect width="1560" height="420" fill="#F7F1E8" />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="150" fontWeight="900" letterSpacing="-10" fill="#E8E0DA" opacity="0.9">PARCOURS</text>

                        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontSize="100" fontWeight="900" letterSpacing="-6" fill="#411222">PARCOURS</text>
                    </svg>
                </motion.div>

                <section>
                    <motion.div className="flex justify-center items-center gap-6 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-violet-500" />Formation</span>
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-emerald-500" />Expérience</span>
                    </motion.div>

                    <div className="timeline pb-50">
                        <motion.div className="outer" variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
                            {parcours.map((item, index) => (
                                <div className="card" key={index} data-type={item.type}>
                                    <TimelineCard item={item} isEven={index % 2 !== 0} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default ParcoursPage;