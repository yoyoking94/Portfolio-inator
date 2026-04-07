import Link from 'next/link'
import Image from 'next/image'

import js from '@/public/svg/js.svg'
import ts from '@/public/svg/ts.svg'
import py from '@/public/svg/py.svg'
import sql from '@/public/svg/sql.svg'
import nosql from '@/public/svg/nosql.svg'

const Competences = () => {
    return (
        <section id="competences" className='min-h-dvh w-full flex flex-col items-center justify-center scroll-mt-[10dvh]'>
            <h2 className='my-10'>Compétences</h2>
            <div>
                <article>
                    <h3 className='py-5'>Technique : </h3>
                    <div className='flex flex-wrap justify-center aligns-center'>
                        <Link href="/competences/javascript">
                            <Image alt='Javascript' src={js} width={100}
                                className="mx-5 hoverable"
                                draggable={false}
                                loading="eager"
                                priority></Image>
                        </Link>
                        <Link href="/competences/typescript">
                            <Image alt='Typescript' src={ts} width={100} height={100}
                                className="mx-5 hoverable"
                                draggable={false}
                                loading="eager"
                                priority></Image>
                        </Link>
                        <Link href="/competences/python">
                            <Image alt='Python' src={py} width={100}
                                className="mx-5 hoverable"
                                draggable={false}
                                loading="eager"
                                priority></Image>
                        </Link>
                        <Link href="/competences/sql">
                            <Image alt='Sql' src={sql} width={100}
                                className="mx-5 hoverable"
                                draggable={false}
                                loading="eager"
                                priority></Image>
                        </Link>
                        <Link href="/competences/noSql">
                            <Image alt='NoSql' src={nosql} width={100}
                                className="mx-5 hoverable"
                                draggable={false}
                                loading="eager"
                                priority></Image>
                        </Link>
                    </div>
                </article>
                <article className='py-10'>
                    <h3 className='py-5'>Comportementales : </h3>
                    <div className='flex flex-wrap justify-center items-center'>
                        <Link className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable' href="/competences/adaptabilite">Adaptabilité</Link>
                        <Link className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable' href="/competences/autonomie">Autonomie</Link>
                        <Link className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable' href="/competences/discipline">Discipline</Link>
                        <Link className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable' href="/competences/gestion-du-temps">Gestion du temps</Link>
                        <Link className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable' href="/competences/planification">Planification</Link>
                        <Link className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable' href="/competences/priorisation">Priorisation</Link>
                        <Link className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable' href="/competences/resilience">Résilience</Link>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Competences