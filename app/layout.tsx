import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/common/CustomCursor";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import { getAllPortfolioData } from "./lib/database";

// Metadata = ce que Google et les réseaux sociaux lisent
export const metadata: Metadata = {
  title: {
    // %s sera remplacé par le titre de chaque page
    template: "%s | Yovish MOONESAMY — Portfolio",
    default: "Yovish MOONESAMY — Portfolio",
  },
  description:
    "Portfolio de Yovish MOONESAMY, développeur web en alternance spécialisé en Next.js et TypeScript.",
  keywords: ["développeur web", "Next.js", "TypeScript", "portfolio"],
  authors: [{ name: "Yovish" }],
  openGraph: {
    title: "Yovish MOONESAMY — Développeur Web",
    description:
      "Portfolio de Yovish MOONESAMY, développeur web en alternance spécialisé en Next.js et TypeScript.",
    type: "website",
    locale: "fr_FR",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getAllPortfolioData();
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={'antialiased'}>
        <CustomCursor />
        <Header profil={data.profil} ></Header>
        <Nav></Nav>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
