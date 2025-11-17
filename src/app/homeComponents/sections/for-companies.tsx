"use client"

import {
    BookOpen,
    CheckCircle,
    Clock,
    Download,
    ExternalLink,
    FileText,
    MessageCircle,
    MessageSquare,
    Phone,
    Play, Users,
    Video
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import TutorGuideComponent from "@/app/homeComponents/layouts/for-companies/TutorGuideComponent";
import ModalityComponent from "@/app/homeComponents/layouts/for-companies/ModalityComponent";
import AcademicProgramsComponent from "@/app/homeComponents/layouts/for-companies/AcademicProgramsComponent";
import StepByStepGuideComponent from "@/app/homeComponents/layouts/for-companies/StepByStepGuideComponent";
import FeaturedCompaniesComponent from "@/app/homeComponents/layouts/for-companies/FeaturedCompaniesComponent";
import GedopracTutorialComponent from "../layouts/for-companies/GedopracTutorialComponent";
import TechnicalSupportGedoprac from "@/components/for-companies/TechnicalSupportGedoprac";

interface CalendarEvent {
    id: number;
    day: number;
    month: string;
    title: string;
    description: string;
    color: string;
}

interface AcademicDate {
    id: number;
    description: string;
    dateValue: string;
}

const eventsApiUrl = `http://localhost:5213/api/CalendarEvents`;
const datesApiUrl = `http://localhost:5213/api/AcademicDates`;

export default function ForCompanies() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [dates, setDates] = useState<AcademicDate[]>([]);
    const [loadingCalendar, setLoadingCalendar] = useState(true);

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                const eventsRes = await fetch(eventsApiUrl);
                const eventsData: CalendarEvent[] = eventsRes.ok ? await eventsRes.json() : [];
                setEvents(eventsData);

                const datesRes = await fetch(datesApiUrl);
                const datesData: AcademicDate[] = datesRes.ok ? await datesRes.json() : [];
                setDates(datesData);

            } catch (error) {
                console.error("Error al cargar datos del calendario para la vista pública:", error);
            } finally {
                setLoadingCalendar(false);
            }
        };

        fetchCalendarData();
    }, []);

    const faqs = [
        {
            q: "¿Cómo registro mi empresa por primera vez?",
            a: "Complete el formulario de registro empresarial en GEDOPRAC con los documentos legales de su empresa.",
        },
        {
            q: "¿Cuánto tiempo toma el proceso de vinculación?",
            a: "El proceso completo toma entre 2-3 semanas desde la solicitud hasta la asignación del estudiante.",
        },
        {
            q: "¿Qué documentos necesito para solicitar un practicante?",
            a: "RUT, Cámara de Comercio, carta de solicitud y descripción del perfil requerido.",
        },
        {
            q: "¿Hay algún costo por vincular estudiantes?",
            a: "No, el servicio de vinculación es completamente gratuito para las empresas aliadas.",
        },
    ]

    return (
        <div className="space-y-8">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-800">Centro de Recursos para Empresas</CardTitle>
                    <p className="text-blue-700">Todo lo que necesita para vincular talento universitario a su organización</p>
                </CardHeader>
            </Card>

            {/* Manual Paso a paso */}
            <StepByStepGuideComponent />

            {/* Tarjeta GEDOPRAC */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 pb-1">
                        <Video className="h-6 w-6 text-blue-600" />
                        Sistema GEDOPRAC - Guia Interactiva
                    </CardTitle>
                    <p className="text-gray-600">Plataforma para que las empresas registren, gestionen y den seguimiento
                        a estudiantes en práctica, con carga de documentos y comunicación directa con la Universidad del
                        Magdalena.</p>
                </CardHeader>

                {/* Link a GEDOPRAC */}
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <h4 className="font-semibold text-blue-700 mb-2">Acceso a la Pataforma</h4>
                            <p className="text-sm text-gray-600 mb-3">Ingrese con sus credenciales empresariales</p>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Acceder a GEDOPRAC
                            </Button>
                        </div>

                        {/* Tutorial interactivo */}
                        <GedopracTutorialComponent />

                        {/* Soporte */}
                        <TechnicalSupportGedoprac />
                    </div>
                </CardContent>
            </Card>

            {/* Normatividad de practicas */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-green-600" />
                        Normatividad de Prácticas
                    </CardTitle>
                    <p className="text-gray-600">Marco legal y reglamentario que rige las prácticas profesionales</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                            <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
                            <h4 className="font-semibold text-green-800 mb-2">Resoluciones</h4>
                            <p className="text-sm text-gray-600 mb-3">3546/2018 y 623/2020</p>
                            <Button variant="outline" size="sm" className="bg-transparent">
                                <Download className="h-4 w-4 mr-2" />
                                Descargar
                            </Button>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                            <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-3" />
                            <h4 className="font-semibold text-green-800 mb-2">Recurso Disponible</h4>
                            <p className="text-sm text-gray-600 mb-3">Lineamientos Unimagdalena</p>
                            <Button variant="outline" size="sm" className="bg-transparent">
                                <Download className="h-4 w-4 mr-2" />
                                Ver Manual
                            </Button>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                            <h4 className="font-semibold text-green-800 mb-2">Formatos Oficiales</h4>
                            <p className="text-sm text-gray-600 mb-3">Documentos requeridos</p>
                            <Button variant="outline" size="sm" className="bg-transparent">
                                <Download className="h-4 w-4 mr-2" />
                                Descargar Documentos
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <h5 className="font-semibold text-green-800 mb-2 text-sm">📋 Aspectos Clave</h5>
                        <ul className="list-disc list-inside text-xs text-green-700 space-y-1">
                            <li>Duración mínima: 480 horas académicas (16 semanas)</li>
                            <li>Cobertura obligatoria: ARL y afiliación a salud</li>
                            <li>Supervisión conjunta: tutor empresarial y asesor académico</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Programas academicos y perfiles */}
            <AcademicProgramsComponent />

            {/* Modalidades de Vinculación */}
            <ModalityComponent />

            {/* Guia para tutores empresariales */}
            <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-orange-600" />
                        Guía para Tutores Empresariales
                    </CardTitle>
                    <p className="text-gray-600">Fortalezca su rol como formador complementario</p>
                </CardHeader>
                <CardContent>
                    <TutorGuideComponent />
                </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-red-600" />
                        Preguntas Frecuentes - Empresas Nuevas
                    </CardTitle>
                    <p className="text-gray-600">Resolución de problemas y dudas comunes</p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-red-700 mb-2">{faq.q}</h4>
                                <p className="text-sm text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Calendario */}
            <Card className="border-l-4 border-l-teal-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-6 w-6 text-teal-600" />
                        Calendario de Actividades Institucionales
                    </CardTitle>
                    <p className="text-gray-600">Fechas importantes y eventos para empresas aliadas</p>
                </CardHeader>
                <CardContent>
                    {loadingCalendar ? (
                        <div className="text-center p-4 text-gray-500">Cargando calendario...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-teal-700 mb-3">Próximos Eventos</h4>
                                <div className="space-y-3">
                                    {events.length === 0 ? (
                                        <p className="text-gray-500">No hay eventos próximos para mostrar.</p>
                                    ) : (
                                        events.map((event) => (
                                            <div key={event.id} className={`flex items-center gap-3 p-3 bg-${event.color}-50 rounded-lg`}>
                                                <div className="text-center flex-shrink-0">
                                                    <div className={`text-lg font-bold text-${event.color}-600`}>{event.day}</div>
                                                    <div className={`text-xs text-${event.color}-600 uppercase`}>{event.month}</div>
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold">{event.title}</h5>
                                                    <p className="text-sm text-gray-600">{event.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-teal-700 mb-3">Fechas Académicas Importantes</h4>
                                <div className="space-y-2 text-sm">
                                    {dates.length === 0 ? (
                                        <p className="text-gray-500">No hay fechas académicas importantes para mostrar.</p>
                                    ) : (
                                        dates.map((date) => (
                                            <div key={date.id} className="flex justify-between p-2 bg-gray-50 rounded">
                                                <span>{date.description}</span>
                                                <span className="font-semibold">{date.dateValue}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Reconocimiento para compañias */}
            <FeaturedCompaniesComponent />
        </div>
    );
};