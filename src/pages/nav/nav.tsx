import React, { useState } from "react";

type NavProps = {
  darkerBackground: string;
  theme: "light" | "dark";
};

const navLinks = [
  { label: "Formations", href: "#formations" },
  { label: "Expériences", href: "#experiences" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "CV Papier", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

const Nav: React.FC<NavProps> = ({ darkerBackground, theme }) => {
  const [open, setOpen] = useState(false);
  const logoSrc = theme === "light" ? "/next.svg" : "/globe.svg";

  return (
    <nav
      style={{
        backgroundColor: darkerBackground,
        transition: "background 0.3s",
      }}
      className="sticky top-0 z-50 w-full h-[8vh] flex items-center justify-between px-6"
      aria-label="Navigation principale"
    >
      {/* Logo image à gauche */}
      <a href="/" className="flex items-center h-full">
        <img
          src={logoSrc}
          alt="Logo YM"
          className="h-8 w-auto cursor-none object-contain transition-all duration-300"
          draggable={false}
        />
      </a>

      {/* Menu desktop */}
      <ul className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="hoverable cursor-none px-3 py-1 rounded transition-colors duration-200 hover:bg-black/10"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Burger menu bouton pour mobile */}
      <button
        className="relative flex flex-col justify-center items-center w-8 h-8 md:hidden z-[60] focus:outline-none"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((o) => !o)}
      >
        {/* Barre 1 */}
        <div
          className={`absolute w-8 h-1 rounded bg-black dark:bg-white transition-all duration-300
            ${open ? "rotate-45 top-3.5" : "top-2"}
          `}
        />
        {/* Barre 2 */}
        <div
          className={`absolute w-8 h-1 rounded bg-black dark:bg-white transition-all duration-300
            ${open ? "-rotate-45 top-3.5" : "top-5"}
          `}
        />
        {/* Barre 3 (cachée en mode croix) */}
        <div
          className={`absolute w-8 h-1 rounded bg-black dark:bg-white transition-all duration-300
            ${open ? "opacity-0" : "top-3.5"}
          `}
        />
      </button>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-8 transition-all duration-300
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        aria-hidden={!open}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hoverable cursor-none text-2xl text-white px-6 py-2 rounded transition-colors duration-200 hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
