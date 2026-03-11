import { Profil } from "@/app/types";

interface Header {
    profil: Profil;
}

const Header = ({ profil }: Header) => {
    return (
        <header className='h-[100dvh] flex items-center justify-center'>
            <h1>{profil.prenom} {profil.nom}</h1>
        </header>
    )
}

export default Header