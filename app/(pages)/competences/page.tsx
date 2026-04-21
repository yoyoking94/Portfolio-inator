"use client";

import CustomCursor from "@/app/components/common/CustomCursor";
import Footer from "@/app/components/layout/Footer";
import Nav from "@/app/components/layout/Nav";
import Link from "next/link";
import Image from "next/image";
import { motion, stagger } from "motion/react";

import ts from "@/public/svg/competences_tech/ts.svg";
import mysql from "@/public/svg/competences_tech/mysql.svg";
import angular from "@/public/svg/competences_tech/angular.svg";
import spring_boot from "@/public/svg/competences_tech/spring_boot.svg";
import docker from "@/public/svg/competences_tech/docker.svg";

import adaptabilite from "@/public/svg/competences_comp/adaptabilite.svg";
import autonomie from "@/public/svg/competences_comp/autonomie.svg";
import discipline from "@/public/svg/competences_comp/discipline.svg";
import gestion_du_temps from "@/public/svg/competences_comp/gestion_du_temps.svg";
import planification from "@/public/svg/competences_comp/planification.svg";
import priorisation from "@/public/svg/competences_comp/priorisation.svg";
import resilience from "@/public/svg/competences_comp/resilience.svg";

const techGroups = [
    { label: "Langages", items: [{ alt: "Typescript", src: ts, slug: "typescript" }] },
    {
        label: "Frameworks",
        items: [
            { alt: "Angular", src: angular, slug: "angular" },
            { alt: "Spring Boot", src: spring_boot, slug: "spring-boot" },
        ],
    },
    { label: "Bases de données", items: [{ alt: "MYSQL", src: mysql, slug: "mysql" }] },
    { label: "Outils & Infrastructure", items: [{ alt: "Docker", src: docker, slug: "docker" }] },
];

const competencesComportementales = [
    { alt: "Adaptabilité", src: adaptabilite, slug: "adaptabilite" },
    { alt: "Autonomie", src: autonomie, slug: "autonomie" },
    { alt: "Discipline", src: discipline, slug: "discipline" },
    { alt: "Gestion du temps", src: gestion_du_temps, slug: "gestion-du-temps" },
    { alt: "Planification", src: planification, slug: "planification" },
    { alt: "Priorisation", src: priorisation, slug: "priorisation" },
    { alt: "Résilience", src: resilience, slug: "resilience" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: stagger(0.08),
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: "easeOut" as const,
        },
    },
};

const CompetencesPage = () => {
    return (
        <>
            <CustomCursor />
            <Nav />

            <main>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <svg
                        viewBox="0 0 1560 420"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Présentation"
                        style={{ width: "100%", height: "auto", display: "block" }}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <rect width="1560" height="420" fill="#F7F1E8" />

                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="150"
                            fontWeight="900"
                            letterSpacing="-10"
                            fill="#E8E0DA"
                            opacity="0.9"
                        >
                            COMPÉTENCES
                        </text>

                        <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="100"
                            fontWeight="900"
                            letterSpacing="-6"
                            fill="#411222"
                        >
                            COMPÉTENCES
                        </text>
                    </svg>
                </motion.div>

                <section>
                    <motion.div
                        className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto mb-10 mt-5"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {techGroups.flatMap(({ items }) => items).map(({ alt, src, slug }) => (
                            <motion.div key={slug} variants={itemVariants}>
                                <Link
                                    href={`/competences/${slug}`}
                                    className="flex flex-col items-center gap-1 group hoverable"
                                >
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Image
                                            alt={alt}
                                            src={src}
                                            width={64}
                                            draggable={false}
                                            loading="eager"
                                            priority
                                        />
                                    </motion.div>

                                    <motion.span
                                        className="text-[10px] uppercase tracking-wider opacity-40 group-hover:opacity-70 transition-opacity duration-200"
                                        whileHover={{ opacity: 0.7 }}
                                    >
                                        {alt}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="text-center opacity-50"
                    >
                        -------------------------
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto mt-10 mb-30"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {competencesComportementales.map(({ alt, src, slug }) => (
                            <motion.div key={slug} variants={itemVariants}>
                                <Link
                                    href={`/competences/${slug}`}
                                    className="flex flex-col items-center gap-1 group hoverable"
                                >
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Image
                                            alt={alt}
                                            src={src}
                                            width={64}
                                            draggable={false}
                                            loading="eager"
                                            priority
                                        />
                                    </motion.div>

                                    <motion.span
                                        className="text-[10px] uppercase tracking-wider opacity-40 group-hover:opacity-70 transition-opacity duration-200"
                                        whileHover={{ opacity: 0.7 }}
                                    >
                                        {alt}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default CompetencesPage;