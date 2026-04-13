import Image from 'next/image'
import Link from 'next/link'

import log from '@/public/Projets/log.png'
import fitness from '@/public/Projets/fitness.png'
import password from '@/public/Projets/password.png'
import portfolio from '@/public/Projets/portfolio.png'
import diet from '@/public/Projets/diet.png'

// Données centralisées
const PROJETS = [
    { name: 'Log-inator', href: '/realisations/log-inator', src: log },
    { name: 'Fitness-inator', href: '/realisations/fitness-inator', src: fitness },
    { name: 'Password-inator', href: '/realisations/password-inator-2', src: password },
    { name: 'Portfolio-inator', href: '/realisations/porfolio-inator', src: portfolio },
    { name: 'Diet-inator', href: '/realisations/diet-inator', src: diet },
    { name: 'PMT-inator', href: '/realisations/pmt-inator', src: diet },
    { name: 'Shopwise-inator', href: '/realisations/shopwise-inator', src: diet },
    { name: 'EF-inator', href: '/realisations/ef-inator', src: diet },
]

const Projets = () => {
    return (
        <section>
            <article className="flex flex-wrap justify-center items-center py-10 gap-6">
                {PROJETS.map((projet) => (
                    <Link
                        key={projet.name}
                        href={projet.href}
                        className="group relative w-[500px] h-[300px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block hoverable"
                    >
                        <Image
                            src={projet.src}
                            alt={projet.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            draggable={false}
                            sizes="300px"
                            loading="eager"
                            priority
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />

                        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                            <h3 className="text-white text-xl font-semibold tracking-wide uppercase">
                                {projet.name}
                            </h3>
                            <span className="mt-2 inline-flex items-center gap-1 text-white/80 text-sm font-medium">
                                Voir le projet
                                <svg
                                    width="16" height="16" viewBox="0 0 16 16"
                                    fill="none" className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-white group-hover:w-full transition-all duration-500" />
                    </Link>
                ))}
            </article>
        </section>
    )
}

export default Projets