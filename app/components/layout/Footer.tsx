import Link from 'next/link'

const Footer = () => {
    return (
        <footer
            className='flex flex-col xl:flex-row items-center xl:place-content-between gap-2 py-5 px-6 xl:py-0 min-h-[10dvh] text-center xl:text-left text-sm border-t'
        >
            <div className='shrink-0'>
                Copyright <span>©</span>2026 Yovish MOONESAMY. Tous droits réservés.
            </div>

            <div className='flex flex-col xl:flex-row items-center xl:justify-end'>
                <Link
                    href="/mentions-legales"
                    className="transition cursor-none underline hoverable whitespace-nowrap px-4 text-base"
                >
                    Mentions légales
                </Link>
                <Link
                    href="/politique-confidentialite"
                    className="transition cursor-none underline hoverable whitespace-nowrap px-4 text-base"
                >
                    Politique de confidentialité
                </Link>
                <Link
                    href="/conditions-utilisation"
                    className="transition cursor-none underline hoverable whitespace-nowrap px-4 text-base"
                >
                    Conditions d&apos;utilisation
                </Link>
            </div>
        </footer>
    )
}

export default Footer
