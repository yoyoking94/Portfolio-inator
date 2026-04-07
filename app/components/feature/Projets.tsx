import Image from 'next/image'
import Link from 'next/link'

import log from '@/public/Projets/log.png'
import fitness from '@/public/Projets/fitness.png'
import password from '@/public/Projets/password.png'
import portfolio from '@/public/Projets/portfolio.png'
import diet from '@/public/Projets/diet.png'

// Données centralisées
const PROJETS = [
    { name: 'Log-inator', href: '/projets/log-inator', src: log },
    { name: 'Fitness-inator', href: '/projets/fitness-inator', src: fitness },
    { name: 'Password-inator', href: '/projets/password-inator-2', src: password },
    { name: 'Portfolio-inator', href: '/projets/porfolio-inator', src: portfolio },
    { name: 'Diet-inator', href: '/projets/diet-inator', src: diet },
]

const Projets = () => {
    return (
        <section id="projets" className='min-h-dvh w-full flex flex-col items-center justify-center scroll-mt-[10dvh]'>
            <h2 className='my-10'>Projets</h2>
            <article className='flex flex-wrap justify-center items-center gap-4'>
                {PROJETS.map((projet) => (
                    <div key={projet.name} className='border w-[280px] h-[340px] flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                        {/* Image fixe 280x290 */}
                        <div className='relative w-full h-[290px] flex-shrink-0'>
                            <Image
                                src={projet.src}
                                alt={projet.name}
                                fill
                                className='object-cover'
                                draggable={false}
                                sizes="280px"
                                loading="eager"
                                priority
                            />
                        </div>

                        {/* Lien fixe en bas */}
                        <div className='flex justify-center items-center h-[50px] hoverable'>
                            <Link
                                href={projet.href}
                            >
                                {projet.name}
                            </Link>
                        </div>
                    </div>
                ))}
            </article>
        </section>
    )
}

export default Projets