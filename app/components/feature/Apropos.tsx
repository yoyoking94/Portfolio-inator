"use client";

import { useState } from "react";
import { Profil } from "@/app/types";

type ActiveTab = "Valeurs" | "Projet" | "Qualités" | "Centres d'intérêt";
const tab_list: ActiveTab[] = ["Valeurs", "Projet", "Qualités", "Centres d'intérêt"];

interface AproposProps {
    profil: Profil;
}

const Apropos = ({ profil }: AproposProps) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>("Valeurs");

    const tabContent: Record<ActiveTab, string> = {
        "Valeurs": profil.valeurs,
        "Projet": profil.projet,
        "Qualités": profil.qualitees,
        "Centres d'intérêt": profil.centre_interet,
    };

    return (
        <section id="presentation" className="scroll-mt-[8dvh]">
            <h2 className="flex items-center place-content-around" style={{ height: '50px', width: '100%' }}>
                À propos de moi
            </h2>

            {/* ── Bio ── */}
            <p className="text-sm md:text-base leading-relaxed" style={{ marginBottom: '16px' }}>
                {profil.bio}
            </p>

            {/* ── Onglets ── */}
            <div className="flex flex-wrap" style={{ marginTop: '20px' }}>
                {tab_list.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{ margin: '5px', padding: '5px 20px' }}
                        className={`hoverable cursor-none text-sm md:text-base
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

            {/* ── Contenu ── */}
            <article
                className="overflow-y-auto"
                style={{ minHeight: '120px', maxHeight: '350px', padding: '25px 0' }}
            >
                <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                    {tabContent[activeTab]}
                </p>
            </article>
        </section>
    );
};

export default Apropos;
