"use client"

import { useState } from "react";
import { CompetenceTechnique, CompetenceComportementale, CompetenceTechniqueItem } from "@/app/types";

interface CompetencesProps {
    competences_techniques: CompetenceTechnique[];
    competences_comportementales: CompetenceComportementale[];
}

type DetailTab = "Définition" | "Preuves" | "Autocritique" | "Évolution";
const DETAIL_TABS: DetailTab[] = ["Définition", "Preuves", "Autocritique", "Évolution"];

type MainTab = "Techniques" | "Comportementales";
const MAIN_TABS: MainTab[] = ["Techniques", "Comportementales"];

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

    const selectedItem = allItems.find((item) => item.id === activeItem);
    const selectedComportementale = competences_comportementales.find(
        (c) => c.id === activeComportementale
    );

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

            {/* ── Onglets principaux mobile ── */}
            <div className="flex md:hidden mb-3">
                {MAIN_TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveMainTab(tab)}
                        style={{ padding: '5px 20px', margin: '5px' }}
                        className={`hoverable cursor-none flex-1
                            ${activeMainTab === tab
                                ? "bg-black text-white"
                                : "bg-white text-black border"
                            }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ── Layout ── */}
            <div className="flex flex-col md:flex-row">

                {/* ── Bloc Techniques ── */}
                <div
                    className={`border-2 md:flex-[1.5] ${activeMainTab === "Techniques" ? "block" : "hidden"} md:block`}
                    style={{ margin: '5px 10px', padding: '20px' }}
                >
                    <h3 className="hidden md:block">Techniques</h3>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">

                        {/* Onglets items : horizontaux sur mobile, verticaux sur desktop */}
                        <div className="flex flex-row flex-wrap sm:flex-col gap-1 sm:min-w-[120px]">
                            {allItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSelectItem(item.id)}
                                    style={{ padding: '5px 16px' }}
                                    className={`hoverable cursor-none text-sm
                                        ${activeItem === item.id
                                            ? "bg-black text-white"
                                            : "bg-white text-black border"
                                        }
                                    `}
                                >
                                    {item.nom}
                                </button>
                            ))}
                        </div>

                        {/* Détails item */}
                        {selectedItem && (
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {DETAIL_TABS.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveDetailTab(tab)}
                                            style={{ padding: '3px 10px' }}
                                            className={`hoverable cursor-none text-sm
                                                ${activeDetailTab === tab
                                                    ? "bg-black text-white"
                                                    : "bg-white text-black border"
                                                }
                                            `}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <p className="mb-2 text-sm">
                                    <strong>Niveau :</strong> {selectedItem.niveau}/5
                                </p>
                                <div className="overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap" style={{ minHeight: '150px' }}>
                                    {detailContent[activeDetailTab] ?? (
                                        <span className="opacity-50">Non renseigné</span>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* ── Bloc Comportementales ── */}
                <div
                    className={`border-2 md:flex-[2] ${activeMainTab === "Comportementales" ? "block" : "hidden"} md:block`}
                    style={{ margin: '5px 10px', padding: '20px' }}
                >
                    <h3 className="hidden md:block">Comportementales</h3>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">

                        {/* Onglets comportementales : horizontaux sur mobile, verticaux sur desktop */}
                        <div className="flex flex-row flex-wrap sm:flex-col gap-1 sm:min-w-[150px]">
                            {competences_comportementales.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => handleSelectComportementale(c.id)}
                                    style={{ padding: '5px 16px' }}
                                    className={`hoverable cursor-none text-sm
                                        ${activeComportementale === c.id
                                            ? "bg-black text-white"
                                            : "bg-white text-black border"
                                        }
                                    `}
                                >
                                    {c.nom}
                                </button>
                            ))}
                        </div>

                        {/* Détails comportementale */}
                        {selectedComportementale && (
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {DETAIL_TABS.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveComportementaleTab(tab)}
                                            style={{ padding: '3px 10px' }}
                                            className={`hoverable cursor-none text-sm
                                                ${activeComportementaleTab === tab
                                                    ? "bg-black text-white"
                                                    : "bg-white text-black border"
                                                }
                                            `}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap" style={{ minHeight: '150px' }}>
                                    {comportementaleContent[activeComportementaleTab] ?? (
                                        <span className="opacity-50">Non renseigné</span>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Competences;
