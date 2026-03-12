import { Profil } from "@/app/types";

interface Header {
    profil: Profil;
}

const Header = ({ profil }: Header) => {
    return (
        <header className='h-[100dvh] flex flex-col items-center justify-center'>
            <h1>{profil.prenom} {profil.nom}</h1>
            <h2 className="border-t-2">Développeur full-stack</h2>
        </header>
    )
}

export default Header