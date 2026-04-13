import Link from "next/link";
import type { GitHubRepo } from "@/app/types";

interface Props {
    repo: GitHubRepo;
}

const projetToCompetences: Record<string, {
    techniques: { label: string; slug: string }[];
    comportementales: { label: string; slug: string }[];
}> = {
    "log-inator": {
        techniques: [
            { label: "JavaScript", slug: "javascript" },
            { label: "NoSQL", slug: "nosql" },
        ],
        comportementales: [
            { label: "Planification", slug: "planification" },
            { label: "Priorisation", slug: "priorisation" },
        ],
    },
    "fitness-inator": {
        techniques: [
            { label: "TypeScript", slug: "typescript" },
        ],
        comportementales: [
            { label: "Autonomie", slug: "autonomie" },
            { label: "Gestion du temps", slug: "gestion-du-temps" },
        ],
    },
    "password-inator-2": {
        techniques: [
            { label: "Python", slug: "python" },
        ],
        comportementales: [
            { label: "Discipline", slug: "discipline" },
        ],
    },
    "porfolio-inator": {
        techniques: [
            { label: "TypeScript", slug: "typescript" },
            { label: "SQL", slug: "sql" },
        ],
        comportementales: [
            { label: "Adaptabilité", slug: "adaptabilite" },
        ],
    },
    "diet-inator": {
        techniques: [
            { label: "NoSQL", slug: "nosql" },
        ],
        comportementales: [
            { label: "Résilience", slug: "resilience" },
        ],
    },
    "pmt-inator": {
        techniques: [
            { label: "Angular", slug: "angular" },
            { label: "Spring Boot", slug: "spring-boot" },
            { label: "Docker", slug: "docker" },
            { label: "SQL", slug: "sql" },
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
            { label: "SQL", slug: "sql" },
        ],
        comportementales: [
            { label: "Résilience", slug: "resilience" },
            { label: "Autonomie", slug: "autonomie" },
            { label: "Gestion du temps", slug: "gestion-du-temps" },
        ],
    },
    "ef-inator": {
        techniques: [
            { label: "Angular", slug: "angular" },
            { label: "Spring Boot", slug: "spring-boot" },
            { label: "Docker", slug: "docker" },
            { label: "SQL", slug: "sql" },
        ],
        comportementales: [
            { label: "Résilience", slug: "resilience" },
            { label: "Autonomie", slug: "autonomie" },
            { label: "Gestion du temps", slug: "gestion-du-temps" },
        ],
    },
};

const sections: { key: keyof NonNullable<GitHubRepo["readme"]>; label: string }[] = [
    { key: "presentation", label: "Présentation" },
    { key: "objectifs", label: "Objectifs" },
    { key: "etapes", label: "Étapes" },
    { key: "acteurs", label: "Acteurs" },
    { key: "resultats", label: "Résultats" },
    { key: "lendemains", label: "Lendemains" },
    { key: "regard_critique", label: "Regard critique" },
];

const TemplateProjet = ({ repo }: Props) => {
    console.log('TemplateProjet repo.name =', repo.name);

    const slugProjet = repo.name.toLowerCase();
    const competences = projetToCompetences[slugProjet] ?? { techniques: [], comportementales: [] };

    console.log('Compétences trouvées =', competences);
    return (
        <section>
            <h2 className="text-center uppercase">{repo.name}</h2>

            {sections.map(({ key, label }) => {
                const content = repo.readme?.[key];
                if (!content) return null;

                console.log("content : " + content);

                return (
                    <article key={key} className="py-5">
                        <h3>{label} :</h3>
                        <p className="py-5 text-justify whitespace-pre-line">{content}</p>
                    </article>
                );
            })}

            <article className="py-10">
                <h3>Compétences liées :</h3>

                {competences.techniques.length > 0 && (
                    <div className="py-5">
                        <p>Technique :</p>
                        <div className="flex flex-wrap">
                            {competences.techniques.map(({ label, slug }) => (
                                <Link key={slug} href={`/competences/${slug}`} className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable">
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )
                }

                {
                    competences.comportementales.length > 0 && (
                        <div className="py-2">
                            <p>Comportementales :</p>
                            <div className="flex flex-wrap">
                                {competences.comportementales.map(({ label, slug }) => (
                                    <Link key={slug} href={`/competences/${slug}`} className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable">
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                }
            </article >
        </section >
    );
};

export default TemplateProjet;