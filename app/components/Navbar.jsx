// components/Navbar.jsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import NavLink from './NavLink';
import MenuOverlay from './MenuOverlay';
import { motion } from 'framer-motion';

const navLinks = [
    {
        title: "About",
        path: "#about" ,
    },
    {
        title: "Projects",
        path: "#projects",
    },
    {
        title: "Contact",
        path: "#contact",
    },
];

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleNavLinkClick = (path) => {
        setNavbarOpen(false);
        const element = document.querySelector(path);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className='fixed top-0 left-0 right-0 z-10 bg-[#121222] bg-opacity-95 '>
            <div className='flex flex-wrap items-center justify-between mx-auto px-4'>
                <Link href={"/"} className='text-2x md:text-5xl text-white font-semibold h-20'></Link>
                <div className='mobile-menu block md:hidden pt-2 pb-2'>
                    <button onClick={() => setNavbarOpen(!navbarOpen)} className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'>
                        {navbarOpen ? 'X' : 'Menu'}
                    </button>
                </div>
                <div className='menu hidden md:block md:w-auto ' id="navbar">
                    <ul className='flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 '>
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink href={link.path} title={link.title} onClick={() => handleNavLinkClick(link.path)} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="md:hidden ">{navbarOpen ? <MenuOverlay links={navLinks} /> : null}</div>
        </nav>
    );
};

export default Navbar;
