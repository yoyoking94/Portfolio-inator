import Link from 'next/link'

const Header = () => {
  return (
    <header className="min-h-dvh flex flex-col items-center justify-center bg-[url('/svg/bg/bg.svg')] bg-no-repeat bg-cover">
      <h1 className='bg-[#f7f4e7] text-center'>Portfolio de Yovish MOONESAMY</h1>
      <span >----------------------------------</span>
      <h2 className='bg-[#f7f4e7] text-center'>Développeur web (frontend & backend)</h2>
      <div className='flex flex-wrap justify-center items-center my-5'>
        <button className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable"><Link href="/presentation">Présentation</Link></button>
        <button className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable"><Link href="/competences">Compétences</Link></button>
        <button className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable"><Link href="/parcours">Parcours</Link></button>
        <button className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable"><Link href="/realisations">Réalisations</Link></button>
        <button className="border px-5 py-3 m-1 bg-[#f7f4e7] hover:bg-black hover:text-[#f7f4e7] hoverable"><Link href="/contact">Contact</Link></button>
      </div>
    </header>
  )
}

export default Header