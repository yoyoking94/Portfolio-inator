import Link from "next/link";
import type { CompetenceDetailData } from "@/app/types";

interface Props {
    data: CompetenceDetailData;
}

function toSlug(nom: string): string {
    return nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "-");
}

const competenceTechToProjet: Record<string, string> = {
    "javascript": "log-inator",
    "typescript": "fitness-inator",
    "python": "password-inator-2",
    "sql": "porfolio-inator",
    "nosql": "diet-inator",
};

const competenceCompToProjet: Record<string, string> = {
    "planification": "log-inator",
    "priorisation": "log-inator",
    "autonomie": "fitness-inator",
    "gestion-du-temps": "fitness-inator",
    "discipline": "password-inator-2",
    "adaptabilite": "porfolio-inator",
    "resilience": "diet-inator",
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
    const projetLie = isTechnique
        ? competenceTechToProjet[slugNom]
        : competenceCompToProjet[slugNom];

    return (
        <section>
            <h2 className="text-center">{nom}</h2>

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

            {projetLie && (
                <article className="py-10">
                    <h3>Projet lié :</h3>
                    <div className="flex flex-wrap py-2">
                        <Link
                            className="border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable"
                            href={`/projets/${projetLie}`}
                        >
                            {projetLie}
                        </Link>
                    </div>
                </article>
            )}
        </section>
    );
};

export default TemplateCompetence;