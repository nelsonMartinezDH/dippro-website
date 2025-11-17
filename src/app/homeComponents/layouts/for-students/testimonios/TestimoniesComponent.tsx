"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Award,
    Building2,
    Camera,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    ExternalLink,
    Lightbulb,
    Mail,
    MapPin,
    MessageSquare,
    Play, Send,
    Users, Zap,
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";

const API_URL = "http://localhost:5213/api";

const TestimoniesComponent = () => {
    const [testimonies, setTestimonies] = useState<any[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedTestimony, setSelectedTestimony] = useState<any>(null);
    const [showShareTestimonyDialog, setShowShareTestimonyDialog] = useState(false);

    const handleShareTestimony = () => {
        const subject = "Comparte Tu Testimonio - Prácticas Profesionales";
        const body = `Asunto: Comparte Tu Testimonio

        Estimada Dirección de Prácticas Profesionales,

        Me gustaría compartir mi experiencia en las prácticas profesionales. A continuación, adjunto la información solicitada:

        INFORMACIÓN REQUERIDA:

        1. DATOS PERSONALES
        Nombre Completo: ________________________
        Programa Académico: ________________________
        Código de Estudiante: ________________________
        Correo Electrónico: ________________________
        Teléfono: ________________________

        2. INFORMACIÓN DE LA PRÁCTICA
        Empresa/Institución: ________________________
        Fecha Inicio: ________________________
        Fecha Finalización: ________________________
        Cargo/Posición: ________________________
        Supervisor/Tutor Empresarial: ________________________

        3. TESTIMONIAL
        Por favor, comparte tu experiencia en 300-500 palabras:
   
        _________________________________________________________________
   
        _________________________________________________________________
   
        _________________________________________________________________

        4. ASPECTOS DESTACADOS (Selecciona los más relevantes)
        ✅ Desarrollo de habilidades técnicas
        ✅ Trabajo en equipo
        ✅ Solución de problemas
        ✅ Liderazgo
        ✅ Comunicación
        ✅ Adaptabilidad
        ✅ Otro: ________________________

        5. RECOMENDACIONES
        ¿Recomendarías este programa a otros estudiantes? Sí ☐ No ☐
        ¿Recomendarías esta empresa para prácticas? Sí ☐ No ☐

        6. ARCHIVO DE FOTO O VIDEO
        Puedes enviar adjunta una foto tuya durante la práctica o un video testimonial.

        Agradezco la oportunidad de compartir mi experiencia.

        Cordialmente,
        _________________________`;

        const mailtoLink = `mailto:direccionpracticas@unimagdalena.edu.co?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
        setShowShareTestimonyDialog(false);
    };

    // 🔹 Cargar testimonios desde la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/StudentTestimony`);
                if (res.ok) {
                    const data = await res.json();
                    setTestimonies(data);
                }
            } catch (error) {
                console.error("Error al cargar testimonios:", error);
            }
        };
        fetchData();
    }, []);

    const nextSlide = () => {
        if (!selectedTestimony) return;
        const gallery = selectedTestimony.galleryImages?.split(",") || [];
        setCurrentSlide((prev) => (prev + 1) % gallery.length);
    };

    const prevSlide = () => {
        if (!selectedTestimony) return;
        const gallery = selectedTestimony.galleryImages?.split(",") || [];
        setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    const openTestimonyModal = (testimony: any) => {
        setSelectedTestimony(testimony);
        setCurrentSlide(0);
    };

    return (
        <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-yellow-600"/>
                    Testimonios de Estudiantes - Experiencias Reales
                </CardTitle>
                <p className="text-gray-600">
                    Conoce las experiencias exitosas de nuestros estudiantes en prácticas
                    profesionales
                </p>
            </CardHeader>

            <CardContent>
                {/* 🔹 Tarjetas dinámicas de testimonios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonies.map((testimony) => {
                        const gallery = testimony.galleryImages
                            ? testimony.galleryImages.split(",")
                            : [];

                        return (
                            <Card
                                key={testimony.id}
                                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-yellow-200"
                            >
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        {/* 🔹 FOTO DE PERFIL */}
                                        {testimony.profileImageUrl ? (
                                            <img
                                                src={`${API_URL.replace("/api", "")}${
                                                    testimony.profileImageUrl
                                                }`}
                                                alt={testimony.name}
                                                className="w-14 h-14 rounded-full object-cover shadow-md border"
                                            />
                                        ) : (
                                            <div
                                                className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {testimony.name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                        </span>
                                            </div>
                                        )}

                                        <div>
                                            <h4 className="font-semibold text-lg">
                                                {testimony.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {testimony.program}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {testimony.shortText}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Building2 className="h-3 w-3"/>
                                            <span>{testimony.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <MapPin className="h-3 w-3"/>
                                            <span>{testimony.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Clock className="h-3 w-3"/>
                                            <span>{testimony.duration}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {testimony.videoUrl && (
                                            <Badge variant="outline" className="text-xs">
                                                <Play className="h-3 w-3 mr-1"/> 1 Video
                                            </Badge>
                                        )}
                                        {gallery.length > 0 && (
                                            <Badge variant="outline" className="text-xs">
                                                <Camera className="h-3 w-3 mr-1"/> {gallery.length} Fotos
                                            </Badge>
                                        )}
                                    </div>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 border-orange-200 text-yellow-700 font-semibold"
                                                onClick={() => openTestimonyModal(testimony)}
                                            >
                                                <Play className="h-4 w-4 mr-2"/>
                                                Ver Testimonio Completo
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-4 text-2xl">
                                                    {/* 🔹 FOTO DE PERFIL MODAL */}
                                                    {testimony.profileImageUrl ? (
                                                        <img
                                                            src={`${API_URL.replace("/api", "")}${
                                                                testimony.profileImageUrl
                                                            }`}
                                                            alt={testimony.name}
                                                            className="w-20 h-20 rounded-full object-cover shadow-lg border"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-2xl">
                                {testimony.name
                                    ?.split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                              </span>
                                                        </div>
                                                    )}

                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-800">
                                                            {testimony.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-lg">
                                                            {testimony.program}
                                                        </p>
                                                    </div>
                                                </DialogTitle>
                                            </DialogHeader>

                                            <div className="space-y-8">
                                                {/* 🔹 Video principal */}
                                                {testimony.videoUrl && (
                                                    <div
                                                        className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                                                        <iframe
                                                            src={testimony.videoUrl}
                                                            title={testimony.name}
                                                            allowFullScreen
                                                            className="w-full h-full"
                                                        />
                                                    </div>
                                                )}

                                                {/* 🔹 Galería de imágenes */}
                                                {gallery.length > 0 && (
                                                    <div className="relative">
                                                        <div
                                                            className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                                                            <img
                                                                src={`${API_URL.replace(
                                                                    "/api",
                                                                    ""
                                                                )}${gallery[currentSlide]}`}
                                                                alt={`Imagen ${currentSlide + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {gallery.length > 1 && (
                                                                <>
                                                                    <button
                                                                        onClick={prevSlide}
                                                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                                                                    >
                                                                        <ChevronLeft className="h-6 w-6"/>
                                                                    </button>
                                                                    <button
                                                                        onClick={nextSlide}
                                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                                                                    >
                                                                        <ChevronRight className="h-6 w-6"/>
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="flex justify-center gap-3 mt-6">
                                                            {gallery.map((img: string, index: number) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => setCurrentSlide(index)}
                                                                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                                        currentSlide === index
                                                                            ? "border-blue-500 shadow-lg"
                                                                            : "border-gray-300 hover:border-gray-400"
                                                                    }`}
                                                                >
                                                                    <img
                                                                        src={`${API_URL.replace("/api", "")}${img}`}
                                                                        alt={`Miniatura ${index + 1}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 🔹 Información y logros */}
                                                <div className="flex flex-wrap gap-3">
                                                    <Badge variant="outline" className="text-sm py-2 px-3">
                                                        <Building2 className="h-4 w-4 mr-2"/>
                                                        {testimony.company}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-sm py-2 px-3">
                                                        <MapPin className="h-4 w-4 mr-2"/>
                                                        {testimony.location}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-sm py-2 px-3">
                                                        <Clock className="h-4 w-4 mr-2"/>
                                                        {testimony.duration}
                                                    </Badge>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                                                <MessageSquare className="h-5 w-5 text-blue-600"/>
                                                                Mi Experiencia
                                                            </h4>
                                                            <p className="text-gray-700 leading-relaxed text-lg">
                                                                {testimony.fullText}
                                                            </p>
                                                        </div>

                                                        {testimony.achievements && (
                                                            <div>
                                                                <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                                                    <Award className="h-5 w-5 text-green-600"/>
                                                                    Logros Destacados
                                                                </h4>
                                                                <div className="space-y-3">
                                                                    {testimony.achievements
                                                                        ?.split(",")
                                                                        .map((achievement: string, index: number) => (
                                                                            <div
                                                                                key={index}
                                                                                className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                                                                            >
                                                                                <CheckCircle
                                                                                    className="h-5 w-5 text-green-600 flex-shrink-0"/>
                                                                                <span className="text-gray-700">
                                          {achievement.trim()}
                                        </span>
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-6">
                                                        {testimony.recommendations && (
                                                            <div>
                                                                <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                                                    <Lightbulb className="h-5 w-5 text-yellow-600"/>
                                                                    Recomendaciones
                                                                </h4>
                                                                <div
                                                                    className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                                                                    <p className="text-gray-700 leading-relaxed italic">
                                                                        "{testimony.recommendations}"
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div>
                                                            <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                                                <Users className="h-5 w-5 text-purple-600"/>
                                                                Conecta Conmigo
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {testimony.linkedinUrl && (
                                                                    <a
                                                                        href={testimony.linkedinUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            className="w-full justify-start bg-transparent"
                                                                        >
                                                                            <ExternalLink className="h-4 w-4 mr-2"/>
                                                                            LinkedIn - {testimony.name.split(" ")[0]}
                                                                        </Button>
                                                                    </a>
                                                                )}
                                                                {testimony.email && (
                                                                    <a href={`mailto:${testimony.email}`}>
                                                                        <Button
                                                                            variant="outline"
                                                                            className="w-full justify-start bg-transparent"
                                                                        >
                                                                            <Mail className="h-4 w-4 mr-2"/>
                                                                            Enviar Email
                                                                        </Button>
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {testimony.companyWebsite && (
                                                    <div className="flex flex-wrap gap-3 pt-6 border-t">
                                                        <a
                                                            href={testimony.companyWebsite}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                                <Building2 className="h-4 w-4 mr-2"/>
                                                                Ver Más sobre {testimony.company}
                                                            </Button>
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* 🔹 Botón compartir experiencia */}
                <div className="mt-6 text-center">
                    <Button
                        variant="outline"
                        className="mr-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => setShowShareTestimonyDialog(true)}
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ahora es tu turno
                    </Button>
                </div>
            </CardContent>

            <Dialog open={showShareTestimonyDialog} onOpenChange={setShowShareTestimonyDialog}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">

                    <DialogHeader>
                        <DialogTitle
                            className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent flex items-center gap-2"
                        >
                            <Send className="h-6 w-6 text-yellow-600" />
                            Comparte tu testimonio
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">

                        {/* Introduction */}
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-semibold text-lg text-yellow-900 mb-2">
                                ¿Por qué compartir tu experiencia?
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Tu testimonio es invaluable para otros estudiantes. Ayuda a futuras generaciones a conocer
                                las oportunidades, retos y aprendizajes durante tus prácticas profesionales.
                            </p>
                        </div>

                        {/* Required Information */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-yellow-600" />
                                Información que Necesitamos
                            </h3>

                            <div className="grid gap-3">

                                <div className="bg-yellow-50 border-l-4 border-l-yellow-500 p-3 rounded">
                                    <p className="font-semibold text-yellow-900 mb-1">1. Datos Personales</p>
                                    <p className="text-sm text-yellow-800">
                                        Nombre completo, programa, código, correo y teléfono
                                    </p>
                                </div>

                                <div className="bg-amber-50 border-l-4 border-l-amber-500 p-3 rounded">
                                    <p className="font-semibold text-amber-900 mb-1">2. Información de la Práctica</p>
                                    <p className="text-sm text-amber-800">
                                        Empresa, fechas, cargo desempeñado
                                    </p>
                                </div>

                                <div className="bg-orange-50 border-l-4 border-l-orange-500 p-3 rounded">
                                    <p className="font-semibold text-orange-900 mb-1">3. Tu Testimonio</p>
                                    <p className="text-sm text-orange-800">
                                        Cuéntanos tu experiencia (300–500 palabras).
                                    </p>
                                </div>

                                <div className="bg-lime-50 border-l-4 border-l-lime-500 p-3 rounded">
                                    <p className="font-semibold text-lime-900 mb-1">4. Aspectos Destacados</p>
                                    <p className="text-sm text-lime-800">Habilidades y aprendizajes clave</p>
                                </div>

                                <div className="bg-teal-50 border-l-4 border-l-teal-500 p-3 rounded">
                                    <p className="font-semibold text-teal-900 mb-1">5. Recomendaciones</p>
                                    <p className="text-sm text-teal-800">¿Recomendarías la experiencia?</p>
                                </div>

                                <div className="bg-amber-50 border-l-4 border-l-amber-600 p-3 rounded">
                                    <p className="font-semibold text-amber-900 mb-1">
                                        6. Contenido Multimedia
                                    </p>
                                    <p className="text-sm text-amber-800">
                                        Foto(s) o video(s) testimonial(es)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Process */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-600" />
                                Proceso Fácil
                            </h3>

                            <ol className="space-y-2 text-sm text-gray-700">
                                <li className="flex gap-2">
                                    <span className="font-bold text-yellow-600">1.</span> Haz clic en "Enviar Testimonio"
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold text-yellow-600">2.</span> Se abrirá tu cliente de correo
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold text-yellow-600">3.</span> Completa la plantilla
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold text-yellow-600">4.</span> Envía el correo
                                </li>
                            </ol>
                        </div>

                        {/* Important Note */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-900">
                                <span className="font-bold">Nota importante:</span> Todos los testimonios son revisados antes
                                de ser publicados para garantizar calidad y autenticidad.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowShareTestimonyDialog(false)}>
                            Cancelar
                        </Button>

                        <Button
                            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg"
                            onClick={handleShareTestimony}
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Testimonio por Correo
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default TestimoniesComponent;