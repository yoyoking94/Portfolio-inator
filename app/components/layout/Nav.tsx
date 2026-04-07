"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/yovish-space-logo-black.svg";


// ─── Types ────────────────────────────────────────────────────────────────────

type SubItem = { label: string; href: string };

type NavItem = {
  label: string;
  href?: string;
  children?: (SubItem & { children?: SubItem[] })[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  {
    label: "Présentation",
    href: "/#presentation",
    children: [
      { label: "Mes valeurs", href: "/presentation" },
      { label: "Mon projet", href: "/presentation#projet" },
      { label: "Mes qualités", href: "/presentation#qualite" },
      { label: "Mes centres d'intérêt", href: "/presentation#centreInteret" },
    ],
  },
  {
    label: "Compétences",
    href: "/#competences",
    children: [
      {
        label: "Techniques",
        href: "#techniques",
        children: [
          { label: "Javascript", href: "/competences/javascript" },
          { label: "Typescript", href: "/competences/typescript" },
          { label: "Python", href: "/competences/python" },
          { label: "Sql", href: "/competences/sql" },
          { label: "NoSql", href: "/competences/noSql" },
        ],
      },
      {
        label: "Comportementales",
        href: "/#comportementales",
        children: [
          { label: "Adaptabilité", href: "/competences/adaptabilite" },
          { label: "Autonomie", href: "/competences/autonomie" },
          { label: "Discipline", href: "/competences/discipline" },
          { label: "Gestion du temps", href: "/competences/gestion-du-temps" },
          { label: "Planification", href: "/competences/planification" },
          { label: "Priorisation", href: "/competences/priorisation" },
          { label: "Résilience", href: "/competences/resilience" },
        ],
      },
    ],
  },
  { label: "Parcours", href: "/#parcours" },
  /* {
    label: "Parcours",
    href: "#parcours",
    children: [
      {
        label: "Expériences",
        href: "/#experiences",
        children: [
          { label: "Lactalis International", href: "/lactalis" },
          { label: "Elyotech", href: "/elyotech" },
          { label: "Circeo", href: "/circeo" },
          { label: "Netapsys / Sodifrance", href: "/netapsysSodifrance" },
        ],
      },
      {
        label: "Formations",
        href: "#formations",
        children: [
          { label: "Iscod", href: "/iscod" },
          { label: "Cloud Campus", href: "/cloudCampus" },
          { label: "CFA UTEC", href: "/utec" },
          { label: "IUT de MAUBEUGE", href: "/iut" },
        ],
      },
    ],
  }, */
  {
    label: "Projets",
    href: "/#projets",
    children: [
      { label: "Log-inator", href: "/projets/log-inator" },
      { label: "Fitness-inator", href: "/projets/fitness-inator" },
      { label: "Password-inator", href: "/projets/password-inator-2" },
      { label: "Portfolio-inator", href: "/projets/porfolio-inator" },
      { label: "Diet-inator", href: "/projets/diet-inator" },
    ],
  },
  { label: "Contact", href: "/#contact" },
];

// ─── Desktop : sous-menu niveau 2 (flyout latéral) ────────────────────────────

type FlyoutItemProps = {
  item: SubItem & { children?: SubItem[] };
};

const FlyoutItem = ({ item }: FlyoutItemProps) => {
  const [open, setOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const submenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Détecte si le sous-menu dépasse à droite après ouverture
  useEffect(() => {
    if (open && submenuRef.current) {
      const rect = submenuRef.current.getBoundingClientRect();
      setOpenLeft(rect.right > window.innerWidth);
    }
  }, [open]);

  if (!item.children) {
    return (
      <li>
        <a href={item.href} className="flex items-center gap-1 px-4 py-2 whitespace-nowrap hover:bg-white/10 hoverable">
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => { setOpen(false); setOpenLeft(false); }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-4 py-2 w-full whitespace-nowrap hover:bg-white/10 hoverable"
      >
        {item.label}
        <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${openLeft ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          ref={submenuRef}
          className={`absolute top-0 min-w-[180px] shadow-lg bg-[#e6e3d7] border border-white/10 z-50 ${openLeft ? "right-full" : "left-full"
            }`}
        >
          {item.children.map((child) => (
            <li key={child.label}>
              <a href={child.href} className="flex items-center px-4 py-2 whitespace-nowrap hover:bg-white/10 hoverable">
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};


// ─── Desktop : menu principal ─────────────────────────────────────────────────

type DesktopMenuItemProps = { item: NavItem };

const DesktopMenuItem = ({ item }: DesktopMenuItemProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!item.children) {
    return (
      <li>
        <Link href={item.href ?? "/"} className="px-4 py-2 flex items-center hover:bg-white/10 hoverable">
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="flex items-center hover:bg-white/10">
        {/* ── Label cliquable ── */}
        <Link href={item.href ?? "/"} className="px-4 py-2 hoverable">
          {item.label}
        </Link>
        {/* ── Chevron séparé pour ouvrir le sous-menu ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="pr-3 py-2 hoverable"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <ul className="absolute top-full left-0 min-w-[200px] shadow-lg bg-[#e6e3d7] border border-white/10 z-40 py-1">
          {item.children.map((child) => (
            <FlyoutItem key={child.label} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};


// ─── Mobile : item récursif accordéon ────────────────────────────────────────

type MobileItemProps = {
  item: (SubItem & { children?: SubItem[] }) | NavItem;
  depth?: number;
};

const MobileItem = ({ item, depth = 0 }: MobileItemProps) => {
  const [open, setOpen] = useState(false);
  const hasChildren = "children" in item && !!item.children;

  return (
    <li>
      <div className={`flex items-center ${depth > 0 ? "pl-" + depth * 4 : ""}`} style={{ paddingLeft: depth * 16 }}>
        {hasChildren ? (
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 w-full py-2 px-3 hover:bg-white/10 hoverable"
          >
            {item.label}
            <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
          </button>
        ) : (
          <Link href={item.href ?? "/"} className="flex items-center gap-2 w-full py-2 px-3 hover:bg-white/10 hoverable">
            {item.label}
          </Link>
        )}
      </div>
      {hasChildren && open && (
        <ul className="border-l border-white/20 ml-4">
          {(item as NavItem).children!.map((child) => (
            <MobileItem key={child.label} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

// ─── Nav principale ───────────────────────────────────────────────────────────

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 relative z-50 flex items-center justify-between w-full h-[10dvh] px-6 border-b bg-[#f7f4e7]">

      {/* ── Logo à gauche ── */}
      <Link href="/" className="flex items-center h-full py-1">
        <Image
          alt="logo"
          src={logo}
          width={100}
          className="h-full w-auto cursor-none object-contain hoverable"
          draggable={false}
          loading="eager"
          priority
        />
      </Link>

      {/* ── Desktop : liens à droite ── */}
      <ul className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => (
          <DesktopMenuItem key={item.label} item={item} />
        ))}
      </ul>

      {/* ── Mobile : bouton hamburger à droite ── */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="p-2 hover:bg-white/10"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile : panneau pleine largeur ── */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-screen bg-[#e6e3d7] border-t border-white/10 shadow-lg">
          <ul className="py-2 px-3">
            {navItems.map((item) => (
              <MobileItem key={item.label} item={item} />
            ))}
          </ul>
        </div>
      )}

    </nav>
  );
};

export default Nav;
