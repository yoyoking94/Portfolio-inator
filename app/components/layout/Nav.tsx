"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/public/yovish-space-logo-black.svg";
import type { Variants } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SubItem = { label: string; href: string };

type NavItem = {
  label: string;
  href?: string;
  children?: (SubItem & { children?: SubItem[] })[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { label: "Présentation", href: "/presentation" },
  {
    label: "Compétences",
    href: "/competences",
    children: [
      {
        label: "Techniques",
        href: "",
        children: [
          { label: "Typescript", href: "/competences/typescript" },
          { label: "Angular", href: "/competences/angular" },
          { label: "Spring Boot", href: "/competences/spring-boot" },
          { label: "MYSQL", href: "/competences/mysql" },
          { label: "Docker", href: "/competences/docker" },
        ],
      },
      {
        label: "Comportementales",
        href: "/comportementales",
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
  { label: "Parcours", href: "/parcours" },
  {
    label: "Réalisations",
    href: "/realisations",
    children: [
      { label: "PMT-inator", href: "/realisations/pmt-inator" },
      { label: "Shopwise-inator", href: "/realisations/shopwise-inator" },
      { label: "IF-inator", href: "/realisations/if-inator" },
      { label: "Fitness-inator", href: "/realisations/fitness-inator" },
      { label: "Portfolio-inator", href: "/realisations/portfolio-inator" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.18, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0, y: -6, scale: 0.98,
    transition: { duration: 0.14, ease: "easeIn" as const },
  },
};

const flyoutVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.16, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0, x: -6,
    transition: { duration: 0.12, ease: "easeIn" as const },
  },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.22, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0, y: -8,
    transition: { duration: 0.16, ease: "easeIn" as const },
  },
};

const accordionVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1, height: "auto",
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0, height: 0,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  exit: {},
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.15, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0, y: -4,
    transition: { duration: 0.1 },
  },
};

// ─── Desktop : sous-menu niveau 2 (flyout latéral) ───────────────────────────

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

  useEffect(() => {
    if (open && submenuRef.current) {
      const rect = submenuRef.current.getBoundingClientRect();
      setOpenLeft(rect.right > window.innerWidth);
    }
  }, [open]);

  if (!item.children) {
    return (
      <motion.li variants={itemVariants}>
        <a
          href={item.href}
          className="flex items-center gap-1 px-4 py-2 whitespace-nowrap hover:bg-white/10 hoverable"
        >
          {item.label}
        </a>
      </motion.li>
    );
  }

  return (
    <motion.li
      ref={ref}
      className="relative"
      variants={itemVariants}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { setOpen(false); setOpenLeft(false); }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-4 py-2 w-full whitespace-nowrap hover:bg-white/10 hoverable"
      >
        {item.label}
        <motion.span
          animate={{ rotate: open ? (openLeft ? 0 : 90) : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={submenuRef}
            variants={flyoutVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute top-0 min-w-[180px] shadow-lg bg-[#e6e3d7] border border-white/10 z-50 ${openLeft ? "right-full" : "left-full"
              }`}
          >
            {item.children.map((child) => (
              <li key={child.label}>
                <a
                  href={child.href}
                  className="flex items-center px-4 py-2 whitespace-nowrap hover:bg-white/10 hoverable"
                >
                  {child.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
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
        <Link
          href={item.href ?? "/"}
          className="px-4 py-2 flex items-center hover:bg-white/10 hoverable"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center hover:bg-white/10">
        <Link href={item.href ?? "/"} className="px-4 py-2 hoverable">
          {item.label}
        </Link>
        <button onClick={() => setOpen((v) => !v)} className="pr-3 py-2 hoverable">
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ display: "flex" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            variants={{ ...dropdownVariants, ...listVariants }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 min-w-[200px] shadow-lg bg-[#e6e3d7] border border-white/10 z-40 py-1"
          >
            {item.children.map((child) => (
              <FlyoutItem key={child.label} item={child} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
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
      <div className="flex items-center" style={{ paddingLeft: depth * 16 }}>
        <Link
          href={item.href ?? "/"}
          className="flex-1 py-2 px-3 hover:bg-white/10 hoverable"
        >
          {item.label}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={`${open ? "Fermer" : "Ouvrir"} ${item.label}`}
            className="px-3 py-2 hover:bg-white/10 hoverable flex-shrink-0"
          >
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ display: "flex" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && open && (
          <motion.ul
            variants={accordionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: "hidden" }}
            className="border-l border-white/20 ml-4"
          >
            {(item as NavItem).children!.map((child) => (
              <MobileItem key={child.label} item={child} depth={depth + 1} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

// ─── Nav principale ───────────────────────────────────────────────────────────

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 relative z-50 flex items-center justify-between w-full h-[8dvh] px-6 border-b bg-[#f7f4e7]">

      {/* Logo */}
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

      {/* Desktop */}
      <ul className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => (
          <DesktopMenuItem key={item.label} item={item} />
        ))}
      </ul>

      {/* Mobile : hamburger avec animation icône */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="p-2 hover:bg-white/10"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                <Menu className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile : panneau animé */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden absolute top-full left-0 w-screen bg-[#e6e3d7] border-t border-white/10 shadow-lg"
          >
            <ul className="py-2 px-3">
              {navItems.map((item) => (
                <MobileItem key={item.label} item={item} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Nav;