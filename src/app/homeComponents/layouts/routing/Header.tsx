"use client"

import { useState } from "react"
import { Search, Menu, X, UserCog } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigationItems = [
        "Inicio",
        "Mi Universidad",
        "Oferta Académica",
        "Académico",
        "Investigación",
        "Extensión",
        "Internacionalización",
    ]

    return (
        <header className="bg-gradient-to-r from-[#1e5a96] to-[#2d6bb0] text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo and university name */}
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <img
                                src="https://cdn.unimagdalena.edu.co/images/escudo/bg_dark/default.png"
                                alt="Logo Universidad del Magdalena"
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-normal tracking-wide">UNIVERSIDAD DEL</h1>
                            <h2 className="text-xl font-extrabold tracking-wide">MAGDALENA</h2>
                        </div>
                    </div>

                    {/* Navigation: For desktop size */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navigationItems.map((item, index) => (
                            <a
                                href="#"
                                key={index}
                                className="hover:text-orange-300 transition-all duration-200 text-sm font-medium relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-300 transition-all duration-200 group-hover:w-full"></span>
                            </a>
                        ))}
                        <Button variant="ghost" size="icon" className="text-white hover:text-orange-300 hover:bg-white/10">
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Icono de usuario para ir al panel */}
                        <Link href="/admin">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:text-orange-300 hover:bg-white/10 transition"
                                title="Ir al panel administrativo"
                            >
                                <UserCog className="h-8 w-8" />
                            </Button>
                        </Link>
                    </nav>

                    {/* Button: mobile version */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-white hover:bg-white/10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Navigation: For mobile size */}
                {isMenuOpen && (
                    <nav className="lg:hidden pb-4 border-t border-blue-700/30 mt-2 pt-4">
                        <div className="flex flex-col space-y-3">
                            {navigationItems.map((item, index) => (
                                <a
                                    href="#"
                                    key={index}
                                    className="hover:text-orange-300 transition-colors text-sm font-medium py-2 px-2 rounded hover:bg-white/10"
                                >
                                    {item}
                                </a>
                            ))}

                            {/* Icono de usuario en móvil */}
                            <Link
                                href="/admin"
                                className="flex items-center gap-2 py-2 px-2 text-sm font-medium hover:text-orange-300 hover:bg-white/10 rounded transition"
                            >
                                <UserCog className="h-5 w-5" />
                                <span>Panel Administrativo</span>
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}
