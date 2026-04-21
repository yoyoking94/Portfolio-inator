import Link from 'next/link'
import Image from 'next/image'

const FOOTER_LINKS = [
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
    { href: '/conditions-utilisation', label: "Conditions d'utilisation" },
]

const Footer = () => (
    <footer className="flex flex-col xl:flex-row items-center xl:place-content-between gap-2 py-4 px-6 xl:py-0 min-h-[8dvh] text-center xl:text-left text-sm border-t">
        <div className="shrink-0 flex flex-wrap justify-center items-center">
            <span>Copyright © 2026 Yovish MOONESAMY</span>
            <Image src="/photo.png" width={50} height={50} alt="moi" />
            <span>Tous droits réservés.</span>
        </div>

        <nav className="flex flex-col xl:flex-row items-center xl:justify-end">
            {FOOTER_LINKS.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className="transition cursor-none underline hoverable whitespace-nowrap px-4 text-base"
                >
                    {label}
                </Link>
            ))}
        </nav>
    </footer>
)

export default Footer