"use client";

import React, { useEffect, useState } from "react";
import {
    GraduationCap,
    Building2,
    Globe,
    Clock,
    Target,
    Mail,
    FileText,
    Video,
    Users,
    MessageSquare,
    CheckCircle,
    Play,
    Download,
    Award,
    Briefcase,
    TrendingUp,
    BookOpen,
    AlertCircle,
    BarChart3,
    Phone,
    ExternalLink
} from "lucide-react";
import * as Icons from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Resource {
    idDto: number;
    stepNumberDto: number;
    titleDto: string;
    iconNameDto: string;
    fileUrlDto: string;
}


const apiBaseUrl = "http://localhost:5213";

const PrePracticesProcess = () => {
    const [resources, setResources] = useState<Resource[]>([]);

    const fetchResources = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/PrePracticasResource`);
            const data = await res.json();
            setResources(data);
        } catch (error) {
            console.error("Error cargando recursos:", error);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const getResourcesByStep = (stepNumber: number) =>
        resources.filter((r) => r.stepNumberDto === stepNumber);


    const renderResourceButtons = (stepNumber: number) => {
        const stepResources = getResourcesByStep(stepNumber);
        if (!stepResources || stepResources.length === 0) return null;

        return (
            <div className="flex flex-wrap gap-2 mt-3">
                {stepResources.map((res) => {
                    const Icon = (Icons as any)[res.iconNameDto] || Icons.FileText;
                    const fullUrl =
                        res.fileUrlDto.startsWith("http") || res.fileUrlDto.startsWith("/")
                            ? `${apiBaseUrl}${res.fileUrlDto}`
                            : `${apiBaseUrl}/${res.fileUrlDto}`;

                    return (
                        <Button
                            key={res.idDto}
                            variant="outline"
                            size="sm"
                            className="bg-transparent hover:bg-blue-100"
                            asChild
                        >
                            <a
                                href={fullUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon className="h-3 w-3 mr-1" />
                                {res.titleDto}
                            </a>
                        </Button>
                    );
                })}
            </div>
        );
    };


    return (
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                    Proceso de Pre-Prácticas
                </CardTitle>
                <p className="text-gray-600">Preparación integral antes de iniciar tu práctica
                    profesional</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div
                        className="p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-600 rounded-full">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-green-800 mb-3 text-lg">
                                    ¿En qué consisten las Pre-Prácticas?
                                </h4>
                                <p className="text-sm text-green-700 mb-4 leading-relaxed">
                                    Las pre-prácticas se desarrollan con la <strong>Universidad del
                                        Magdalena</strong>, a través de la <strong>Dirección de Prácticas
                                            Profesionales</strong>,
                                    donde se orienta a los estudiantes en aspectos fundamentales para su
                                    preparación laboral,
                                    brindándoles competencias clave y fortaleciendo sus habilidades
                                    profesionales.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div
                                        className="p-4 bg-white rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Globe className="h-4 w-4 text-green-600" />
                                            <h5 className="font-semibold text-sm text-green-800">Modalidad</h5>
                                        </div>
                                        <p className="text-xs text-gray-600">100% Virtual</p>
                                        <Badge variant="outline" className="mt-2 text-xs">
                                            Flexible
                                        </Badge>
                                    </div>
                                    <div
                                        className="p-4 bg-white rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Building2 className="h-4 w-4 text-green-600" />
                                            <h5 className="font-semibold text-sm text-green-800">Empresa Aliada</h5>
                                        </div>
                                        <p className="text-xs text-gray-600">Coomeva</p>
                                        <Badge variant="outline" className="mt-2 text-xs">
                                            Certificada
                                        </Badge>
                                    </div>
                                    <div
                                        className="p-4 bg-white rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="h-4 w-4 text-green-600" />
                                            <h5 className="font-semibold text-sm text-green-800">Duración</h5>
                                        </div>
                                        <p className="text-xs text-gray-600">4 semanas</p>
                                        <Badge variant="outline" className="mt-2 text-xs">
                                            Intensivo
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-600 rounded-full">
                                <Target className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-blue-800 text-lg">
                                Pasos para realizar las Pre-Prácticas
                            </h4>
                        </div>

                        {/* PASO N°1 */}
                        <div className="space-y-4">
                            <div
                                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                                <div
                                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                                    1
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <GraduationCap className="h-4 w-4 text-blue-600" />
                                        <h5 className="font-semibold text-blue-800">Inscripción en el Módulo
                                            Estudiantil</h5>
                                        <Badge variant="outline" className="text-xs">
                                            Obligatorio
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-blue-700 mb-3">
                                        Primero debe inscribirse en las pre-prácticas en el módulo
                                        estudiantil de la Universidad del
                                        Magdalena durante el desarrollo del cronograma académico. Este paso
                                        es fundamental para
                                        iniciar el proceso.
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-transparent hover:bg-blue-100"
                                            asChild
                                        >
                                            <a
                                                href="https://admisiones.unimagdalena.edu.co/mEstudiantes/indexPrinc.jsp?logOut=1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                Acceder al Módulo
                                            </a>
                                        </Button>
                                    </div>
                                    {renderResourceButtons(1)}
                                </div>
                            </div>

                            {/* PASO N°2 */}
                            <div
                                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                                <div
                                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                                    2
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail className="h-4 w-4 text-blue-600" />
                                        <h5 className="font-semibold text-blue-800">Confirmación y
                                            Seguimiento por Correo</h5>
                                        <Badge variant="outline" className="text-xs">
                                            Automático
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-blue-700 mb-3">
                                        Luego se especificarán por correo electrónico los siguientes pasos
                                        del proceso, incluyendo
                                        fechas exactas, horarios de las sesiones, enlaces de acceso a las
                                        plataformas virtuales y
                                        material preparatorio.
                                    </p>

                                    {renderResourceButtons(2)}
                                </div>
                            </div>

                            {/* PASO N°3 */}
                            <div
                                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                                <div
                                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                                    3
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Video className="h-4 w-4 text-blue-600" />
                                        <h5 className="font-semibold text-blue-800">Desarrollo Virtual con
                                            Coomeva</h5>
                                        <Badge variant="outline" className="text-xs">
                                            Interactivo
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-blue-700 mb-3">
                                        Participación activa en las sesiones virtuales con Coomeva, donde
                                        recibirás formación
                                        especializada en: competencias laborales, preparación para
                                        entrevistas, habilidades blandas,
                                        ética profesional y preparación integral para prácticas.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                                        <div className="p-2 bg-blue-50 rounded text-center">
                                            <Users className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                                            <span className="text-xs text-blue-700">Trabajo en Equipo</span>
                                        </div>
                                        <div className="p-2 bg-blue-50 rounded text-center">
                                            <MessageSquare className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                                            <span className="text-xs text-blue-700">Comunicación</span>
                                        </div>
                                        <div className="p-2 bg-blue-50 rounded text-center">
                                            <Target className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                                            <span className="text-xs text-blue-700">Liderazgo</span>
                                        </div>
                                        <div className="p-2 bg-blue-50 rounded text-center">
                                            <CheckCircle className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                                            <span className="text-xs text-blue-700">Ética</span>
                                        </div>
                                    </div>

                                    {renderResourceButtons(3)}
                                </div>
                            </div>

                            {/* PASO N°4 */}
                            <div
                                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                                <div
                                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                                    4
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="h-4 w-4 text-blue-600" />
                                        <h5 className="font-semibold text-blue-800">Aprobación y registro de
                                            finalización de Pre-Practicas en AYRE</h5>
                                        <Badge variant="outline" className="text-xs">
                                            Proceso Interno
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-blue-700 mb-3">
                                        Una vez finalizadas las pre-prácticas, el área de Admisiones envía
                                        el reporte de los estudiantes que culminaron con éxito esta etapa.
                                        Dicho registro permitirá que la finalización se vea reflejada en el
                                        módulo estudiantil AYRE.
                                    </p>

                                    {renderResourceButtons(4)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-600" />
                                    Objetivos de las Pre-Prácticas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {[
                                        {
                                            icon: <Briefcase className="h-4 w-4" />,
                                            text: "Preparar al estudiante para el mundo laboral",
                                        },
                                        {
                                            icon: <TrendingUp className="h-4 w-4" />,
                                            text: "Desarrollar competencias profesionales"
                                        },
                                        {
                                            icon: <Users className="h-4 w-4" />,
                                            text: "Fortalecer habilidades blandas"
                                        },
                                        {
                                            icon: <FileText className="h-4 w-4" />,
                                            text: "Conocer el marco legal laboral"
                                        },
                                        {
                                            icon: <Target className="h-4 w-4" />,
                                            text: "Mejorar la empleabilidad"
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                                        >
                                            <div className="p-1 bg-purple-100 rounded">
                                                {React.cloneElement(item.icon, { className: "h-4 w-4 text-purple-600" })}
                                            </div>
                                            <span className="text-sm text-purple-700">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-orange-600" />
                                    Requisitos Académicos
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {[
                                        {
                                            icon: <BarChart3 className="h-4 w-4" />,
                                            text: "Haber completado el 60% de créditos",
                                            status: "Verificable",
                                        },
                                        {
                                            icon: <BookOpen className="h-4 w-4" />,
                                            text: "Estar matriculado en el semestre actual",
                                            status: "Obligatorio",
                                        },
                                        {
                                            icon: <AlertCircle className="h-4 w-4" />,
                                            text: "No tener materias pendientes críticas",
                                            status: "Importante",
                                        },
                                        {
                                            icon: <Clock className="h-4 w-4" />,
                                            text: "Contar con disponibilidad de tiempo",
                                            status: "Flexible",
                                        },
                                        {
                                            icon: <Globe className="h-4 w-4" />,
                                            text: "Acceso a internet estable",
                                            status: "Técnico"
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-1 bg-orange-100 rounded">
                                                    {React.cloneElement(item.icon, { className: "h-4 w-4 text-orange-600" })}
                                                </div>
                                                <span className="text-sm text-orange-700">{item.text}</span>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {item.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PrePracticesProcess;
