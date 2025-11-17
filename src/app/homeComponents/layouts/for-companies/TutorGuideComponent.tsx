"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import * as Icons from "lucide-react";

const apiBaseUrl = "http://localhost:5213";

interface TutorGuideResourceDto {
  idDto: number;
  titleDto: string;
  iconNameDto: string;
  filePathDto: string;
  columnNumberDto: number;
}

const TutorGuideComponent: React.FC = () => {
    const [column1Resources, setColumn1Resources] = useState<TutorGuideResourceDto[]>([]);
    const [column2Resources, setColumn2Resources] = useState<TutorGuideResourceDto[]>([]);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res1 = await fetch(`${apiBaseUrl}/api/TutorGuide?columnNumberDto=1`);
            const res2 = await fetch(`${apiBaseUrl}/api/TutorGuide?columnNumberDto=2`);

            const data1 = await res1.json();
            const data2 = await res2.json();

            setColumn1Resources(data1);
            setColumn2Resources(data2);
        } catch (error) {
            console.error("Error cargando recursos de tutores:", error);
        }
    };

    const renderResourceButton = (resource: TutorGuideResourceDto) => {
        const IconComponent = (Icons as any)[resource.iconNameDto] || Icons.FileText;
        return (
            <Button
                key={resource.idDto}
                variant="outline"
                className="w-full justify-start bg-transparent"
                asChild
            >
                <a
                    href={`${apiBaseUrl}${resource.filePathDto}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <IconComponent className="h-4 w-4 mr-2 text-orange-600" />
                    {resource.titleDto}
                </a>
            </Button>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna 1 */}
            <div className="space-y-4">
                <h4 className="font-semibold text-orange-700">Herramientas Pedagógicas</h4>
                <div className="space-y-2">
                    {column1Resources.length > 0 ? (
                        column1Resources.map(renderResourceButton)
                    ) : (
                        <p className="text-gray-500 italic">No hay recursos disponibles.</p>
                    )}
                </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-4">
                <h4 className="font-semibold text-orange-700">Seguimiento y Evaluación</h4>
                <div className="space-y-2">
                    {column2Resources.length > 0 ? (
                        column2Resources.map(renderResourceButton)
                    ) : (
                        <p className="text-gray-500 italic">No hay recursos disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorGuideComponent;