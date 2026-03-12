"use client";

import { useState } from "react";
import { Formation, Experience } from "@/app/types";

type ActiveTab = "Expériences" | "Formations";
const tab_list: ActiveTab[] = ["Expériences", "Formations"];

interface ParcoursProps {
    formations: Formation[];
    experiences: Experience[];
}

function ExperienceCard({ exp }: { exp: Experience }) {
    type ExpTab = "Infos" | "Tâches";
    const availableTabs: ExpTab[] = [
        "Infos",
        ...(exp.taches?.length ? ["Tâches" as ExpTab] : []),
    ];
    const [activeTab, setActiveTab] = useState<ExpTab>("Infos");

    return (
        <article
            className="border-2 border-black flex flex-col"
            style={{ width: '100%', minHeight: '180px', margin: '5px 0', padding: '10px' }}
        >
            <div className="p-2 shrink-0">
                <h4 className="uppercase tracking-widest font-bold text-sm md:text-base">
                    {exp.poste} — {exp.entreprise}
                </h4>
            </div>

            {availableTabs.length > 1 && (
                <div className="flex flex-wrap shrink-0">
                    {availableTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{ margin: '3px', padding: '4px 16px' }}
                            className={`hoverable cursor-none text-sm
                                ${activeTab === tab
                                    ? "bg-black text-white"
                                    : "bg-white text-black border"
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            <div className="p-2 overflow-y-auto flex-1">
                {activeTab === "Infos" && (
                    <div className="space-y-1 text-sm">
                        <p>
                            <strong>Période :</strong>{" "}
                            {exp.date_debut.toLocaleDateString("fr-FR", { year: "numeric", month: "short" })}
                            {" → "}
                            {exp.date_fin
                                ? exp.date_fin.toLocaleDateString("fr-FR", { year: "numeric", month: "short" })
                                : "Aujourd'hui"}
                        </p>
                        {exp.ville && <p><strong>Lieu :</strong> {exp.ville}</p>}
                        {exp.ca && <p><strong>CA :</strong> {exp.ca}</p>}
                        {exp.mission && <p><strong>Mission :</strong> {exp.mission}</p>}
                    </div>
                )}

                {activeTab === "Tâches" && exp.taches?.length && (
                    <ul className="space-y-1 text-sm">
                        {exp.taches.map((tache) => (
                            <li key={tache.id} className="list-disc list-inside">
                                {tache.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
}

function FormationCard({ formation }: { formation: Formation }) {
    type FormTab = "Infos" | "Cours" | "Établissement";
    const availableTabs: FormTab[] = [
        "Infos",
        "Cours",
        ...(formation.description_etablissement ? ["Établissement" as FormTab] : []),
    ];
    const [activeTab, setActiveTab] = useState<FormTab>("Infos");

    return (
        <article
            className="border-2 border-black flex flex-col"
            style={{ width: '100%', minHeight: '180px', margin: '5px 0', padding: '10px' }}
        >
            <div className="p-2 shrink-0">
                <h4 className="uppercase tracking-widest font-bold text-sm md:text-base">
                    {formation.diplome} — {formation.etablissement}
                </h4>
            </div>

            {availableTabs.length > 1 && (
                <div className="flex flex-wrap shrink-0">
                    {availableTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{ margin: '3px', padding: '4px 16px' }}
                            className={`hoverable cursor-none text-sm
                                ${activeTab === tab
                                    ? "bg-black text-white"
                                    : "bg-white text-black border"
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            <div className="p-2 overflow-y-auto flex-1">
                {activeTab === "Infos" && (
                    <div className="space-y-1 text-sm">
                        <p>
                            <strong>Période :</strong>{" "}
                            {formation.date_debut.toLocaleDateString("fr-FR", { year: "numeric", month: "short" })}
                            {" → "}
                            {formation.date_fin
                                ? formation.date_fin.toLocaleDateString("fr-FR", { year: "numeric", month: "short" })
                                : "En cours"}
                        </p>
                        {formation.ville && <p><strong>Ville :</strong> {formation.ville}</p>}
                        {formation.description && <p><strong>Description :</strong> {formation.description}</p>}
                        {formation.technologies && <p><strong>Technologies :</strong> {formation.technologies}</p>}
                    </div>
                )}

                {activeTab === "Cours" && (
                    <p className="leading-relaxed whitespace-pre-wrap text-sm">{formation.cours}</p>
                )}

                {activeTab === "Établissement" && formation.description_etablissement && (
                    <p className="leading-relaxed whitespace-pre-wrap text-sm">
                        {formation.description_etablissement}
                    </p>
                )}
            </div>
        </article>
    );
}

// ── Composant principal ────────────────────────────────────────────
const Parcours = ({ formations, experiences }: ParcoursProps) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>("Expériences");

    return (
        <section id="parcours" className="scroll-mt-[8dvh]">
            <h2>Parcours</h2>

            {/* ── Onglets principaux ── */}
            <div className="flex flex-wrap mb-3">
                {tab_list.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{ margin: '5px', padding: '5px 20px' }}
                        className={`hoverable cursor-none
                            ${activeTab === tab
                                ? "bg-black text-white"
                                : "bg-white text-black border"
                            }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ── Grille responsive ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activeTab === "Expériences" &&
                    experiences.map((exp) => <ExperienceCard key={exp.id} exp={exp} />)
                }
                {activeTab === "Formations" &&
                    formations.map((formation) => <FormationCard key={formation.id} formation={formation} />)
                }
            </div>
        </section>
    );
};

export default Parcours;
