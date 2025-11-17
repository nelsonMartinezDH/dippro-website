"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Building2,
    ExternalLink,
    Download,
    FileText,
} from "lucide-react";
import * as Icons from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const apiBaseUrl = "http://localhost:5213";

interface ModalityDto {
    idDto: number;
    titleDto: string;
    durationDto: string;
    descriptionDto: string;
    requirementsDto: string;
    colorDto: string;
    iconNameDto: string;
    fullDescriptionDto: string;
    filePathDto: string;
}

const getButtonColorClasses = (color: string) => {
    switch (color) {
        case "blue":
            return "bg-blue-600 hover:bg-blue-700";
        case "green":
            return "bg-green-600 hover:bg-green-700";
        case "purple":
            return "bg-purple-600 hover:bg-purple-700";
        case "orange":
            return "bg-orange-600 hover:bg-orange-700";
        case "red":
            return "bg-red-600 hover:bg-red-700";
        case "indigo":
            return "bg-indigo-600 hover:bg-indigo-700";
        default:
            return "bg-gray-600 hover:bg-gray-700";
    }
};

const getBadgeColor = (color: string) => {
    switch (color) {
        case "blue":
            return "bg-blue-100 text-blue-800";
        case "green":
            return "bg-green-100 text-green-800";
        case "purple":
            return "bg-purple-100 text-purple-800";
        case "orange":
            return "bg-orange-100 text-orange-800";
        case "indigo":
            return "bg-indigo-100 text-indigo-800";
        case "red":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getColorClasses = (color: string) => {
    const colorMap = {
        blue: "border-blue-500 bg-blue-50 text-blue-700",
        green: "border-green-500 bg-green-50 text-green-700",
        purple: "border-purple-500 bg-purple-50 text-purple-700",
        orange: "border-orange-500 bg-orange-50 text-orange-700",
        indigo: "border-indigo-500 bg-indigo-50 text-indigo-700",
        red: "border-red-500 bg-red-50 text-red-700",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

const ModalityComponent: React.FC = () => {
    const [modalities, setModalities] = useState<ModalityDto[]>([]);

    useEffect(() => {
        fetchModalities();
    }, []);

    const fetchModalities = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/Modality`);
            if (res.ok) {
                const data = await res.json();
                setModalities(data);
            }
        } catch (err) {
            console.error("Error al cargar modalidades:", err);
        }
    };

    return (
        <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-indigo-600" />
                    Modalidades de Vinculación
                </CardTitle>
                <p className="text-gray-600">
                    Explore todas las opciones disponibles para vincular estudiantes
                </p>
            </CardHeader>

            <CardContent>
                {modalities.length === 0 ? (
                    <p className="text-gray-500 italic">
                        No hay modalidades registradas.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {modalities.map((modality) => {
                            const Icon =
                                (Icons as any)[modality.iconNameDto] || FileText;

                            return (
                                <div
                                    key={modality.idDto}
                                    className={`p-4 border-2 rounded-lg hover:shadow-md transition-shadow ${getColorClasses(modality.colorDto)}`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div
                                            className={`p-2 rounded-full ${getBadgeColor(
                                                modality.colorDto
                                            )}`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {modality.durationDto}
                                        </Badge>
                                    </div>

                                    <h4 className="font-semibold mb-2">{modality.titleDto}</h4>
                                    <p className="text-sm mb-2">{modality.descriptionDto}</p>
                                    <p className="text-xs mb-3 opacity-75">
                                        {modality.requirementsDto}
                                    </p>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`cursor-pointer w-full text-white border-none ${getButtonColorClasses(
                                                    modality.colorDto
                                                )}`}
                                            >
                                                <ExternalLink className="h-4 w-4 mr-0.5" />
                                                Ver Detalles
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-3 text-xl">
                                                    <div
                                                        className={`p-2 rounded-full ${getBadgeColor(
                                                            modality.colorDto
                                                        )}`}
                                                    >
                                                        <Icon className="h-6 w-6" />
                                                    </div>
                                                    {modality.titleDto}
                                                </DialogTitle>
                                            </DialogHeader>

                                            <div className="space-y-4">
                                                <div className="flex gap-4 mb-4">
                                                    <Badge variant="outline" className="text-sm">
                                                        Duración: {modality.durationDto}
                                                    </Badge>
                                                    <Badge variant="secondary" className="text-sm">
                                                        {modality.requirementsDto}
                                                    </Badge>
                                                </div>

                                                <div className="prose max-w-none">
                                                    {modality.fullDescriptionDto
                                                        ?.split("\n\n")
                                                        .map((p, i) => (
                                                            <p
                                                                key={i}
                                                                className="text-gray-700 leading-relaxed mb-4"
                                                            >
                                                                {p}
                                                            </p>
                                                        ))}
                                                </div>

                                                <div className="pt-4 border-t flex justify-end">
                                                    {modality.filePathDto ? (
                                                        <a
                                                            href={`${apiBaseUrl}${modality.filePathDto}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button
                                                                className={`${getButtonColorClasses(
                                                                    modality.colorDto
                                                                )} flex items-center gap-2`}
                                                            >
                                                                <Download className="h-4 w-4" />
                                                                Descargar Documentos
                                                            </Button>
                                                        </a>
                                                    ) : (
                                                        <Button
                                                            disabled
                                                            className="bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                                                        >
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Documentos no disponibles
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ModalityComponent;