import Link from "next/link";
import type { CompetenceDetailData } from "@/app/types";
import * as motion from "motion/react-client";

interface Props {
    data: CompetenceDetailData;
}

interface Projet {
    label: string;
    slug: string;
}

// ── Utils ──────────────────────────────────────────────────────────────
function toSlug(nom: string): string {
    return nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

// ── Data ───────────────────────────────────────────────────────────────
const PMT_SW_IF: Projet[] = [
    { label: "PMT-inator", slug: "pmt-inator" },
    { label: "Shopwise-inator", slug: "shopwise-inator" },
    { label: "IF-inator", slug: "if-inator" },
];

const competenceTechToProjet: Record<string, Projet[]> = {
    typescript: [
        { label: "Fitness-inator", slug: "fitness-inator" },
        { label: "Portfolio-inator", slug: "portfolio-inator" },
    ],
    mysql: PMT_SW_IF,
    angular: PMT_SW_IF,
    "spring-boot": PMT_SW_IF,
    docker: [...PMT_SW_IF, { label: "Portfolio-inator", slug: "portfolio-inator" }],
};

const competenceCompToProjet: Record<string, Projet[]> = {
    planification: [
        { label: "PMT-inator", slug: "pmt-inator" },
        { label: "ShopWise-inator", slug: "shopwise-inator" },
        { label: "InnotechFusion-inator", slug: "if-inator" },
    ],
    priorisation: [
        { label: "PMT-inator", slug: "pmt-inator" },
        { label: "ShopWise-inator", slug: "shopwise-inator" },
    ],
    autonomie: [
        { label: "Fitness-inator", slug: "fitness-inator" },
        { label: "Portfolio-inator", slug: "portfolio-inator" },
        { label: "InnotechFusion-inator", slug: "if-inator" },
    ],
    "gestion-du-temps": [
        { label: "InnotechFusion-inator", slug: "if-inator" },
        { label: "Fitness-inator", slug: "fitness-inator" },
    ],
    discipline: [
        { label: "Portfolio-inator", slug: "portfolio-inator" },
        { label: "Fitness-inator", slug: "fitness-inator" },
    ],
    adaptabilite: [
        { label: "Portfolio-inator", slug: "portfolio-inator" },
        { label: "ShopWise-inator", slug: "shopwise-inator" },
    ],
    resilience: [
        { label: "InnotechFusion-inator", slug: "if-inator" },
        { label: "PMT-inator", slug: "pmt-inator" },
    ],
};

const PROJET_MENTIONS: { pattern: RegExp; label: string; slug: string }[] = [
    { pattern: /Project Management Tool/gi, label: "PMT-inator", slug: "pmt-inator" },
    { pattern: /PMT/g, label: "PMT-inator", slug: "pmt-inator" },
    { pattern: /ShopWise/gi, label: "Shopwise-inator", slug: "shopwise-inator" },
    { pattern: /InnotechFusion/gi, label: "IF-inator", slug: "if-inator" },
    { pattern: /Fitness-inator/gi, label: "Fitness-inator", slug: "fitness-inator" },
    { pattern: /Portfolio-inator/gi, label: "Portfolio-inator", slug: "portfolio-inator" },
];

// ── parsePreuves ───────────────────────────────────────────────────────
function parsePreuves(text: string): React.ReactNode[] {
    type Segment = { text: string; slug?: string; label?: string };
    let segments: Segment[] = [{ text }];

    for (const { pattern, label, slug } of PROJET_MENTIONS) {
        const result: Segment[] = [];
        for (const seg of segments) {
            if (seg.slug) { result.push(seg); continue; }
            const parts = seg.text.split(pattern);
            const matches = seg.text.match(pattern) ?? [];
            parts.forEach((part, i) => {
                if (part) result.push({ text: part });
                if (matches[i]) result.push({ text: matches[i], slug, label });
            });
        }
        segments = result;
    }

    return segments.map((seg, i) =>
        seg.slug ? (
            <Link key={i} href={`/realisations/${seg.slug}`}
                className="underline underline-offset-2 hover:text-[#411222] transition-colors duration-200 hoverable"
            >
                {seg.text}
            </Link>
        ) : (
            <span key={i}>{seg.text}</span>
        )
    );
}

// ── Variants ───────────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const articleViewport = { once: true, amount: 0, margin: "0px 0px -50px 0px" } as const;

// ── Sections ───────────────────────────────────────────────────────────
const SECTIONS = [
    { key: "definition" as const, label: "Définition" },
    { key: "preuves" as const, label: "Mes preuves" },
    { key: "autocritique" as const, label: "Autocritique" },
    { key: "evolution" as const, label: "Évolution" },
];

// ── Composant ──────────────────────────────────────────────────────────
const TemplateCompetence = ({ data }: Props) => {
    const isTechnique = data.type === "technique";
    const item = isTechnique ? data.competenceTechniqueItem! : data.competenceComportementale!;
    const { nom, definition, preuves, autocritique, evolution } = item;

    const slugNom = toSlug(nom);
    const projetsLies = isTechnique
        ? (competenceTechToProjet[slugNom] ?? [])
        : (competenceCompToProjet[slugNom] ?? []);

    const contenu: Record<string, React.ReactNode> = {
        definition,
        preuves: parsePreuves(preuves),
        autocritique,
        evolution,
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <svg viewBox="0 0 1560 420" xmlns="http://www.w3.org/2000/svg"
                    role="img" aria-label={nom}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    preserveAspectRatio="xMidYMid meet"
                >
                    <rect width="1560" height="420" fill="#F7F1E8" />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                        fontSize="150" fontWeight="900" letterSpacing="-10" fill="#E8E0DA" opacity="0.9"
                    >
                        {nom.toUpperCase()}
                    </text>
                    <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle"
                        fontSize="100" fontWeight="900" letterSpacing="-6" fill="#411222"
                    >
                        {nom.toUpperCase()}
                    </text>
                </svg>
            </motion.div>

            <section className="mb-30">
                {SECTIONS.map(({ key, label }, i) => (
                    <motion.article
                        key={key}
                        className={i === 0 ? "mb-20" : "my-20"}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={articleViewport}
                    >
                        <h3 className="my-5 font-bold">-- {label} --</h3>
                        <p className="text-justify whitespace-pre-line">{contenu[key]}</p>
                    </motion.article>
                ))}

                {projetsLies.length > 0 && (
                    <motion.article className="my-20" variants={fadeUp}
                        initial="hidden" whileInView="visible" viewport={articleViewport}
                    >
                        <h3 className="my-5 font-bold">
                            -- Projet{projetsLies.length > 1 ? "s liés" : " lié"} --
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {projetsLies.map(({ label, slug }) => (
                                <Link key={slug} href={`/realisations/${slug}`}
                                    className="border px-5 py-3 hover:bg-black hover:text-[#f7f4e7] hoverable"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </motion.article>
                )}
            </section>
        </>
    );
};

export default TemplateCompetence;