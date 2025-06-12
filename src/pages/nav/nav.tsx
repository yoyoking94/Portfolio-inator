import React from "react";

type NavProps = {
  darkerBackground: string;
};

const navLinks = [
  { label: "Formations", href: "#formations" },
  { label: "Expériences", href: "#experiences" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "CV Papier", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

const Nav: React.FC<NavProps> = ({ darkerBackground }) => (
  <nav
    style={{ backgroundColor: darkerBackground, transition: "background 0.3s" }}
    className="sticky top-0 z-50 w-full h-[8vh] flex items-center justify-center"
    aria-label="Navigation principale"
  >
    <ul className="flex gap-8">
      {navLinks.map((link) => (
        <li key={link.href}>
          <a href={link.href} className="hoverable cursor-none px-3 py-1 ">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
