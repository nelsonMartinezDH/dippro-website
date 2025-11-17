"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertCircle,
    BookOpen,
    Calendar,
    ChevronDown,
    ChevronLeft,
    Download,
    FileText,
    HelpCircle,
    Mail,
    MessageSquare,
    Play,
    Users,
    Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import FaqComponent from "./FaqComponent";
import TechnicalSupportGedoprac from "@/components/for-students/pre-practicas/TechnicalSupportGedoprac";

const apiBaseUrl = "http://localhost:5213";

interface Resource {
    idDto: number;
    titleDto: string;
    descriptionDto: string;
    resourceTypeDto: string;
    fileUrlDto?: string;
    thumbnailUrlDto?: string;
    durationDto?: string;
    categoryDto?: string;
}

const faqsPrePracticas = [
    {
        question: "¿Qué son exactamente las pre-prácticas y por qué son obligatorias?",
        answer:
            "Las pre-prácticas son un programa de formación virtual desarrollado con Coomeva que prepara a los estudiantes para el mundo laboral. Son obligatorias porque proporcionan competencias esenciales como habilidades blandas, ética profesional y preparación para entrevistas.",
        icon: "BookOpen"
    },
    {
        question: "¿Cómo me inscribo en las pre-prácticas y cuándo puedo hacerlo?",
        answer:
            "Debes inscribirte a través del módulo estudiantil durante las fechas del cronograma académico. La inscripción es gratuita y se realiza totalmente online.",
        icon: "UserCheck"
    },
    {
        question: "¿Qué requisitos debo cumplir para poder tomar las pre-prácticas?",
        answer:
            "Debes haber completado al menos el 60% de los créditos, estar matriculado, no tener materias críticas y contar con disponibilidad para asistir a las sesiones virtuales.",
        icon: "CheckCircle"
    },
    {
        question: "¿Las pre-prácticas son completamente virtuales? ¿Qué plataforma utilizan?",
        answer:
            "Sí, son 100% virtuales y se desarrollan en plataformas digitales en alianza con Coomeva. Recibirás instrucciones y enlaces por correo electrónico.",
        icon: "Laptop"
    },
    {
        question: "¿Cuánto tiempo duran y qué horarios manejan?",
        answer:
            "La duración es de 4 semanas. Los horarios son flexibles y generalmente se realizan en las tardes o fines de semana.",
        icon: "Clock"
    },
    {
        question: "¿Qué pasa si no puedo asistir a alguna sesión virtual?",
        answer:
            "Las sesiones quedan grabadas. Se requiere al menos el 80% de asistencia, pero existen opciones de recuperación en casos excepcionales.",
        icon: "Video"
    },
    {
        question: "¿Recibo certificado al completar las pre-prácticas?",
        answer:
            "Sí, un certificado conjunto de la Universidad del Magdalena y Coomeva. Es indispensable para inscribirse a las prácticas profesionales.",
        icon: "Award"
    },
    {
        question: "¿Las pre-prácticas tienen algún costo adicional?",
        answer:
            "No, son totalmente gratuitas gracias al convenio institucional con Coomeva.",
        icon: "DollarSign"
    },
];

const PrePracticasResourcesComponent = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [showVideosDialog, setShowVideosDialog] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<Resource | null>(null);
    const [faqDialogOpen, setFaqDialogOpen] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await fetch(`${apiBaseUrl}/api/PrePracticasSupportResource`);
                const data = await res.json();
                setResources(data);
            } catch (error) {
                console.error("Error al obtener recursos:", error);
            }
        };
        fetchResources();
    }, []);

    const normalizeYouTubeUrl = (url: string): string => {
        if (!url) return "";
        const match =
            url.match(/[?&]v=([^&]+)/) || // watch?v=
            url.match(/youtu\.be\/([^?&]+)/) || // corto
            url.match(/youtube\.com\/shorts\/([^?&]+)/) || // shorts
            url.match(/embed\/([^?&]+)/); // embed
        const id = match ? match[1] : null;
        return id ? `https://www.youtube.com/embed/${id}` : url;
    };

    const getThumbnailUrl = (url: string): string => {
        if (!url) return "/placeholder.svg";
        const match =
            url.match(/[?&]v=([^&]+)/) ||
            url.match(/youtu\.be\/([^?&]+)/) ||
            url.match(/youtube\.com\/shorts\/([^?&]+)/) ||
            url.match(/embed\/([^?&]+)/);
        const id = match ? match[1] : null;
        return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "/placeholder.svg";
    };

    // Filtrar por categoría
    const reglamento = resources.find(
        (r) => r.categoryDto === "Normativa Vigente"
    );
    const formatos = resources.find(
        (r) => r.categoryDto === "Formatos Oficiales"
    );
    const videos = resources.filter(
        (r) => r.categoryDto === "Video Tutorial"
    );

    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    Material de Apoyo y Normativa Vigente
                </CardTitle>
                <p className="text-gray-600">
                    Recursos esenciales para tu proceso de pre-prácticas
                </p>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 🟦 Reglamento de Pre-Prácticas */}
                    <div className="group hover:shadow-lg transition-all duration-300 border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                        <div className="text-center">
                            <div className="p-4 bg-blue-600 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-semibold text-blue-800 mb-2">
                                Reglamento de Pre-Prácticas
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                                Normativa completa y actualizada
                            </p>
                            {reglamento ? (
                                <>
                                    <Badge variant="outline" className="mb-3">
                                        PDF
                                    </Badge>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-white hover:bg-blue-50"
                                        onClick={() =>
                                            reglamento.fileUrlDto &&
                                            window.open(`${apiBaseUrl}${reglamento.fileUrlDto}`, "_blank")
                                        }
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Descargar
                                    </Button>
                                </>
                            ) : (
                                <p className="text-gray-500 text-sm">Sin archivo disponible</p>
                            )}
                        </div>
                    </div>

                    {/* Video Informativo */}
                    <div className="group hover:shadow-lg transition-all duration-300 border rounded-lg p-6 bg-gradient-to-br from-green-50 to-green-100">
                        <div className="text-center">
                            <div className="p-4 bg-green-600 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Video className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-semibold text-green-800 mb-2">
                                Video Informativo
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                                Guía visual del proceso completo
                            </p>
                            <Badge variant="outline" className="mb-3">
                                {videos.length} videos disponibles
                            </Badge>
                            <Button
                                variant="outline"
                                className="w-full bg-white hover:bg-green-50"
                                onClick={() => setShowVideosDialog(true)}
                            >
                                <Play className="h-4 w-4 mr-2" />
                                Reproducir
                            </Button>
                        </div>
                    </div>

                    {/* 🟪 Formatos Requeridos */}
                    <div className="group hover:shadow-lg transition-all duration-300 border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                        <div className="text-center">
                            <div className="p-4 bg-purple-600 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Download className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-semibold text-purple-800 mb-2">
                                Formatos Requeridos
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                                Documentos y plantillas oficiales
                            </p>
                            {formatos ? (
                                <>
                                    <Badge variant="outline" className="mb-3">
                                        PDF
                                    </Badge>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-white hover:bg-purple-50"
                                        onClick={() =>
                                            formatos.fileUrlDto &&
                                            window.open(`${apiBaseUrl}${formatos.fileUrlDto}`, "_blank")
                                        }
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Descargar Pack
                                    </Button>
                                </>
                            ) : (
                                <p className="text-gray-500 text-sm">Sin archivo disponible</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 🎥 Dialog con videos */}
                <Dialog open={showVideosDialog} onOpenChange={setShowVideosDialog}>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-2xl">
                                <Video className="h-6 w-6 text-red-600" />
                                Video Tutoriales – Prácticas Profesionales
                            </DialogTitle>
                            <DialogDescription>
                                Explora nuestra biblioteca de videos educativos para guiarte en
                                tu proceso de prácticas
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                            {selectedVideo ? (
                                <div className="space-y-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedVideo(null)}
                                        className="mb-2"
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-2" />
                                        Volver a la lista
                                    </Button>

                                    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                                        <iframe
                                            src={
                                                selectedVideo.fileUrlDto
                                                    ? normalizeYouTubeUrl(selectedVideo.fileUrlDto)
                                                    : ""
                                            }
                                            title={selectedVideo.titleDto}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold">
                                            {selectedVideo.titleDto}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            {selectedVideo.durationDto && (
                                                <Badge variant="outline">{selectedVideo.durationDto}</Badge>
                                            )}
                                            <Badge variant="outline">{selectedVideo.categoryDto}</Badge>
                                        </div>
                                        <p className="text-gray-700">
                                            {selectedVideo.descriptionDto}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {videos.map((video) => (
                                        <Card
                                            key={video.idDto}
                                            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden group"
                                            onClick={() => setSelectedVideo(video)}
                                        >
                                            <div className="relative aspect-video bg-gray-200">
                                                <img
                                                    src={video.thumbnailUrlDto || getThumbnailUrl(video.fileUrlDto || "")}
                                                    alt={video.titleDto}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                                    <div className="bg-white bg-opacity-80 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <Play className="h-8 w-8 text-red-600" />
                                                    </div>
                                                </div>
                                                {video.durationDto && (
                                                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                                                        {video.durationDto}
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardContent className="p-4">
                                                <h4 className="font-semibold text-lg mb-1 truncate">{video.titleDto}</h4>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                    {video.descriptionDto}
                                                </p>
                                                <Badge variant="outline" className="text-xs">
                                                    {video.categoryDto || "Video Tutorial"}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

                {/* 🚀 Acceso rápido */}
                <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-4 text-center text-lg flex items-center justify-center gap-2">
                        <HelpCircle className="h-5 w-5 text-teal-600" />
                        ¿Tienes dudas?
                    </h4>

                    <p className="text-gray-600 text-sm text-center mb-4">
                        Accede rápidamente a los recursos de soporte y preguntas frecuentes.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">

                        {/* Botón contacto */}
                        <TechnicalSupportGedoprac />

                        {/* Botón de FAQ con Dialog */}
                        <Dialog open={faqDialogOpen} onOpenChange={setFaqDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white border-teal-300 hover:border-teal-500 hover:bg-teal-50"
                                >
                                    <MessageSquare className="h-4 w-4 mr-1 text-teal-700" />
                                    FAQ Pre-Prácticas
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white border-2 border-teal-200 shadow-xl rounded-xl">

                                {/* Header */}
                                <DialogHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-xl p-6 mb-4 -mx-6 -mt-6">
                                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                        <HelpCircle className="h-7 w-7" />
                                        Preguntas Frecuentes
                                    </DialogTitle>
                                    <p className="text-teal-100 text-sm mt-1">
                                        Encuentra respuestas rápidas sobre las pre-prácticas
                                    </p>
                                </DialogHeader>

                                {/* Preguntas */}
                                <div className="space-y-3">
                                    {faqsPrePracticas.map((faq, index) => (
                                        <div
                                            key={index}
                                            className="group rounded-lg border border-teal-200 bg-white hover:border-teal-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                                        >
                                            <button
                                                onClick={() =>
                                                    setExpandedFaq(expandedFaq === index ? null : index)
                                                }
                                                className="w-full p-5 flex items-start gap-4 text-left hover:bg-teal-50 transition"
                                            >
                                                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                                                    {index + 1}
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition">
                                                        {faq.question}
                                                    </h3>
                                                </div>

                                                <ChevronDown
                                                    className={`h-5 w-5 text-teal-600 transition-transform duration-300 ${expandedFaq === index ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            {expandedFaq === index && (
                                                <div className="px-5 pb-5 pt-0 border-t border-teal-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Footer soporte */}
                                <div className="mt-8 p-6 bg-teal-50 rounded-lg border border-teal-200">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-teal-600 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-teal-900 mb-1">
                                                ¿Aún tienes dudas?
                                            </h4>
                                            <p className="text-sm text-teal-700 mb-4">
                                                Nuestro equipo de soporte está disponible para ayudarte.
                                            </p>

                                            <Button
                                                size="sm"
                                                className="bg-teal-600 hover:bg-teal-700 text-white"
                                            >
                                                Contactar Soporte
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PrePracticasResourcesComponent;