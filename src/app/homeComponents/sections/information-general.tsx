"use client"

import { CheckCircle, Users, Building2, FileText, MapPin, Award, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import StudentExperiencesComponent from "../layouts/information-general/StudentExperienciesComponent";

interface SlideDto {
    id: number;
    imageUrl: string;
    title?: string;
}

interface StatisticsDto {
  idDto: number;
  empresasAliadasDto: string;
  tasaExitoDto: string;
  estudiantesAnioDto: string;
  vinculacionLaboralDto: string;
}

interface TeamMemberDto {
  idDto: number;
  nameDto: string;
  roleDto: string;
  descriptionDto: string;
  imageUrlDto: string;
}

export default function InformationGeneral() {
    //ESTADOS
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderData, setSliderData] = useState<SlideDto[]>([])
    const [statistics, setStatistics] = useState<StatisticsDto | null>(null);
    const [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>([]);

    // URLs de la API y del servidor
    const UrlSliderPath = "http://localhost:5213/api/slider";
    const baseServerUrl = "http://localhost:5213";
    const apiUrl = "http://localhost:5213/api"

    const getFullImageUrl = (path: string) => {
        if (path.startsWith('http')) {
            return path;
        }
        return `${baseServerUrl}${path}`;
    }

    // useEffect para cargar estadisticas
    useEffect(() => {
        fetch("http://localhost:5213/api/statistics")
            .then((res) => {
                if (!res.ok) throw new Error("Fallo al cargar estadísticas.");
                return res.json();
            })
            .then((data: StatisticsDto) => {
                setStatistics(data);
            })
            .catch((err) => {
                console.error("Error al obtener estadísticas:", err);
            });
    }, []);

    // useEffect para cargar Slides
    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch(UrlSliderPath);
                if (!res.ok) throw new Error(`Error al cargar slides: ${res.status}`);
                const data: SlideDto[] = await res.json();
                setSliderData(data);
            } catch (err) {
                console.error("Error al obtener sliders de la API:", err);
            }
        };
        fetchSlides();
    }, []);

    // useEffect para cargar equipo DIPPRO
    useEffect(() => {
        fetch(`${apiUrl}/team`)
            .then((res) => {
                if (!res.ok) throw new Error("Fallo al cargar el equipo.");
                return res.json();
            })
            .then((data: TeamMemberDto[]) => {
                setTeamMembers(data);
            })
            .catch((err) => {
                console.error("Error al obtener el equipo:", err);
            });
    }, []);

    useEffect(() => {
        if (sliderData.length > 0) {
            const interval = setInterval(() => {
                nextSlide()
            }, 5000)

            return () => clearInterval(interval)
        }
    }, [sliderData]);

    const nextSlide = () => {
        if (sliderData.length > 0)
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }

    const slidesToDisplay = sliderData;

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 shadow-2xl">
                <div className="absolute inset-0 bg-black/20"></div>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-transparent"></div>

                {/* Slider */}
                <div className="absolute right-0 top-0 h-full w-2/3">
                    <div className="relative h-full overflow-hidden">
                        {slidesToDisplay.map((slide, index) => (
                            <div key={slide.id || index}
                                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSlide ? 'translate-x-0' :
                                        index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                                    }`}
                            >
                                <img
                                    src={getFullImageUrl(slide.imageUrl)}
                                    alt={slide.title}
                                    className="object-cover object-center opacity-40 w-full h-full"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {slidesToDisplay.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 px-8 py-12 lg:px-12 lg:py-16">
                    <div className="max-w-2xl">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                                <Building2 className="h-8 w-8 text-white" />
                            </div>
                            <Badge variant="secondary"
                                className="flex flex-col leading-tight bg-white/20 text-white text-xs backdrop-blur-sm border-white/20 hover:scale-105">
                                <span className="font-bold">Vicerrectoría de Extensión y </span>
                                <span className="font-bold">Proyección Social</span>
                            </Badge>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
                            Dirección de Prácticas
                            <span className="block text-orange-300">Profesionales</span>
                        </h1>

                        <p className="mb-8 text-xl text-blue-100 leading-relaxed">
                            Impulsamos el talento Unimagdalena hacia experiencias significativas en el sector productivo, 
                            fortaleciendo el desarrollo profesional y contribuyendo a la transformación sostenible del territorio.
                        </p>

                        {/* Bagdes */}
                        <div className="flex flex-wrap gap-4">
                            <div
                                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm hover:scale-105 hover:bg-white/20 transition-colors">
                                <MapPin className="h-4 w-4 text-orange-300" />
                                <span className="text-sm text-white">Santa Marta, Colombia</span>
                            </div>
                            <div
                                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm hover:scale-105 hover:bg-white/20 transition-colors">
                                <Award className="h-4 w-4 text-orange-300" />
                                <span className="text-sm text-white">Acreditación Alta Calidad</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Elementos decorativos */}
                <div
                    className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-r from-orange-400 to-orange-500"></div>
            </div>

            {/* Mision */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Misión
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <p>
                                <strong>La Dirección de Prácticas Profesionales</strong> tiene como misión preparar y acompañar a los estudiantes 
                                en su transición al entorno laboral, conectándolos con escenarios de práctica de calidad que les 
                                permitan aplicar sus conocimientos, fortalecer sus competencias y crecer profesionalmente.
                            </p>
                            <p>
                                <strong>Promovemos</strong> alianzas estratégicas con el sector productivo para generar oportunidades de vinculación, 
                                contribuyendo a través del talento de nuestros estudiantes, a la transformación sostenible del territorio.
                            </p>
                            <p>
                                <strong>Garantizamos</strong> procesos bajo el cumplimiento de la normativa institucional y nacional, asegurando la transparencia y
                                la calidad en cada etapa del desarrollo de las prácticas profesionales.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Estadisticas */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Estadísticas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!statistics ? (
                            <div className="text-center text-gray-500 py-4">Cargando datos...</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                <div
                                    className="text-center p-3 bg-blue-50 rounded-lg hover:scale-105 hover:bg-blue-100 transition-colors">
                                    <div className="text-2xl font-bold  text-blue-600">{statistics.empresasAliadasDto}</div>
                                    <div className="text-sm text-gray-600">Empresas Aliadas</div>
                                </div>
                                <div
                                    className="text-center p-3 bg-orange-50 rounded-lg hover:scale-105 hover:bg-orange-100 transition-colors">
                                    <div className="text-2xl font-bold text-orange-600">{statistics.tasaExitoDto}</div>
                                    <div className="text-sm text-gray-600">Tasa de Éxito</div>
                                </div>
                                <div
                                    className="text-center p-3 bg-green-50 rounded-lg hover:scale-105 hover:bg-green-100 transition-colors">
                                    <div className="text-2xl font-bold text-green-600">{statistics.estudiantesAnioDto}</div>
                                    <div className="text-sm text-gray-600">Estudiantes/Año</div>
                                </div>
                                <div
                                    className="text-center p-3 bg-purple-50 rounded-lg hover:scale-105 hover:bg-purple-100 transition-colors">
                                    <div className="text-2xl font-bold text-purple-600">{statistics.vinculacionLaboralDto}</div>
                                    <div className="text-sm text-gray-600">Vinculación laboral Post-Practica</div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Funciones */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        Principales Funciones
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Vinculación Empresarial</h4>
                                    <p className="text-sm text-gray-600">
                                        Establecer relaciones con empresas públicas y privadas para asegurar prácticas
                                        idóneas.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Formación Previa</h4>
                                    <p className="text-sm text-gray-600">Organizar y ejecutar formación antes del
                                        contrato de trabajo.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Diálogo Empresarial</h4>
                                    <p className="text-sm text-gray-600">
                                        Promover el diálogo sobre la importancia de la experiencia profesional.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Verificación</h4>
                                    <p className="text-sm text-gray-600">Verificar la idoneidad de empresas y lugares de
                                        prácticas.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Formación de Asesores</h4>
                                    <p className="text-sm text-gray-600">
                                        Selección y formación de asesores para el período de pasantía.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Seguimiento</h4>
                                    <p className="text-sm text-gray-600">
                                        Acompañamiento, supervisión y evaluación durante las prácticas.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Articulación</h4>
                                    <p className="text-sm text-gray-600">Facilitar la conexión entre el marco teórico y
                                        práctico.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Desarrollo Profesional</h4>
                                    <p className="text-sm text-gray-600">Posibilitar habilidades para grupos
                                        multidisciplinarios.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Equipo DIPPRO */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Users className="h-6 w-6 text-purple-600" />
                        Nuestro Equipo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!teamMembers.length ? (
                        <div className="text-center text-gray-500 py-4">Cargando equipo...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.idDto} className="text-center">
                                    <div
                                        className="w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden border-4 border-gray-300 shadow-md transform hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-gray-100"
                                    >
                                        {member.imageUrlDto ? (
                                            <img
                                                src={getFullImageUrl(member.imageUrlDto)}
                                                alt={`Foto de ${member.nameDto || member.roleDto}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 text-gray-400" />
                                        )}
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-800">{member.roleDto}</h4>
                                    {member.nameDto && (
                                        <p className="text-sm text-gray-700 font-medium">{member.nameDto}</p>
                                    )}
                                    <p className="text-sm text-gray-600">{member.descriptionDto}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <StudentExperiencesComponent />
        </div>
    )
}