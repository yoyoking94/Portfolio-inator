import Contact from '../feature/Contact'
import Presentation from '../feature/Presentation'
import Competences from '../feature/Competences';
import Parcours from '../feature/Parcours';
import { getAllPortfolioData } from '@/app/lib/database';
import Projets from '../feature/Projets';

const Main = async () => {
  const data = await getAllPortfolioData();

  return (
    <main className='min-h-dvh flex flex-col items-center justify-center'>
      <Presentation></Presentation>
      <Competences></Competences>
      <Parcours formations={data.formations} experiences={data.experiences}></Parcours>
      <Projets></Projets>
      <Contact></Contact>
    </main>
  )
}

export default Main; 