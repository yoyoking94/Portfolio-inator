import { useState } from "react";
import "./app.css";

import Header from "../header/header";
import Nav from "../nav/nav";
import Main from "../main/main";
import Section from "@/components/section/section";
import Footer from "../footer/footer";
import CustomCursor from "@/components/customCursor/customCursor";
import ThemeToggle from "@/components/themeToggle/themeToggle";

const LIGHT = {
  background: "#f7f4e7",
  darkerBackground: "#E9E7D8",
  color: "#0b1215",
};

const DARK = {
  background: "#0b1215",
  darkerBackground: "#080D11",
  color: "#f7f4e7",
};

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleToggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const currentTheme = theme === "light" ? LIGHT : DARK;

  return (
    <div
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.color,
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Header />
      <Nav darkerBackground={currentTheme.darkerBackground} />
      <Main className="flex flex-col">
        <Section id="formations" title="Formations" />
        <Section id="experiences" title="Expériences" />
        <Section id="competences" title="Compétences" />
        <Section id="projets" title="Projets" />
        <Section id="cv" title="CV Papier" />
        <Section id="contact" title="Contact" />
      </Main>
      <Footer darkerBackground={currentTheme.darkerBackground} />
      <CustomCursor />
      <ThemeToggle onToggle={handleToggleTheme} theme={theme} />
    </div>
  );
}
