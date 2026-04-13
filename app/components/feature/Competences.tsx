import Link from 'next/link'
import Image from 'next/image'

import js from '@/public/svg/competences_tech/js.svg'
import ts from '@/public/svg/competences_tech/ts.svg'
import py from '@/public/svg/competences_tech/py.svg'
import sql from '@/public/svg/competences_tech/sql.svg'
import nosql from '@/public/svg/competences_tech/nosql.svg'
import angular from '@/public/svg/competences_tech/angular.svg'
import spring_boot from '@/public/svg/competences_tech/spring_boot.svg'
import docker from '@/public/svg/competences_tech/docker.svg'

const techGroups = [
    {
        label: 'Langages',
        items: [
            { alt: 'Javascript', src: js, slug: 'javascript' },
            { alt: 'Typescript', src: ts, slug: 'typescript' },
            { alt: 'Python', src: py, slug: 'python' },
        ],
    },
    {
        label: 'Frameworks',
        items: [
            { alt: 'Angular', src: angular, slug: 'angular' },
            { alt: 'Spring Boot', src: spring_boot, slug: 'spring-boot' },
        ],
    },
    {
        label: 'Bases de données',
        items: [
            { alt: 'SQL', src: sql, slug: 'sql' },
            { alt: 'NoSQL', src: nosql, slug: 'nosql' },
        ],
    },
    {
        label: 'Outils & Infrastructure',
        items: [
            { alt: 'Docker', src: docker, slug: 'docker' },
        ],
    },
]

const competencesComportementales = [
    { label: 'Adaptabilité', slug: 'adaptabilite' },
    { label: 'Autonomie', slug: 'autonomie' },
    { label: 'Discipline', slug: 'discipline' },
    { label: 'Gestion du temps', slug: 'gestion-du-temps' },
    { label: 'Planification', slug: 'planification' },
    { label: 'Priorisation', slug: 'priorisation' },
    { label: 'Résilience', slug: 'resilience' },
]

const TechGroup = ({ label, items }: { label: string; items: typeof techGroups[0]['items'] }) => (
    <div className="flex flex-col items-center gap-4 flex-1 min-w-0 p-4">
        {/* Titre du groupe */}
        <p className="text-xs font-semibold uppercase tracking-widest opacity-40">
            {label}
        </p>

        {/* Icônes */}
        <div className="flex flex-wrap justify-center items-center gap-4">
            {items.map(({ alt, src, slug }) => (
                <Link key={slug} href={`/competences/${slug}`}>
                    <Image
                        alt={alt}
                        src={src}
                        width={80}
                        className="hoverable"
                        draggable={false}
                        loading="eager"
                        priority
                    />
                </Link>
            ))}
        </div>
    </div>
)

const Competences = () => {
    return (
        <section>
            <h2 className="text-center">Compétences</h2>

            {/* Compétences Techniques */}
            <article>
                <h3 className="py-5">Techniques :</h3>

                <div className="flex flex-col gap-4">
                    {/* Ligne 1 : Langages + Frameworks */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <TechGroup {...techGroups[0]} />
                        <TechGroup {...techGroups[1]} />
                    </div>

                    {/* Ligne 2 : Bases de données + Outils & Infrastructure */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <TechGroup {...techGroups[2]} />
                        <TechGroup {...techGroups[3]} />
                    </div>
                </div>
            </article>

            {/* Compétences Comportementales */}
            <article className="py-10">
                <h3 className="py-5">Comportementales :</h3>
                <div className="flex flex-wrap justify-center items-center">
                    {competencesComportementales.map(({ label, slug }) => (
                        <Link
                            key={slug}
                            className="border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable"
                            href={`/competences/${slug}`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </article>
        </section>
    )
}

export default Competences