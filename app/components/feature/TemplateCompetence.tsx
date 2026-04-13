import Link from "next/link";
import Image from "next/image";
import type { CompetenceDetailData } from "@/app/types";

// Imports SVG techniques
import js from "@/public/svg/competences_tech/js.svg";
import ts from "@/public/svg/competences_tech/ts.svg";
import py from "@/public/svg/competences_tech/py.svg";
import sql from "@/public/svg/competences_tech/sql.svg";
import nosql from "@/public/svg/competences_tech/nosql.svg";
import angular from "@/public/svg/competences_tech/angular.svg";
import spring_boot from "@/public/svg/competences_tech/spring_boot.svg";
import docker from "@/public/svg/competences_tech/docker.svg";

// Imports SVG comportementales
import adaptabilite from "@/public/svg/competences_comp/adaptabilite.svg";
import autonomie from "@/public/svg/competences_comp/autonomie.svg";
import discipline from "@/public/svg/competences_comp/discipline.svg";
import gestion_du_temps from "@/public/svg/competences_comp/gestion_du_temps.svg";
import planification from "@/public/svg/competences_comp/planification.svg";
import priorisation from "@/public/svg/competences_comp/priorisation.svg";
import resilience from "@/public/svg/competences_comp/resilience.svg";

interface Props {
    data: CompetenceDetailData;
}

interface Projet {
    label: string;
    slug: string;
}

// Map slug → SVG importé
const competenceImages: Record<string, string> = {
    // Techniques
    "javascript": js,
    "typescript": ts,
    "python": py,
    "sql": sql,
    "nosql": nosql,
    "angular": angular,
    "spring-boot": spring_boot,
    "docker": docker,
    // Comportementales
    "adaptabilite": adaptabilite,
    "autonomie": autonomie,
    "discipline": discipline,
    "gestion-du-temps": gestion_du_temps,
    "planification": planification,
    "priorisation": priorisation,
    "resilience": resilience,
};

function toSlug(nom: string): string {
    return nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

const competenceTechToProjet: Record<string, Projet[]> = {
    "javascript": [{ label: "Log-inator", slug: "log-inator" }, { label: "Fitness-inator", slug: "fitness-inator" }],
    "typescript": [{ label: "Fitness-inator", slug: "fitness-inator" }, { label: "Portfolio-inator", slug: "porfolio-inator" }],
    "python": [{ label: "Password-inator 2", slug: "password-inator-2" }],
    "sql": [{ label: "Portfolio-inator", slug: "porfolio-inator" }],
    "nosql": [{ label: "Diet-inator", slug: "diet-inator" }],
    "angular": [{ label: "PMT-inator", slug: "pmt-inator" }, { label: "Shopwise-inator", slug: "shopwise-inator" }, { label: "EF-inator", slug: "ef-inator" }],
    "spring-boot": [{ label: "PMT-inator", slug: "pmt-inator" }, { label: "Shopwise-inator", slug: "shopwise-inator" }, { label: "EF-inator", slug: "ef-inator" }],
    "docker": [{ label: "PMT-inator", slug: "pmt-inator" }, { label: "Shopwise-inator", slug: "shopwise-inator" }, { label: "EF-inator", slug: "ef-inator" }, { label: "Portfolio-inator", slug: "porfolio-inator" }],
};

const competenceCompToProjet: Record<string, Projet[]> = {
    "planification": [{ label: "Log-inator", slug: "log-inator" }, { label: "PMT-inator", slug: "pmt-inator" }],
    "priorisation": [{ label: "Log-inator", slug: "log-inator" }],
    "autonomie": [{ label: "Fitness-inator", slug: "fitness-inator" }],
    "gestion-du-temps": [{ label: "Fitness-inator", slug: "fitness-inator" }],
    "discipline": [{ label: "Password-inator 2", slug: "password-inator-2" }],
    "adaptabilite": [{ label: "Portfolio-inator", slug: "porfolio-inator" }],
    "resilience": [{ label: "Diet-inator", slug: "diet-inator" }],
};

const TemplateCompetence = ({ data }: Props) => {
    const isTechnique = data.type === "technique";

    const nom = isTechnique
        ? data.competenceTechniqueItem!.nom
        : data.competenceComportementale!.nom;

    const definition = isTechnique
        ? data.competenceTechniqueItem!.definition
        : data.competenceComportementale!.definition;

    const preuves = isTechnique
        ? data.competenceTechniqueItem!.preuves
        : data.competenceComportementale!.preuves;

    const autocritique = isTechnique
        ? data.competenceTechniqueItem!.autocritique
        : data.competenceComportementale!.autocritique;

    const evolution = isTechnique
        ? data.competenceTechniqueItem!.evolution
        : data.competenceComportementale!.evolution;

    const slugNom = toSlug(nom);

    const projetsLies: Projet[] = isTechnique
        ? (competenceTechToProjet[slugNom] ?? [])
        : (competenceCompToProjet[slugNom] ?? []);

    const image = competenceImages[slugNom] ?? null;

    return (
        <section>
            {image && (
                <div className="flex justify-center">
                    <Image
                        src={image}
                        alt={nom}
                        width={120}
                        height={120}
                        draggable={false}
                        priority
                    />
                </div>
            )}

            <h2 className="text-center uppercase">{nom}</h2>

            <article className="py-5">
                <h3>Définition :</h3>
                <p className="py-5 text-justify">{definition}</p>
            </article>

            <article className="py-5">
                <h3>Mes preuves :</h3>
                <p className="py-5 text-justify">{preuves}</p>
            </article>

            <article className="py-5">
                <h3>Autocritique :</h3>
                <p className="py-5 text-justify">{autocritique}</p>
            </article>

            <article className="py-5">
                <h3>Évolution :</h3>
                <p className="py-5 text-justify">{evolution}</p>
            </article>

            {projetsLies.length > 0 && (
                <article className="py-10">
                    <h3>Projet{projetsLies.length > 1 ? "s liés" : " lié"} :</h3>
                    <div className="flex flex-wrap py-2">
                        {projetsLies.map(({ label, slug }) => (
                            <Link
                                key={slug}
                                className="border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable"
                                href={`/projets/${slug}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </article>
            )}
        </section>
    );
};

export default TemplateCompetence;