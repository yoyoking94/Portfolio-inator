import Link from "next/link";
import Image from "next/image";
import type { GitHubRepo, Projet } from "@/app/types";
import * as motion from "motion/react-client";

interface Props {
    repo: GitHubRepo;
    projet: Projet | null;
}

const projetToCompetences: Record<string, {
    techniques: { label: string; slug: string }[];
    comportementales: { label: string; slug: string }[];
}> = {
    "pmt-inator": {
        techniques: [
            { label: "Angular", slug: "angular" },
            { label: "Spring Boot", slug: "spring-boot" },
            { label: "Docker", slug: "docker" },
            { label: "MYSQL", slug: "mysql" },
        ],
        comportementales: [
            { label: "Résilience", slug: "resilience" },
            { label: "Autonomie", slug: "autonomie" },
            { label: "Gestion du temps", slug: "gestion-du-temps" },
        ],
    },
    "shopwise-inator": {
        techniques: [
            { label: "Angular", slug: "angular" },
            { label: "Spring Boot", slug: "spring-boot" },
            { label: "Docker", slug: "docker" },
            { label: "MYSQL", slug: "mysql" },
        ],
        comportementales: [
            { label: "Résilience", slug: "resilience" },
            { label: "Autonomie", slug: "autonomie" },
            { label: "Gestion du temps", slug: "gestion-du-temps" },
        ],
    },
    "if-inator": {
        techniques: [
            { label: "Angular", slug: "angular" },
            { label: "Spring Boot", slug: "spring-boot" },
            { label: "Docker", slug: "docker" },
            { label: "MYSQL", slug: "mysql" },
        ],
        comportementales: [
            { label: "Résilience", slug: "resilience" },
            { label: "Autonomie", slug: "autonomie" },
            { label: "Gestion du temps", slug: "gestion-du-temps" },
        ],
    },
    "fitness-inator": {
        techniques: [{ label: "TypeScript", slug: "typescript" }],
        comportementales: [
            { label: "Autonomie", slug: "autonomie" },
            { label: "Gestion du temps", slug: "gestion-du-temps" },
        ],
    },
    "portfolio-inator": {
        techniques: [
            { label: "TypeScript", slug: "typescript" },
            { label: "MYSQL", slug: "mysql" },
        ],
        comportementales: [{ label: "Adaptabilité", slug: "adaptabilite" }],
    },
};

const sections: { key: keyof Projet; label: string }[] = [
    { key: "presentation", label: "Présentation" },
    { key: "objectifs", label: "Objectifs" },
    { key: "etapes", label: "Étapes" },
    { key: "acteurs", label: "Acteurs" },
    { key: "resultats", label: "Résultats" },
    { key: "lendemains", label: "Lendemains" },
    { key: "regard_critique", label: "Regard critique" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

const TemplateProjet = ({ repo, projet }: Props) => {
    const slugProjet = repo.name.toLowerCase();
    const competences = projetToCompetences[slugProjet] ?? {
        techniques: [],
        comportementales: [],
    };

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                <svg viewBox="0 0 1560 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={repo.name} style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="xMidYMid meet" >
                    <rect width="1560" height="420" fill="#F7F1E8" />

                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="150" fontWeight="900" letterSpacing="-10" fill="#E8E0DA" opacity="0.9" >
                        {repo.name.toUpperCase()}
                    </text>

                    <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontSize="100" fontWeight="900" letterSpacing="-6" fill="#411222" >
                        {repo.name.toUpperCase()}
                    </text>
                </svg>
            </motion.div>

            <section className="mb-30">
                {projet &&
                    sections.map(({ key, label }) => {
                        const content = projet[key] as string | null;
                        if (!content) return null;

                        return (
                            <motion.article
                                key={key}
                                className="my-20"
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                            >
                                <h3 className="my-5 font-bold">-- {label} --</h3>
                                <p className="text-justify whitespace-pre-line">{content}</p>
                            </motion.article>
                        );
                    })}

                {competences.techniques.length > 0 && (
                    <div className="py-5">
                        <p>Techniques :</p>
                        <div className="flex flex-wrap pt-5">
                            {competences.techniques.map(({ label, slug }) => (
                                <Link
                                    key={slug}
                                    href={`/competences/${slug}`}
                                    className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {competences.comportementales.length > 0 && (
                    <div className="py-2">
                        <p>Comportementales :</p>
                        <div className="flex flex-wrap pt-5">
                            {competences.comportementales.map(({ label, slug }) => (
                                <Link
                                    key={slug}
                                    href={`/competences/${slug}`}
                                    className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default TemplateProjet;