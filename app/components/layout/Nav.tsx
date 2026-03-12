"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/yovish-space-logo-black.svg";

const navLinks = [
    { label: "Présentation", href: "/#presentation" },
    { label: "Compétences", href: "/#competences" },
    { label: "Parcours", href: "/#parcours" },
    { label: "Projets", href: "/#projets" },
    { label: "Contact", href: "/#contact" },
];

const Nav = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <nav
            className="sticky top-0 w-full h-[8dvh] flex items-center justify-between z-[9999] bg-white border-b-2 border-black"
            style={{ padding: '0 5%' }}
        >
            <a href="#" className="flex items-center h-full py-1">
                <Image
                    alt="logo"
                    src={logo}
                    width={100}
                    className="h-full w-auto cursor-none object-contain hoverable"
                    draggable={false}
                />
            </a>

            <ul className="hidden md:flex gap-7">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="cursor-none hoverable uppercase tracking-widest text-sm hover:underline"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            <button
                className="relative flex flex-col items-center justify-center w-8 h-8 md:hidden z-[10000] focus:outline-none cursor-none hoverable"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setOpen((o) => !o)}
            >
                <div
                    className={`absolute w-8 h-0.5 bg-black transition-all duration-300
                        ${open ? "rotate-45 top-3.5" : "top-2"}
                    `}
                />
                <div
                    className={`absolute w-8 h-0.5 bg-black transition-all duration-300
                        ${open ? "-rotate-45 top-3.5" : "top-5"}
                    `}
                />
                <div
                    className={`absolute w-8 h-0.5 bg-black transition-all duration-300
                        ${open ? "opacity-0" : "top-3.5"}
                    `}
                />
            </button>

            <div
                className={`fixed inset-0 z-[9998] bg-white flex flex-col items-center justify-center gap-8 transition-all duration-300
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
                aria-hidden={!open}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="uppercase tracking-widest text-2xl font-bold cursor-none hoverable"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Nav;
