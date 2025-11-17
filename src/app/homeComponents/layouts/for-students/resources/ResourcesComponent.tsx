"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Award, BookOpen, Download, Eye, FileText, Play, Search, Video} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import React, {useState} from "react";

const ResourcesComponent = () => {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-indigo-600"/>
                    Centro de Recursos Académicos
                </CardTitle>
                <p className="text-gray-600">Biblioteca digital con todos los recursos necesarios para tu
                    práctica</p>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                        <Input
                            placeholder="Buscar formatos, plantillas, videos..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-600"/>
                                Documentos Oficiales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Download className="h-4 w-4"/>
                                        <span>Carta de Presentación</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        PDF
                                    </Badge>
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Download className="h-4 w-4"/>
                                        <span>Formato de Evaluación</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        DOCX
                                    </Badge>
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Download className="h-4 w-4"/>
                                        <span>Plantilla de Informe</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        PPTX
                                    </Badge>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Video className="h-5 w-5 text-red-600"/>
                                Video Tutoriales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Play className="h-4 w-4"/>
                                        <span>Registro GEDOPRAC</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        3:45
                                    </Badge>
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Play className="h-4 w-4"/>
                                        <span>Elegir Empresa</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        5:20
                                    </Badge>
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Play className="h-4 w-4"/>
                                        <span>Entrevista Exitosa</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        7:15
                                    </Badge>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-green-600"/>
                                Guías y Manuales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Download className="h-4 w-4"/>
                                        <span>Manual del Estudiante</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        PDF
                                    </Badge>
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Download className="h-4 w-4"/>
                                        <span>Guía de Entrevistas</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        PDF
                                    </Badge>
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Download className="h-4 w-4"/>
                                        <span>Tips para el Éxito</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        PDF
                                    </Badge>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-purple-600"/>
                                Ejemplos y Casos
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4"/>
                                        <span>Casos de Éxito</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        8
                                    </Badge>
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4"/>
                                        <span>Informes Ejemplo</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        5
                                    </Badge>
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Video className="h-4 w-4"/>
                                        <span>Presentaciones</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        3
                                    </Badge>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

export default ResourcesComponent;