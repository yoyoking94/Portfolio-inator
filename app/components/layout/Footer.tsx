import Link from 'next/link'

const Footer = () => {
    return (
        <footer
            className='flex flex-col md:flex-row items-center md:place-content-between gap-2 py-3 md:py-0 md:h-[6dvh] text-center md:text-left text-sm'
            style={{ padding: '0 5%' }}
        >
            <div className='shrink-0'>
                Copyright <span>©</span>2026 Yovish MOONESAMY. Tous droits réservés.
            </div>

            <div className='flex flex-wrap justify-center md:justify-end gap-3'>
                <Link
                    href="/mentions-legales"
                    className="transition cursor-none hoverable whitespace-nowrap"
                >
                    Mentions légales
                </Link>
                <Link
                    href="/politique-confidentialite"
                    className="transition cursor-none hoverable whitespace-nowrap"
                >
                    Politique de confidentialité
                </Link>
                <Link
                    href="/conditions-utilisation"
                    className="transition cursor-none hoverable whitespace-nowrap"
                >
                    Conditions d&apos;utilisation
                </Link>
            </div>
        </footer>
    )
}

export default Footer
