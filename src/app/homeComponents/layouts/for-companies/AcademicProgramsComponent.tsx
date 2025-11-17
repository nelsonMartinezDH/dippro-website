"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, GraduationCap, Sparkles, Briefcase, Target, Phone, Info, Award, CheckCircle, Clock, FileCheck, Rocket, Zap, Users, BarChart3, Heart, Globe, Building2, User, Mail, Send, PhoneCall, MapPin, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import allProgramsData from "@/../public/data/for-companies/academic-programs-component/academic-programs.json";
import { programDetails } from "@/services/sections/for-companies/data/programDetails";

const AcademicProgramsComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showProfileDialog, setShowProfileDialog] = useState(false)
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null)

    const handleViewProfile = (programName: string) => {
        setSelectedProgram(programName)
        setShowProfileDialog(true)
    }

    const featuredPrograms = [
        "Ingeniería de Sistemas",
        "Administración de Empresas",
        "Contaduría Pública",
        "Derecho",
        "Psicología",
        "Medicina",
    ];

    const filteredPrograms = allProgramsData.filter((program) =>
        program.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                    Programas Académicos y Perfiles Profesionales
                </CardTitle>
                <p className="text-gray-600">
                    Explore los perfiles profesionales de nuestros programas académicos para identificar el talento que
                    mejor se adapte a las necesidades de su empresa.
                </p>
            </CardHeader>

            <CardContent>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">💡 ¿Para qué sirve esta sección?</h4>
                    <p className="text-sm text-purple-700">
                        Consulte información detallada sobre las competencias, habilidades y conocimientos que poseen
                        los egresados de cada programa académico.
                        Esta información le ayudará a tomar decisiones informadas sobre qué perfiles profesionales
                        solicitar para sus prácticas empresariales.
                    </p>
                </div>

                {/* Buscador */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Buscar por programa, facultad o competencia..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    {searchTerm && (
                        <p className="text-sm text-gray-600 mt-2">
                            Mostrando {filteredPrograms.length} resultado(s) para “{searchTerm}”
                        </p>
                    )}
                </div>

                {/* Resultados */}
                {searchTerm ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPrograms.map((item, index) => (
                            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="mb-2">
                                    <h4 className="font-semibold text-gray-800 mb-1">{item.program}</h4>
                                    <p className="text-xs text-gray-500 mb-2">{item.faculty}</p>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                                <div className="mb-3">
                                    {item.skills.slice(0, 3).map((skill, i) => (
                                        <Badge key={i} variant="secondary" className="mr-1 mb-1 text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {item.skills.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{item.skills.length - 3} más
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleViewProfile(item.program)}
                                    >
                                        Ver Perfil Profesional
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <h4 className="font-semibold text-purple-700 mb-4">🌟 Programas Más Solicitados</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {allProgramsData
                                .filter((program) => featuredPrograms.includes(program.program))
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                                    >
                                        <div className="mb-2">
                                            <h4 className="font-semibold text-gray-800 mb-1">{item.program}</h4>
                                            <p className="text-xs text-gray-500 mb-2">{item.faculty}</p>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                                        <div className="mb-3">
                                            {item.skills.map((skill, i) => (
                                                <Badge key={i} variant="secondary" className="mr-1 mb-1 text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewProfile(item.program)}
                                            >
                                                Ver Perfil Profesional
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </CardContent>

            {/* Vista: Ver perfil profesional */}
            <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                <DialogContent className="max-w-7xl max-h-[100vh] overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-200">
                    <DialogHeader className="pb-6 border-b-2 border-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-t-2xl -m-6 mb-0 p-8">
                        <DialogTitle className="flex items-center gap-4 text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                                <GraduationCap className="h-10 w-10 text-white" />
                            </div>
                            {selectedProgram}
                        </DialogTitle>
                        <p className="text-lg text-gray-600 mt-3 font-medium">
                            Conoce el perfil profesional, competencias y oportunidades laborales de nuestros egresados
                        </p>
                    </DialogHeader>

                    <div className="overflow-y-auto max-h-[calc(92vh-180px)] px-2">
                        <div className="space-y-8 py-8">
                            {selectedProgram && programDetails[selectedProgram] ? (
                                <>
                                    {/* Hero Description Card */}
                                    <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                                        <CardHeader className="relative z-10 pb-4">
                                            <CardTitle className="text-3xl font-bold flex items-center gap-3">
                                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                                    <Sparkles className="h-8 w-8" />
                                                </div>
                                                ¿Por qué elegir este programa?
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="relative z-10">
                                            <p className="text-white/95 text-lg leading-relaxed font-medium">
                                                {programDetails[selectedProgram].description}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Tabs defaultValue="general" className="w-full">
                                        <TabsList className="grid w-full grid-cols-5 gap-3 bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-xl shadow-inner h-auto">
                                            <TabsTrigger
                                                value="general"
                                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-bold py-4 rounded-lg transition-all hover:scale-105 flex-col gap-2 h-auto"
                                            >
                                                <Info className="h-6 w-6" />
                                                <span className="text-xs">General</span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="professional"
                                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-bold py-4 rounded-lg transition-all hover:scale-105 flex-col gap-2 h-auto"
                                            >
                                                <GraduationCap className="h-6 w-6" />
                                                <span className="text-xs">Perfil Profesional</span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="occupational"
                                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-bold py-4 rounded-lg transition-all hover:scale-105 flex-col gap-2 h-auto"
                                            >
                                                <Briefcase className="h-6 w-6" />
                                                <span className="text-xs">Perfil Ocupacional</span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="outcomes"
                                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-bold py-4 rounded-lg transition-all hover:scale-105 flex-col gap-2 h-auto"
                                            >
                                                <Target className="h-6 w-6" />
                                                <span className="text-xs">Resultados</span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="contact"
                                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-bold py-4 rounded-lg transition-all hover:scale-105 flex-col gap-2 h-auto"
                                            >
                                                <Phone className="h-6 w-6" />
                                                <span className="text-xs">Contacto</span>
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* General Tab */}
                                        <TabsContent value="general" className="mt-8 space-y-8 animate-in fade-in duration-500">
                                            {/* Accreditations */}
                                            <Card className="border-2 border-blue-200 shadow-2xl overflow-hidden">
                                                <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white py-6">
                                                    <CardTitle className="text-3xl flex items-center gap-3">
                                                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                            <Award className="h-8 w-8" />
                                                        </div>
                                                        Acreditaciones y Reconocimientos
                                                    </CardTitle>
                                                    <p className="text-blue-100 mt-2">Certificaciones de calidad nacional e internacional</p>
                                                </CardHeader>
                                                <CardContent className="pt-8 space-y-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                                                    {programDetails[selectedProgram].accreditations.map((accred: any, idx: number) => (
                                                        <div
                                                            key={idx}
                                                            className="group p-6 bg-white rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                                        >
                                                            <div className="flex items-start gap-4">
                                                                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                                                    <CheckCircle className="h-8 w-8 text-white" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h4 className="font-black text-green-900 text-2xl mb-2">{accred.type}</h4>
                                                                    <p className="text-gray-700 mb-3 text-base">
                                                                        <span className="font-bold text-gray-900">Otorgada por:</span> {accred.entity}
                                                                    </p>
                                                                    {accred.resolution && (
                                                                        <p className="text-gray-600 mb-2">
                                                                            <span className="font-bold">Resolución:</span> {accred.resolution}
                                                                        </p>
                                                                    )}
                                                                    {accred.year && (
                                                                        <p className="text-gray-600 mb-3">
                                                                            <span className="font-bold">Año:</span> {accred.year}
                                                                        </p>
                                                                    )}
                                                                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-base px-4 py-2 shadow-md">
                                                                        <Clock className="h-4 w-4 mr-2" />
                                                                        Vigencia: {accred.validity}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <div className="p-6 bg-white rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                                        <div className="flex items-start gap-4">
                                                            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                                                                <FileCheck className="h-8 w-8 text-white" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-black text-blue-900 text-2xl mb-2">Registro Calificado</h4>
                                                                <p className="text-gray-700 mb-3 text-base">
                                                                    <span className="font-bold text-gray-900">Resolución:</span>{" "}
                                                                    {programDetails[selectedProgram].qualifiedRegistry.resolution}
                                                                </p>
                                                                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-base px-4 py-2 shadow-md">
                                                                    <Clock className="h-4 w-4 mr-2" />
                                                                    Vigencia: {programDetails[selectedProgram].qualifiedRegistry.validity}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Mission Card */}
                                            <Card className="border-2 border-yellow-200 shadow-2xl overflow-hidden">
                                                <CardHeader className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-6">
                                                    <CardTitle className="text-3xl flex items-center gap-3">
                                                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                            <Rocket className="h-8 w-8" />
                                                        </div>
                                                        Misión del Programa
                                                    </CardTitle>
                                                    <p className="text-yellow-100 mt-2">Propósito formativo y compromiso con la excelencia</p>
                                                </CardHeader>
                                                <CardContent className="pt-8 bg-gradient-to-br from-yellow-50 to-orange-50">
                                                    <p className="text-gray-800 leading-relaxed text-xl font-medium">
                                                        {programDetails[selectedProgram].mission}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        {/* Professional Profile Tab */}
                                        <TabsContent value="professional" className="mt-8 animate-in fade-in duration-500">
                                            <Card className="border-2 border-purple-200 shadow-2xl overflow-hidden">
                                                <CardHeader className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white py-6">
                                                    <CardTitle className="text-3xl flex items-center gap-3">
                                                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                            <GraduationCap className="h-9 w-9" />
                                                        </div>
                                                        Perfil Profesional del Egresado
                                                    </CardTitle>
                                                    <p className="text-purple-100 mt-2">Competencias y habilidades que desarrollarás</p>
                                                </CardHeader>
                                                <CardContent className="pt-10 space-y-8 bg-gradient-to-br from-purple-50 to-pink-50">
                                                    <div className="p-8 bg-white rounded-2xl border-2 border-purple-300 shadow-xl">
                                                        <p className="text-gray-800 leading-relaxed text-xl font-medium">
                                                            {programDetails[selectedProgram].professionalProfile}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                                                            <Zap className="h-7 w-7 text-purple-600" />
                                                            Competencias Clave
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="group p-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-white">
                                                                <div className="flex items-center gap-3 mb-4">
                                                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                                                                        <Users className="h-7 w-7" />
                                                                    </div>
                                                                    <h4 className="font-black text-2xl">Liderazgo</h4>
                                                                </div>
                                                                <p className="text-blue-50 font-medium">
                                                                    Capacidad para dirigir equipos de trabajo y organizaciones hacia el logro de objetivos
                                                                    estratégicos
                                                                </p>
                                                            </div>

                                                            <div className="group p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-white">
                                                                <div className="flex items-center gap-3 mb-4">
                                                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                                                                        <BarChart3 className="h-7 w-7" />
                                                                    </div>
                                                                    <h4 className="font-black text-2xl">Pensamiento Estratégico</h4>
                                                                </div>
                                                                <p className="text-green-50 font-medium">
                                                                    Análisis profundo del entorno y planificación organizacional orientada a resultados
                                                                </p>
                                                            </div>

                                                            <div className="group p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-white">
                                                                <div className="flex items-center gap-3 mb-4">
                                                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                                                                        <Heart className="h-7 w-7" />
                                                                    </div>
                                                                    <h4 className="font-black text-2xl">Compromiso Ético</h4>
                                                                </div>
                                                                <p className="text-orange-50 font-medium">
                                                                    Responsabilidad social empresarial y prácticas sostenibles en todas las decisiones
                                                                </p>
                                                            </div>

                                                            <div className="group p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-white">
                                                                <div className="flex items-center gap-3 mb-4">
                                                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                                                                        <Globe className="h-7 w-7" />
                                                                    </div>
                                                                    <h4 className="font-black text-2xl">Visión Global</h4>
                                                                </div>
                                                                <p className="text-purple-50 font-medium">
                                                                    Comprensión de contextos internacionales y adaptación a mercados globalizados
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        {/* Occupational Profile Tab */}
                                        <TabsContent value="occupational" className="mt-8 space-y-6 animate-in fade-in duration-500">
                                            <Card className="border-2 border-orange-200 shadow-2xl overflow-hidden">
                                                <CardHeader className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 text-white py-6">
                                                    <CardTitle className="text-3xl flex items-center gap-3">
                                                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                            <Briefcase className="h-9 w-9" />
                                                        </div>
                                                        Perfil Ocupacional
                                                    </CardTitle>
                                                    <p className="text-orange-100 mt-2">
                                                        Oportunidades laborales en sectores empresariales, públicos y sociales
                                                    </p>
                                                </CardHeader>
                                            </Card>

                                            {programDetails[selectedProgram].occupationalProfile.map((area: any, idx: number) => (
                                                <Card
                                                    key={idx}
                                                    className="shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border-2 border-gray-200 overflow-hidden"
                                                >
                                                    <CardHeader className="bg-gradient-to-r from-gray-50 to-orange-50 border-b-2 border-orange-200 py-5">
                                                        <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                                                            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-md">
                                                                <Building2 className="h-6 w-6 text-white" />
                                                            </div>
                                                            {area.area}
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="pt-6 bg-white">
                                                        <p className="text-gray-700 leading-relaxed text-lg">{area.description}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </TabsContent>

                                        {/* Learning Outcomes Tab */}
                                        <TabsContent value="outcomes" className="mt-8 animate-in fade-in duration-500">
                                            <Card className="border-2 border-green-200 shadow-2xl overflow-hidden">
                                                <CardHeader className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white py-6">
                                                    <CardTitle className="text-3xl flex items-center gap-3">
                                                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                                            <Target className="h-9 w-9" />
                                                        </div>
                                                        Resultados de Aprendizaje
                                                    </CardTitle>
                                                    <p className="text-green-100 mt-2">
                                                        Competencias verificables que adquirirás durante tu formación profesional
                                                    </p>
                                                </CardHeader>
                                                <CardContent className="pt-8 space-y-5 bg-gradient-to-br from-green-50 to-emerald-50">
                                                    {programDetails[selectedProgram].learningOutcomes.map((outcome: any, idx: number) => (
                                                        <div
                                                            key={idx}
                                                            className="group p-6 bg-white rounded-2xl border-l-8 border-l-green-600 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
                                                        >
                                                            <div className="flex items-start gap-5">
                                                                <div className="flex-shrink-0">
                                                                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg px-5 py-3 shadow-md">
                                                                        {outcome.code}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-gray-800 leading-relaxed text-lg font-medium">
                                                                        {outcome.description}
                                                                    </p>
                                                                </div>
                                                                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        <TabsContent value="contact" className="mt-8 animate-in fade-in duration-500">
                                            <div className="space-y-8">
                                                {/* Banner superior */}
                                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-1 shadow-2xl">
                                                    <div className="relative bg-white rounded-3xl p-8">
                                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
                                                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/30 to-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-xl">
                                                                <Phone className="h-10 w-10 text-white" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-4xl font-black text-gray-900">¿Listo para Conectar?</h3>
                                                                <p className="text-gray-600 text-lg mt-1">
                                                                    Estamos aquí para responder todas tus preguntas
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card Director */}
                                                <Card className="border-none shadow-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700">
                                                    <CardContent className="p-0">
                                                        <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                                                            <div className="relative">
                                                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/50 shadow-2xl">
                                                                    <User className="h-16 w-16 text-white" />
                                                                </div>
                                                                <div className="absolute -bottom-2 -right-2 p-2 bg-yellow-400 rounded-full shadow-lg">
                                                                    <Award className="h-5 w-5 text-blue-900" />
                                                                </div>
                                                            </div>

                                                            <div className="flex-1 text-center md:text-left">
                                                                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                                                                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                                                                        Director Académico
                                                                    </p>
                                                                </div>
                                                                <h4 className="text-4xl font-black text-white mb-2">
                                                                    {programDetails[selectedProgram].contact.director}
                                                                </h4>
                                                                <p className="text-blue-100 text-lg">
                                                                    Líder del programa de {selectedProgram}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                {/* Email + Teléfono */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                                    {/* Email */}
                                                    <Card className="group border-none shadow-xl hover:shadow-3xl transition-all duration-300 overflow-hidden relative">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                                        <CardContent className="relative p-8">
                                                            <div className="flex items-start gap-5">
                                                                <div className="relative">
                                                                    <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                                                        <Mail className="h-8 w-8 text-white" />
                                                                    </div>
                                                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                                                                </div>

                                                                <div className="flex-1">
                                                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                                                                        Correo Electrónico
                                                                    </h4>
                                                                    <a
                                                                        href={`mailto:${programDetails[selectedProgram].contact.email}`}
                                                                        className="text-xl font-black text-blue-600 hover:text-blue-700 break-all block mb-3 transition-colors"
                                                                    >
                                                                        {programDetails[selectedProgram].contact.email}
                                                                    </a>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all bg-transparent"
                                                                        onClick={() =>
                                                                            (window.location.href = `mailto:${programDetails[selectedProgram].contact.email}`)
                                                                        }
                                                                    >
                                                                        <Send className="h-4 w-4 mr-2" />
                                                                        Enviar Correo
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Teléfono */}
                                                    <Card className="group border-none shadow-xl hover:shadow-3xl transition-all duration-300 overflow-hidden relative">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                                        <CardContent className="relative p-8">
                                                            <div className="flex items-start gap-5">
                                                                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                                                                    <PhoneCall className="h-8 w-8 text-white" />
                                                                </div>

                                                                <div className="flex-1">
                                                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                                                                        Teléfono de Contacto
                                                                    </h4>
                                                                    <a
                                                                        href={`tel:${programDetails[selectedProgram].contact.phone.replace(/\s/g, "")}`}
                                                                        className="text-xl font-black text-green-600 hover:text-green-700 block mb-3 transition-colors"
                                                                    >
                                                                        {programDetails[selectedProgram].contact.phone}
                                                                    </a>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-500 transition-all bg-transparent"
                                                                        onClick={() =>
                                                                            (window.location.href = `tel:${programDetails[selectedProgram].contact.phone.replace(/\s/g, "")}`)
                                                                        }
                                                                    >
                                                                        <PhoneCall className="h-4 w-4 mr-2" />
                                                                        Llamar Ahora
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>

                                                {/* Ubicación */}
                                                <Card className="border-none shadow-2xl overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 pointer-events-none" />
                                                    <CardContent className="relative p-8">
                                                        <div className="flex flex-col md:flex-row items-start gap-6">
                                                            <div className="relative">
                                                                <div className="p-5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl">
                                                                    <MapPin className="h-10 w-10 text-white" />
                                                                </div>
                                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-3 border-white animate-bounce" />
                                                            </div>

                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-4">
                                                                    <h4 className="text-2xl font-black text-purple-900">Encuéntranos Aquí</h4>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="bg-white border-purple-300 text-purple-700 font-bold"
                                                                    >
                                                                        <Building2 className="h-3 w-3 mr-1" />
                                                                        Campus Principal
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                                                    {programDetails[selectedProgram].contact.location}
                                                                </p>
                                                                <div className="flex flex-wrap gap-3">
                                                                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
                                                                        <Clock className="h-3 w-3 mr-1" />
                                                                        Lunes - Viernes: 8:00 AM - 5:00 PM
                                                                    </Badge>
                                                                    <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors">
                                                                        <MapPin className="h-3 w-3 mr-1" />
                                                                        Santa Marta, Magdalena
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                {/* CTA final */}
                                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 shadow-2xl">
                                                    <div className="bg-white rounded-3xl p-8 relative">
                                                        <div className="text-center mb-6">
                                                            <h4 className="text-3xl font-black text-gray-900 mb-2">¿Tienes Preguntas?</h4>
                                                            <p className="text-gray-600 text-lg">
                                                                Nuestro equipo está listo para ayudarte en cada paso del camino
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                            <Button
                                                                size="lg"
                                                                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all px-8 py-6 text-lg font-bold rounded-xl"
                                                                onClick={() =>
                                                                    (window.location.href = `mailto:${programDetails[selectedProgram].contact.email}`)
                                                                }
                                                            >
                                                                <Mail className="h-5 w-5 mr-2" />
                                                                Enviar Correo
                                                            </Button>

                                                            <Button
                                                                size="lg"
                                                                variant="outline"
                                                                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all px-8 py-6 text-lg font-bold rounded-xl bg-transparent"
                                                                onClick={() =>
                                                                    (window.location.href = `tel:${programDetails[selectedProgram].contact.phone.replace(/\s/g, "")}`)
                                                                }
                                                            >
                                                                <PhoneCall className="h-5 w-5 mr-2" />
                                                                Llamar Ahora
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 text-lg">
                                        Lo sentimos, la información detallada para este programa aún no está disponible.
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        Por favor, contacte directamente con la facultad para más información.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default AcademicProgramsComponent;