"use client"

import {useState} from "react";
import InformationGeneral from "@/app/homeComponents/sections/information-general";
import EmptySection from "@/app/homeComponents/layouts/Empty-Section";
import ForCompanies from "@/app/homeComponents/sections/for-companies";

export default function MainContent() {
    const [activeTab, setActiveTab] = useState("Información General")

    const tabs = ["Información General", "Para Empresas", "Para Estudiantes", "Recursos", "Contacto"]

    const renderTabContent = () => {
        switch (activeTab) {
            case "Información General":
                return <InformationGeneral/>;

            case "Para Empresas":
                return <ForCompanies/>;

            case "Para Estudiantes":
                return (
                    <EmptySection
                        title="Sección Para Estudiantes"
                        description="Esta sección estará disponible próximamente con información para estudiantes."
                    />
                )

            case "Recursos":
                return (
                    <EmptySection
                        title="Sección de Recursos"
                        description="Esta sección estará disponible próximamente con documentos y materiales de apoyo."
                    />
                )

            case "Contacto":
                return (
                    <EmptySection
                        title="Sección de Contactos"
                        description="Esta sección estará disponible próximamente con información de contacto detallada."
                    />
                )
            default:
                return <InformationGeneral/>
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Titulo */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Dirección de Prácticas Profesionales</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Conectamos el talento universitario con oportunidades reales en el sector empresarial
                </p>
            </div>

            {/* Navegacion por pestañas */}
            <div className="mb-8">
                <div className="border-b border-gray-200 bg-white rounded-t-lg shadow-sm">
                    <nav className="flex space-x-0 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`cursor-pointer py-4 px-6 font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
                                    activeTab === tab
                                        ? "border-blue-600 text-blue-600 bg-blue-50"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-b-lg shadow-sm p-6">{renderTabContent()}</div>
        </div>
    )
}