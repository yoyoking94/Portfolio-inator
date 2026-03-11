import Apropos from "./components/feature/Apropos";
import Competences from "./components/feature/Competences";
import Contact from "./components/feature/Contact";
import Parcours from "./components/feature/Parcours";
import Projets from "./components/feature/Projets";
import { getAllPortfolioData } from "./lib/database";

export default async function Home() {
  const data = await getAllPortfolioData();

  return (
    <main>
      <Apropos profil={data.profil} />
      <Competences
        competences_techniques={data.competences_techniques}
        competences_comportementales={data.competences_comportementales}
      />
      <Parcours
        formations={data.formations}
        experiences={data.experiences}
      />
      <Projets />
      <Contact />
    </main>
  );
}
