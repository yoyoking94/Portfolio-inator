import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className="scroll-smooth"
    >
      <body>
        {children}
      </body>
    </html>
  );
}
