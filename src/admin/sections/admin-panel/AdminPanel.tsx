"use client";

import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Building2,
    GraduationCap,
    Info,
    FolderOpen,
    Menu,
    X,
    FolderKanban,
    ArrowLeftCircle,
    Home,
    Loader2,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import Dashboard from "./Dashboard";

const InformationGeneralAdmin = lazy(() => import("./InformationGeneralAdmin"));
const ForCompaniesAdmin = lazy(() => import("./ForCompaniesAdmin"));
const ForStudentsAdmin = lazy(() => import("./for-students/ForStudentsAdmin"));
const ConvocatoriasAdmin = lazy(() => import("./ConvocatoriasAdmin"));

export default function AdminPanel({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeItem, setActiveItem] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Información General", icon: Info },
        { name: "Para Empresas", icon: Building2 },
        { name: "Para Estudiantes", icon: GraduationCap },
        { name: "Convocatorias", icon: FolderOpen },
    ];

    const renderContent = () => {
        switch (activeItem) {
            case "Dashboard":
                return <Dashboard />;
            case "Información General":
                return <InformationGeneralAdmin />;
            case "Para Empresas":
                return <ForCompaniesAdmin />;
            case "Para Estudiantes":
                return <ForStudentsAdmin />;
            case "Convocatorias":
                return <ConvocatoriasAdmin />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* --- SIDEBAR --- */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
  initial={{ x: -320, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: -320, opacity: 0 }}
  transition={{ duration: 0.38, ease: "easeOut" }}
  className="
    w-72 relative flex flex-col
    bg-gradient-to-b 
  from-[#145BB5]
  via-[#10459A]
  to-[#072B63]
    text-white
    shadow-[6px_0_30px_rgba(0,0,0,0.35)]
    border-r border-white/10
    backdrop-blur-2xl
    overflow-hidden
    rounded-r-3xl
  "
>

                        {/* Ambient soft light */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none" />

                        {/* HEADER */}
                        <div className="relative px-6 py-7 border-b border-white/10 bg-white/5 backdrop-blur-sm shadow-lg">
                            <div className="flex items-center gap-5">

                                {/* LOGO con glow premium */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-yellow-300/50 blur-xl opacity-30" />
                                    <div className="relative bg-yellow-400 p-2.5 rounded-xl shadow-[0_0_18px_rgba(255,224,102,0.45)] ring-1 ring-yellow-300/70">
                                        <img
                                            src="https://cdn.unimagdalena.edu.co/images/escudo/bg_light/512.png"
                                            alt="Logo Unimagdalena"
                                            className="w-10 h-10 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-xl font-extrabold tracking-wide drop-shadow">
                                        Admin Panel
                                    </h1>
                                    <p className="text-xs text-blue-100/80 font-medium">
                                        Universidad del Magdalena
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* NAV */}
                        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-thin">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href="#"
                                        onClick={() => setActiveItem(item.name)}
                                        className={clsx(
                                            `
                group flex items-center justify-between px-4 py-3.5 
                rounded-xl relative transition-all duration-200
                `,
                                            activeItem === item.name
                                                ? `
                    bg-white/10
                    shadow-[0_4px_12px_rgba(0,0,0,0.25)]
                    ring-1 ring-yellow-300/40
                    text-white
                  `
                                                : `
                    text-blue-100/75 
                    hover:text-white 
                    hover:bg-white/5
                  `
                                        )}
                                    >
                                        {/* INDICADOR ACTIVO */}
                                        {activeItem === item.name && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="
                    absolute left-0 top-1/2 -translate-y-1/2 
                    w-1.5 h-9 rounded-r-full 
                    bg-yellow-300
                    shadow-[0_0_14px_rgba(255,224,102,0.65)]
                  "
                                                transition={{ type: "spring", stiffness: 350, damping: 26 }}
                                            />
                                        )}

                                        {/* Item content */}
                                        <div className="flex items-center gap-4 flex-1 relative z-10">
                                            <div
                                                className={clsx(
                                                    "p-2 rounded-lg backdrop-blur transition-all",
                                                    activeItem === item.name
                                                        ? "bg-yellow-300/25 text-yellow-100"
                                                        : "bg-white/10 text-blue-100 group-hover:bg-white/20 group-hover:text-white"
                                                )}
                                            >
                                                <item.icon className="h-5 w-5" />
                                            </div>

                                            <span className="font-medium text-sm tracking-wide">
                                                {item.name}
                                            </span>
                                        </div>

                                        <ChevronRight
                                            className={clsx(
                                                "h-4 w-4 transition-all",
                                                activeItem === item.name
                                                    ? "text-yellow-200 opacity-100 translate-x-0"
                                                    : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 text-blue-100"
                                            )}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* FOOTER */}
                        <div className="relative px-6 py-5 bg-white/5 border-t border-white/10 backdrop-blur-sm shadow-inner">
                            <div className="flex items-center gap-2 text-xs text-blue-100/60">
                                <Sparkles className="h-3.5 w-3.5 text-yellow-300/80" />
                                <span>© 2025 Unimagdalena</span>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <div className="flex-1 flex flex-col relative">
                {/* Header superior */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-3 shadow-sm border-b sticky top-0 z-10"
                >
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        >
                            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 text-foreground tracking-tight">
                                Panel Administrativo
                            </h2>
                            <p className="text-xs text-muted-foreground font-medium">
                                DIPPRO • Dirección de Prácticas Profesionales
                            </p>
                        </div>
                    </div>

                    {/* Botón volver al sitio */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-semibold text-white 
                                        bg-gradient-to-r from-blue-600 to-blue-700
                                        hover:from-blue-700 hover:to-blue-800 
                                        px-4 py-2.5 
                                        rounded-xl 
                                        shadow-md 
                                        hover:shadow-lg 
                                        transition-all 
                                        group"
                        >
                            <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                            <span className="hidden sm:inline">Volver al sitio</span>
                        </Link>
                    </div>
                </motion.header>

                {/* Contenido */}
                <main className="flex-1 overflow-y-auto p-8">
                    <motion.div
                        key={activeItem}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-6xl mx-auto"
                    >
                        <Suspense
                            fallback={
                                <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
                                    <Loader2 className="animate-spin h-10 w-10 mb-4 text-indigo-600" />
                                    <p className="text-lg font-medium">Cargando módulo...</p>
                                </div>
                            }
                        >
                            {renderContent()}
                        </Suspense>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

