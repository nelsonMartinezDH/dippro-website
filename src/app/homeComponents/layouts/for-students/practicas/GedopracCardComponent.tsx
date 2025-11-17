"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Award,
    BookOpen,
    CheckCircle,
    ChevronLeft,
    Download,
    ExternalLink,
    FileCheck,
    FileText,
    Globe,
    GraduationCap,
    Lightbulb,
    Mail,
    Phone,
    Play,
    Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import TechnicalSupportGedoprac from "@/components/for-students/practicas-profesionales/TechnicalSupportGedoprac";

const apiBaseUrl = "http://localhost:5213";

type VideoItem = {
    id: number;
    title: string;
    description?: string;
    fileUrl: string;
    thumbnailUrl?: string;
    duration?: string;
    category?: string;
    order?: number;
};

type DocumentItem = {
    id: number;
    title: string;
    description?: string;
    resourceType?: string;
    fileUrl?: string;
    category?: string;
};

const GedopracCardComponent: React.FC = () => {
    const [showVideosDialog, setShowVideosDialog] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

    const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false);
    const [manualsDialogOpen, setManualsDialogOpen] = useState(false);

    const [videoTutorials, setVideoTutorials] = useState<VideoItem[]>([]);
    const [documents, setDocuments] = useState<DocumentItem[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const extractYouTubeId = (url: string | undefined) => {
        if (!url) return null;
        try {
            const u = url.trim();
            const watchMatch = u.match(/[?&]v=([^&]+)/);
            if (watchMatch && watchMatch[1]) return watchMatch[1];
            const embedMatch = u.match(/\/embed\/([^?&/]+)/);
            if (embedMatch && embedMatch[1]) return embedMatch[1];
            const shortMatch = u.match(/youtu\.be\/([^?&/]+)/);
            if (shortMatch && shortMatch[1]) return shortMatch[1];
            const parts = u.split("/");
            return parts[parts.length - 1] || null;
        } catch {
            return null;
        }
    };

    const deriveThumbnailFromUrl = (videoUrl?: string) => {
        const id = extractYouTubeId(videoUrl);
        if (!id) return null;
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    };

    const ensureEmbedUrl = (videoUrl?: string) => {
        if (!videoUrl) return "";
        if (videoUrl.includes("/embed/")) return videoUrl;
        const id = extractYouTubeId(videoUrl);
        if (id) return `https://www.youtube.com/embed/${id}`;
        return videoUrl;
    };

    const getFileExt = (url?: string) => {
        if (!url) return "";
        try {
            const p = new URL(url).pathname;
            const seg = p.split(".").pop();
            return seg ? seg.toUpperCase() : "";
        } catch {
            const parts = url.split(".");
            return parts.length > 1 ? parts.pop()!.split(/\#|\?/)[0].toUpperCase() : "";
        }
    };

    useEffect(() => {
        let mounted = true;
        const loadAll = async () => {
            setLoading(true);
            setError(null);
            try {
                const [videosRes, docsRes] = await Promise.all([
                    fetch(`${apiBaseUrl}/api/PracticasVideoResource`),
                    fetch(`${apiBaseUrl}/api/PracticasDocumentResource`)
                ]);

                if (!videosRes.ok) throw new Error("Error al cargar videos");
                if (!docsRes.ok) throw new Error("Error al cargar documentos");

                const videosData: VideoItem[] = await videosRes.json();
                const docsData: DocumentItem[] = await docsRes.json();

                if (!mounted) return;

                const normalizedVideos = videosData.map((v) => ({
                    ...v,
                    thumbnailUrl: v.thumbnailUrl || deriveThumbnailFromUrl(v.fileUrl) || undefined,
                    fileUrl: ensureEmbedUrl(v.fileUrl)
                }));

                const normalizedDocs = docsData.map((d) => ({
                    ...d,
                    fileUrl: d.fileUrl?.startsWith("http")
                        ? d.fileUrl
                        : `${apiBaseUrl}${d.fileUrl}`
                }));

                setVideoTutorials(normalizedVideos);
                setDocuments(normalizedDocs);
            } catch (err: any) {
                console.error(err);
                if (mounted) setError(err?.message || "Error inesperado");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadAll();
        return () => {
            mounted = false;
        };
    }, []);

    const manuals = documents.filter((d) => d.category === "Manuales de usuario");
    const docs = documents.filter((d) => d.category === "Documentos");

    return (
        <Card
            className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-2xl border-2 border-blue-200"
        >
            <CardHeader>
                <div className="flex items-center gap-6 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl">
                        <Globe className="h-14 w-14 text-white" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                            🌐 Plataforma GEDOPRAC
                        </CardTitle>
                        <p className="text-xl text-gray-700 font-medium">
                            Tu herramienta principal para gestionar prácticas profesionales
                        </p>
                    </div>
                </div>

                <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                ¿Qué puedes hacer en GEDOPRAC?
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { icon: "🔐", text: "Solicita tu registro e ingresa con tu correo institucional" },
                                    { icon: "👤", text: "Completa tu perfil y carga tu hoja de vida" },
                                    { icon: "🎯", text: "Explora convocatorias y postúlate a vacantes" },
                                    { icon: "📄", text: "Carga los documentos requeridos para formalizar tu práctica" },
                                    { icon: "📊", text: "Consulta tu práctica, tutor asignado y avances del proceso" }
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2.5 p-2 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="text-2xl">{feature.icon}</div>
                                        <span className="text-gray-700 text-sm font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-2xl font-bold text-lg px-8 py-4 flex-1 transform hover:scale-105 transition-all duration-200"
                                    onClick={() =>
                                        window.open("https://gedoprac.unimagdalena.edu.co/auth/login?return=%2Fpages%2Fdashboard", "_blank")
                                    }
                                >
                                    <ExternalLink className="h-6 w-6 mr-3" />🚀 Acceder a GEDOPRAC
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                                <BookOpen className="h-6 w-6 text-purple-600" />
                                Recursos y Soporte
                            </h3>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <Button
                                    variant="outline"
                                    className="h-24 p-4 flex flex-col items-center gap-3 bg-gradient-to-br from-white to-red-50 hover:from-red-50 hover:to-red-100 border-2 border-red-200 hover:border-red-300 transition-all duration-200"
                                    onClick={() => setShowVideosDialog(true)}
                                >
                                    <Video className="h-8 w-8 text-red-600" />
                                    <span className="font-semibold text-red-700">Videos Tutoriales</span>
                                    <Badge variant="secondary" className="text-xs">
                                        {loading ? "..." : `${videoTutorials.length} videos disponibles`}
                                    </Badge>
                                </Button>

                                <Dialog open={documentsDialogOpen} onOpenChange={setDocumentsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="h-24 p-4 flex flex-col items-center gap-3 bg-gradient-to-br from-white to-green-50 hover:from-green-50 hover:to-green-100 border-2 border-green-200 hover:border-green-300 transition-all duration-200"
                                        >
                                            <FileText className="h-8 w-8 text-green-600" />
                                            <span className="font-semibold text-green-700">Documentos</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {loading ? "..." : `${docs.length} archivos`}
                                            </Badge>
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-3 text-2xl">
                                                <FileText className="h-7 w-7 text-green-600" />
                                                Documentos y Formatos
                                            </DialogTitle>
                                        </DialogHeader>

                                        <div className="space-y-4 mt-4">
                                            <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border-2 border-green-200">
                                                <h3 className="font-semibold text-lg text-green-800 mb-3 flex items-center gap-2">
                                                    <FileCheck className="h-5 w-5" />
                                                    Documentos Para Estudiantes
                                                </h3>

                                                <div className="space-y-3">
                                                    {loading ? (
                                                        <p className="text-sm text-gray-500">Cargando documentos...</p>
                                                    ) : docs.length === 0 ? (
                                                        <p className="text-sm text-gray-500">No hay documentos disponibles.</p>
                                                    ) : (
                                                        docs.map((d) => (
                                                            <div
                                                                key={d.id}
                                                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200 hover:border-green-400 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <FileText className="h-5 w-5 text-green-600" />
                                                                    <div>
                                                                        <p className="font-medium text-gray-900">{d.title}</p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {getFileExt(d.fileUrl) || "ARCHIVO"} {d.description ? `• ${d.description}` : ""}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <a href={d.fileUrl || "#"} target="_blank" rel="noreferrer">
                                                                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                                                        <Download className="h-4 w-4" />
                                                                        Descargar
                                                                    </Button>
                                                                </a>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                                <div className="flex items-start gap-3">
                                                    <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <h4 className="font-semibold text-amber-900 mb-1">Recomendaciones de Uso</h4>
                                                        <ul className="text-sm text-amber-800 space-y-1">
                                                            <li>• Descarga todos los documentos antes de comenzar el proceso</li>
                                                            <li>• Lee cuidadosamente cada formato antes de llenarlo</li>
                                                            <li>• Guarda copias digitales de todos tus documentos</li>
                                                            <li>• Verifica que toda la información esté completa y correcta</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <Dialog open={manualsDialogOpen} onOpenChange={setManualsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="h-24 p-4 flex flex-col items-center gap-3 bg-gradient-to-br from-white to-purple-50 hover:from-purple-50 hover:to-purple-100 border-2 border-purple-200 hover:border-purple-300 transition-all duration-200"
                                        >
                                            <BookOpen className="h-8 w-8 text-purple-600" />
                                            <span className="font-semibold text-purple-700">Manuales de usuario</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {loading ? "..." : manuals.length ? `${manuals.length} archivos` : "Guía completa"}
                                            </Badge>
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-3 text-2xl">
                                                <BookOpen className="h-7 w-7 text-purple-600" />
                                                Manuales de Usuario
                                            </DialogTitle>
                                        </DialogHeader>

                                        <div className="space-y-4 mt-4">
                                            <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg border-2 border-purple-200">
                                                <h3 className="font-semibold text-lg text-purple-800 mb-3 flex items-center gap-2">
                                                    <GraduationCap className="h-5 w-5" />
                                                    Manuales para Estudiantes
                                                </h3>

                                                <div className="space-y-3">
                                                    {loading ? (
                                                        <p className="text-sm text-gray-500">Cargando manuales...</p>
                                                    ) : manuals.length === 0 ? (
                                                        <p className="text-sm text-gray-500">No hay manuales disponibles.</p>
                                                    ) : (
                                                        manuals.map((m) => (
                                                            <div
                                                                key={m.id}
                                                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-400 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <BookOpen className="h-5 w-5 text-purple-600" />
                                                                    <div>
                                                                        <p className="font-medium text-gray-900">{m.title}</p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {getFileExt(m.fileUrl) || "ARCHIVO"} {m.description ? `• ${m.description}` : ""}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <a href={m.fileUrl || "#"} target="_blank" rel="noreferrer">
                                                                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                                                        <Download className="h-4 w-4" />
                                                                        Descargar
                                                                    </Button>
                                                                </a>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <h4 className="font-semibold text-green-900 mb-1">Recomendaciones de Uso</h4>
                                                        <ul className="text-sm text-green-800 space-y-1">
                                                            <li>• Comienza con la Guía Rápida de Inicio si eres nuevo</li>
                                                            <li>• Consulta el Manual Completo para información detallada</li>
                                                            <li>• Las guías específicas te ayudarán con tareas concretas</li>
                                                            <li>• Mantén los manuales a mano durante todo el proceso</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <TechnicalSupportGedoprac />
                            </div>

                            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
                                <h4 className="font-semibold text-blue-800 text-balance mb-3">
                                    💡 Consejo Importante
                                </h4>
                                <p className="text-balance leading-relaxed text-blue-800 font-medium">
                                    Mantén tu perfil actualizado y revisa regularmente las nuevas convocatorias.
                                    Las mejores oportunidades se llenan rápidamente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Videos dialog */}
                <Dialog open={showVideosDialog} onOpenChange={setShowVideosDialog}>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-2xl">
                                <Video className="h-6 w-6 text-red-600" />
                                Video Tutoriales - Prácticas Profesionales
                            </DialogTitle>
                            <DialogDescription>Explora nuestra biblioteca de videos educativos para guiarte en tu proceso de prácticas</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                            {error && <p className="text-red-600">Error: {error}</p>}

                            {selectedVideo ? (
                                <div className="space-y-4">
                                    <Button variant="outline" size="sm" onClick={() => setSelectedVideo(null)} className="mb-2">
                                        <ChevronLeft className="h-4 w-4 mr-2" />
                                        Volver a la lista
                                    </Button>

                                    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                                        <iframe
                                            src={selectedVideo.fileUrl}
                                            title={selectedVideo.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <Badge variant="outline">{selectedVideo.duration || "—"}</Badge>
                                            <Badge variant="outline">{selectedVideo.category || "Tutorial"}</Badge>
                                        </div>
                                        <p className="text-gray-700">{selectedVideo.description}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {loading ? (
                                        <p className="text-sm text-gray-500">Cargando videos...</p>
                                    ) : videoTutorials.length === 0 ? (
                                        <p className="text-sm text-gray-500">No hay videos disponibles.</p>
                                    ) : (
                                        videoTutorials.map((video) => (
                                            <Card
                                                key={video.id}
                                                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                                onClick={() => setSelectedVideo(video)}
                                            >
                                                <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                                                    <img src={video.thumbnailUrl || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                                        <div className="bg-red-600 rounded-full p-4">
                                                            <Play className="h-8 w-8 text-white" />
                                                        </div>
                                                    </div>
                                                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">{video.duration || "—"}</Badge>
                                                </div>
                                                <CardContent className="p-4">
                                                    <h4 className="font-semibold text-lg mb-2">{video.title}</h4>
                                                    <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                                                    <Badge variant="outline" className="mt-2">
                                                        {video.category || "Tutorial"}
                                                    </Badge>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </CardHeader>
        </Card>
    );
};

export default GedopracCardComponent;