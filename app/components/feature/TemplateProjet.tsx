import Link from "next/link";
import type { GitHubRepo } from "@/app/types";

interface Props {
    repo: GitHubRepo;
}

function toSlug(nom: string): string {
    return nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "-");
}

const projetToCompetences: Record<string, { techniques: string[]; comportementales: string[] }> = {
    "log-inator": { techniques: ["JavaScript", "NoSQL"], comportementales: ["Planification", "Priorisation"] },
    "fitness-inator": { techniques: ["TypeScript"], comportementales: ["Autonomie", "Gestion du temps"] },
    "password-inator-2": { techniques: ["Python"], comportementales: ["Discipline"] },
    "porfolio-inator": { techniques: ["TypeScript", "SQL"], comportementales: ["Adaptabilité"] },
    "diet-inator": { techniques: ["NoSQL"], comportementales: ["Résilience"] },
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
            <h2 className="text-center">{repo.name}</h2>

            {sections.map(({ key, label }) => {
                const content = repo.readme?.[key];
                if (!content) return null;
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
                            {competences.techniques.map((nom) => (
                                <button key={nom}
                                    className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable">
                                    <Link href={`/competences/${nom}`}>
                                        {nom}
                                    </Link>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {competences.comportementales.length > 0 && (
                    <div className="py-2">
                        <p>Comportementales :</p>
                        <div className="flex flex-wrap">
                            {competences.comportementales.map((nom) => (
                                <button
                                    key={nom}
                                    className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable">
                                    <Link href={`/competences/${nom}`} >
                                        {nom}
                                    </Link>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </section>
    );
};

export default TemplateProjet;