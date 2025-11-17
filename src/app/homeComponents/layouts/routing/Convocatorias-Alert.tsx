"use client"

import { useState } from "react"
import { Bell, X, ExternalLink, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConvocatoriasAlert() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="bg-gradient-to-r from-[#004A87] to-[#0066B3] text-white shadow-lg border-b-4 border-[#D17900]">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Bell className="h-5 w-5 text-[#D17900] animate-pulse" />
                            <span className="font-semibold text-lg">¡Convocatorias Abiertas!</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Nuevas oportunidades disponibles</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>579+ vacantes activas</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button
                            asChild
                            className="bg-[#D17900] hover:bg-[#B86600] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            <a
                                href="https://practicasprofesionales.unimagdalena.edu.co/Convocatoria"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2"
                            >
                                <span>Ver Convocatorias</span>
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsVisible(false)}
                            className="text-white hover:bg-white/10 p-1"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Mobile version */}
                <div className="md:hidden mt-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span>Nuevas oportunidades • 579+ vacantes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
