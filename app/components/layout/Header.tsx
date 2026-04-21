import Link from 'next/link'

const NAV_LINKS = [
  { href: '/presentation', label: 'Présentation' },
  { href: '/competences', label: 'Compétences' },
  { href: '/parcours', label: 'Parcours' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/contact', label: 'Contact' },
]

const Header = () => (
  <header className="min-h-dvh flex flex-col items-center justify-center bg-[url('/svg/bg/bg.svg')] bg-no-repeat bg-cover">
    <h1 className="bg-[#f7f4e7] text-center">Portfolio de Yovish MOONESAMY</h1>
    <span>----------------------------------</span>
    <h2 className="bg-[#f7f4e7] text-center">Expert en Ingénierie Logicielle</h2>
    <nav className="flex flex-wrap justify-center items-center my-5">
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable"
        >
          {label}
        </Link>
      ))}
    </nav>
  </header>
)

export default Header