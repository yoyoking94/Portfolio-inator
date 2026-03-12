"use client"

import { useState, useEffect } from "react";
import { CompetenceTechnique, CompetenceComportementale, CompetenceTechniqueItem } from "@/app/types";

interface CompetencesProps {
    competences_techniques: CompetenceTechnique[];
    competences_comportementales: CompetenceComportementale[];
}

type DetailTab = "Définition" | "Preuves" | "Autocritique" | "Évolution";
const DETAIL_TABS: DetailTab[] = ["Définition", "Preuves", "Autocritique", "Évolution"];

type MainTab = "Techniques" | "Comportementales";
const MAIN_TABS: MainTab[] = ["Techniques", "Comportementales"];

const TECH_TO_PROJECT: Record<string, string> = {
    "javascript": "log-inator",
    "typescript": "fitness-inator",
    "python": "password-inator-2",
    "sql": "porfolio-inator",
    "nosql": "diet-inator",
};

const BEHAVIOR_TO_PROJECT: Record<string, string> = {
    "planification": "log-inator",
    "priorisation": "log-inator",
    "autonomie": "fitness-inator",
    "gestion du temps": "fitness-inator",
    "discipline": "password-inator-2",
    "adaptabilité": "porfolio-inator",
    "résilience": "diet-inator",
};

function scrollToProjet(repoName: string) {
    const el = document.getElementById('projets');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('selectProjet', { detail: { repoName } }));
}

const Competences = ({ competences_techniques, competences_comportementales }: CompetencesProps) => {

    const allItems: CompetenceTechniqueItem[] = competences_techniques.flatMap(
        (cat) => cat.items ?? []
    );

    const [activeMainTab, setActiveMainTab] = useState<MainTab>("Techniques");
    const [activeItem, setActiveItem] = useState<number>(allItems[0]?.id ?? 0);
    const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>("Définition");
    const [activeComportementale, setActiveComportementale] = useState<number>(
        competences_comportementales[0]?.id ?? 0
    );
    const [activeComportementaleTab, setActiveComportementaleTab] = useState<DetailTab>("Définition");

    useEffect(() => {
        const handler = (e: Event) => {
            const { section, nom } = (e as CustomEvent).detail;
            if (section === 'techniques') {
                const found = allItems.find((i) => i.nom.toLowerCase() === nom.toLowerCase());
                if (found) {
                    setActiveMainTab("Techniques");
                    setActiveItem(found.id);
                    setActiveDetailTab("Définition");
                }
            } else {
                const found = competences_comportementales.find(
                    (c) => c.nom.toLowerCase() === nom.toLowerCase()
                );
                if (found) {
                    setActiveMainTab("Comportementales");
                    setActiveComportementale(found.id);
                    setActiveComportementaleTab("Définition");
                }
            }
        };
        window.addEventListener('selectCompetence', handler);
        return () => window.removeEventListener('selectCompetence', handler);
    }, [allItems, competences_comportementales]);

    const selectedItem = allItems.find((item) => item.id === activeItem);
    const selectedComportementale = competences_comportementales.find((c) => c.id === activeComportementale);

    const projetTechnique = TECH_TO_PROJECT[selectedItem?.nom?.toLowerCase() ?? ""] ?? null;
    const projetComportementale = BEHAVIOR_TO_PROJECT[selectedComportementale?.nom?.toLowerCase() ?? ""] ?? null;

    const detailContent: Record<DetailTab, string | undefined> = {
        "Définition": selectedItem?.definition,
        "Preuves": selectedItem?.preuves,
        "Autocritique": selectedItem?.autocritique,
        "Évolution": selectedItem?.evolution,
    };

    const comportementaleContent: Record<DetailTab, string | undefined> = {
        "Définition": selectedComportementale?.definition,
        "Preuves": selectedComportementale?.preuves,
        "Autocritique": selectedComportementale?.autocritique,
        "Évolution": selectedComportementale?.evolution,
    };

    function handleSelectItem(id: number) {
        setActiveItem(id);
        setActiveDetailTab("Définition");
    }

    function handleSelectComportementale(id: number) {
        setActiveComportementale(id);
        setActiveComportementaleTab("Définition");
    }

    return (
        <section id="competences" className="scroll-mt-[8dvh]">
            <h2 className="flex items-center place-content-around" style={{ height: '50px', width: '100%' }}>
                Compétences
            </h2>

            <div className="flex md:hidden mb-3">
                {MAIN_TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveMainTab(tab)}
                        style={{ padding: '5px 20px', margin: '5px' }}
                        className={`hoverable cursor-none flex-1
                            ${activeMainTab === tab ? "bg-black text-white" : "bg-white text-black border"}
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row">

                <div
                    className={`border-2 md:flex-[1.5] ${activeMainTab === "Techniques" ? "block" : "hidden"} md:block`}
                    style={{ margin: '5px 10px', padding: '20px' }}
                >
                    <h3 className="hidden md:block">Techniques</h3>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">

                        <div className="flex flex-row flex-wrap sm:flex-col gap-1 sm:min-w-[120px]">
                            {allItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSelectItem(item.id)}
                                    style={{ padding: '5px 16px' }}
                                    className={`hoverable cursor-none text-sm
                                        ${activeItem === item.id ? "bg-black text-white" : "bg-white text-black border"}
                                    `}
                                >
                                    {item.nom}
                                </button>
                            ))}
                        </div>

                        {selectedItem && (
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {DETAIL_TABS.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveDetailTab(tab)}
                                            style={{ padding: '3px 10px' }}
                                            className={`hoverable cursor-none text-sm
                                                ${activeDetailTab === tab ? "bg-black text-white" : "bg-white text-black border"}
                                            `}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <p className="mb-2 text-sm"><strong>Niveau :</strong> {selectedItem.niveau}/5</p>
                                <div className="overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap" style={{ minHeight: '150px' }}>
                                    {detailContent[activeDetailTab] ?? <span className="opacity-50">Non renseigné</span>}
                                </div>

                                {projetTechnique && (
                                    <div className="mt-3 pt-3 border-t border-black">
                                        <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Projet lié</p>
                                        <button
                                            onClick={() => scrollToProjet(projetTechnique)}
                                            style={{ padding: '3px 12px' }}
                                            className="border border-black text-xs hoverable cursor-none hover:bg-black hover:text-white uppercase tracking-widest"
                                        >
                                            {projetTechnique}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={`border-2 md:flex-[2] ${activeMainTab === "Comportementales" ? "block" : "hidden"} md:block`}
                    style={{ margin: '5px 10px', padding: '20px' }}
                >
                    <h3 className="hidden md:block">Comportementales</h3>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">

                        <div className="flex flex-row flex-wrap sm:flex-col gap-1 sm:min-w-[150px]">
                            {competences_comportementales.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => handleSelectComportementale(c.id)}
                                    style={{ padding: '5px 16px' }}
                                    className={`hoverable cursor-none text-sm
                                        ${activeComportementale === c.id ? "bg-black text-white" : "bg-white text-black border"}
                                    `}
                                >
                                    {c.nom}
                                </button>
                            ))}
                        </div>

                        {selectedComportementale && (
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {DETAIL_TABS.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveComportementaleTab(tab)}
                                            style={{ padding: '3px 10px' }}
                                            className={`hoverable cursor-none text-sm
                                                ${activeComportementaleTab === tab ? "bg-black text-white" : "bg-white text-black border"}
                                            `}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap" style={{ minHeight: '150px' }}>
                                    {comportementaleContent[activeComportementaleTab] ?? <span className="opacity-50">Non renseigné</span>}
                                </div>

                                {projetComportementale && (
                                    <div className="mt-3 pt-3 border-t border-black">
                                        <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Projet lié</p>
                                        <button
                                            onClick={() => scrollToProjet(projetComportementale)}
                                            style={{ padding: '3px 12px' }}
                                            className="border border-black text-xs hoverable cursor-none hover:bg-black hover:text-white uppercase tracking-widest"
                                        >
                                            {projetComportementale}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Competences;
