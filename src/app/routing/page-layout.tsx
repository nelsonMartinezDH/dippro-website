"use client";

import React from "react";
import Header from "@/app/homeComponents/layouts/routing/Header";
import Breadcrumb from "@/app/homeComponents/layouts/routing/Breadcrumb";
import Footer from "@/app/homeComponents/layouts/routing/Footer";
import ConvocatoriasAlert from "@/app/homeComponents/layouts/routing/Convocatorias-Alert";
import GedopracCardManager from "@/admin/sections/for-students/practicas-profesionales/GedopracCardManager";
import StepByStepManager from "@/admin/sections/for-students/practicas-profesionales/StepByStepManager";
import VinculationModalityManager from "@/admin/sections/for-students/practicas-profesionales/VinculationModalityManager";
import StatsManager from "@/admin/sections/for-students/practicas-profesionales/StatsManager";
import TestimoniesManager from "@/admin/sections/for-students/testimonios/TestimoniesManager";
import AdminPanel from "@/admin/sections/admin-panel/AdminPanel";

interface PageLayoutProps {
    children: React.ReactNode;
}

export default function PageLayout({children}: PageLayoutProps) {
    return (
        <div>
            <Header/>
            <ConvocatoriasAlert />
            <Breadcrumb/>
            {children}
            <Footer/>
        </div>
    )
}