import React from 'react'
import Image from "next/image";
import Photo from '@/public/photo.png'
import Link from 'next/link';


const Presentation = () => {
    return (
        <section id="presentation" className='min-h-dvh w-full flex flex-col items-center justify-center scroll-mt-[10dvh]'>
            <h2 className='my-10'>Présentation</h2>
            <div className='flex flex-col xl:flex-row justify-content items-center'>
                <Image
                    alt="logo"
                    src={Photo}
                    width={500}
                    className="h-full w-auto cursor-none object-contain p-5 hoverable"
                    draggable={false}
                    loading="eager"
                    priority
                />
                <p>En tant qu&apos;alternant en support applicatif chez Lactalis International, j&apos;ai acquis une solide expérience en diagnostic et résolution d&apos;incidents sur des outils comme Windev, Webdev et SQL Developer, tout en gérant le parc informatique et formant les utilisateurs à Microsoft 365. Précédemment, j&apos;ai développé des applications web et mobile full-stack chez Elyotech et des interfaces front-end chez Circeo pour des clients tels que BNP Paribas, Société Générale, Fiat, Renault et Carrefour. Ma formation en ingénierie logicielle (Master ISCOD) et développement web full-stack (Licence Cloud Campus, BTS SIO) m&apos;a permis de maîtriser HTML, CSS, JS/TS, React, Node.js, bases de données et outils DevOps comme Docker et Git.</p>
            </div>
            <div className='flex flex-wrap justify-content items-center my-10'>
                <button><Link href="/presentation" className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable'>Mes valeurs</Link></button>
                <button><Link href="/presentation#projet" className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable'>Mon projet</Link></button>
                <button><Link href="/presentation#qualite" className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable'>Mes qualités</Link></button>
                <button><Link href="/presentation#centreInteret" className='border px-5 py-3 m-1 hover:bg-black hover:text-[#f7f4e7] hoverable'>Mes centres d&apos;intérêt</Link></button>
            </div>
        </section>
    )
}

export default Presentation