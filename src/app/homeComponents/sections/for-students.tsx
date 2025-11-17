"use client"

import React from "react"

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
    BookOpen,
    Users,
    FileText,
    Download,
    CheckCircle,
    GraduationCap,
    Award,
    MessageSquare,
    Briefcase,
    Mail,
    Lightbulb,
    ChevronDown, Shield, User, HelpCircle,
    Link, Check,
} from "lucide-react"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import PrePracticasProcessComponent
    from "@/app/homeComponents/layouts/for-students/pre-practicas/PrePracticasProcessComponent";
import CalendarComponent from "@/app/homeComponents/layouts/for-students/pre-practicas/CalendarComponent";
import PrePracticasResourcesComponent
    from "@/app/homeComponents/layouts/for-students/pre-practicas/PrePracticasResourcesComponent";
import FaqComponent from "@/app/homeComponents/layouts/for-students/pre-practicas/FaqComponent";
import StepByStepComponent from "@/app/homeComponents/layouts/for-students/practicas/StepByStepComponent";
import GedopracCardComponent from "@/app/homeComponents/layouts/for-students/practicas/GedopracCardComponent";
import VinculationModalitiesComponent
    from "@/app/homeComponents/layouts/for-students/practicas/VinculationModalitiesComponent";
import StatsComponent from "@/app/homeComponents/layouts/for-students/practicas/StatsComponent";
import ResourcesComponent from "@/app/homeComponents/layouts/for-students/resources/ResourcesComponent";
import TestimoniesComponent from "@/app/homeComponents/layouts/for-students/testimonios/TestimoniesComponent";

export default function ForStudents() {
    const faqs = [
        {
            question: "¿Cuánto tiempo dura una práctica profesional?",
            answer:
                "La duración varía según la modalidad: mínimo 4 meses y máximo 6 meses para la mayoría de modalidades. Las prácticas en el exterior pueden extenderse hasta 12 meses.",
        },
        {
            question: "¿Puedo hacer mi práctica en la empresa donde trabajo?",
            answer:
                "Sí, puedes validar tu trabajo actual como práctica profesional bajo la modalidad de Vinculación por Contrato Laboral, siempre que las actividades estén alineadas con tu programa de formación.",
        },
        {
            question: "¿Qué pasa si no encuentro empresa para mi práctica?",
            answer:
                "La Universidad cuenta con convenios con más de 150 empresas aliadas. También puedes acceder a convocatorias institucionales y recibir apoyo de la Dirección de Prácticas para tu ubicación.",
        },
        {
            question: "¿Las prácticas son remuneradas?",
            answer:
                "Depende de la modalidad. El Contrato de Aprendizaje SENA incluye apoyo de sostenimiento. Otras modalidades pueden incluir auxilio de transporte o bonificaciones según el acuerdo con la empresa.",
        },
        {
            question: "¿Puedo cambiar de empresa durante mi práctica?",
            answer:
                "Los cambios de empresa requieren justificación válida y aprobación de la Dirección de Prácticas. Se evalúa cada caso particular considerando el avance del proceso.",
        },
    ]

    return (
        <div className="space-y-8">
            {/* Tarjeta de inicio */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-800">Centro de Recursos para Estudiantes</CardTitle>
                    <p className="text-blue-700">Todo lo que necesitas para tu proceso de prácticas profesionales</p>
                </CardHeader>
            </Card>

            <Tabs defaultValue="prepracticas" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="prepracticas" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4"/>
                        <span className="hidden sm:inline">Pre-Prácticas</span>
                    </TabsTrigger>
                    <TabsTrigger value="practicas" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4"/>
                        <span className="hidden sm:inline">Prácticas Profesionales</span>
                    </TabsTrigger>
                    <TabsTrigger value="testimonios" className="flex items-center gap-2" data-value="testimonies">
                        <MessageSquare className="h-4 w-4"/>
                        <span className="hidden sm:inline">Testimonios</span>
                    </TabsTrigger>
                </TabsList>

                {/* TAB 1: PRE-PRACTICAS */}
                <TabsContent value="prepracticas" className="space-y-6">
                    <div
                        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-green-200">
                        <div
                            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full -translate-y-16 translate-x-16"></div>
                            <div
                                className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-200/30 to-green-300/30 rounded-full translate-y-12 -translate-x-12"></div>

                        <Card className="border-0 bg-transparent shadow-none">
                            <CardHeader className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="p-4 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-lg">
                                        <GraduationCap className="h-8 w-8 text-white"/>
                                    </div>
                                    <div>
                                        <CardTitle
                                            className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                                            🎓 Pre-Prácticas Profesionales
                                        </CardTitle>
                                        <p className="text-lg text-gray-600 mt-2">Tu preparación integral para el éxito profesional</p>
                                    </div>
                                </div>

                                <div
                                    className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-green-200/50 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                                            <Users className="h-6 w-6 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Hola, futuro
                                                profesional! 👋</h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                Estás a punto de dar un paso crucial en tu carrera. Las pre-prácticas te
                                                prepararán con las
                                                habilidades y conocimientos necesarios para destacar en el mundo
                                                laboral. ¡Comencemos este
                                                emocionante viaje juntos!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Proceso de pre-practicas */}
                    <PrePracticasProcessComponent />

                    {/* Calendario Pre-Prácticas */}
                    <CalendarComponent />

                    {/* Material de apoyo */}
                    <PrePracticasResourcesComponent />
                    
                </TabsContent>

                {/* TAB 2: PRACTICAS */}
                <TabsContent value="practicas" className="space-y-6">
                    <div
                        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 border border-blue-200">
                        <div
                            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full -translate-y-16 translate-x-16"></div>
                        <div
                            className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-200/30 to-indigo-300/30 rounded-full translate-y-12 -translate-x-12"></div>

                        {/* Tarjeta de Intro */}
                        <Card className="border-0 bg-transparent shadow-none">
                            <CardHeader className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg">
                                        <Briefcase className="h-8 w-8 text-white"/>
                                    </div>
                                    <div>
                                        <CardTitle
                                            className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
                                            💼 Prácticas Profesionales
                                        </CardTitle>
                                        <p className="text-lg text-gray-600 mt-2">Tu puente hacia el mundo laboral
                                            real</p>
                                    </div>
                                </div>

                                <div
                                    className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-200/50 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full">
                                            <CheckCircle className="h-6 w-6 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Bienvenido,
                                                practicante! 🙌</h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                Ha llegado el momento de aplicar todo lo aprendido en la universidad.
                                                Durante tus prácticas tendrás la oportunidad de demostrar tus
                                                conocimientos, adquirir experiencia en un entorno laboral real y
                                                fortalecer tus habilidades profesionales. ¡Este es el inicio de tu
                                                camino como profesional!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Step by step: Proceso de practicas profesionales */}
                    <StepByStepComponent />

                    {/* Tarjeta para plataforma GEDOPRAC */}
                    <GedopracCardComponent />

                    {/* Modalidades de vinculacion (Practicas) */}
                    <VinculationModalitiesComponent />

                    {/* Tarjeta: Marco normativo */}
                    <div
                        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 border border-indigo-200 shadow-lg">
                        {/* Decoración de fondo */}
                        <div
                            className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-200/40 to-purple-300/40 rounded-full -translate-y-16 translate-x-16 blur-xl"></div>
                        <div
                            className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-200/40 to-indigo-300/40 rounded-full translate-y-12 -translate-x-12 blur-lg"></div>

                        <Card className="border-0 bg-transparent shadow-none">
                            <CardHeader className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg">
                                        <FileText className="h-9 w-9 text-white"/>
                                    </div>
                                    <div>
                                        <CardTitle
                                            className="text-3xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                                            Normatividad de Practicas Profesionales
                                        </CardTitle>
                                        <p className="text-gray-600 mt-2 text-lg">
                                            Marco normativo que define el proceso de prácticas
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-700 leading-relaxed mb-8 text-base">
                                    Documento normativo que establece objetivos, requisitos, responsabilidades y fases
                                    del proceso de prácticas profesionales.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-indigo-700 mb-4 text-lg">📘 El reglamento
                                            define:</h4>
                                        <ul className="space-y-3 text-gray-700">
                                            {[
                                                "El objetivo y alcance de las prácticas profesionales",
                                                "Las condiciones y requisitos para realizarlas",
                                                "Las responsabilidades del estudiante, empresa y Universidad",
                                                "Las fases del proceso: inscripción, desarrollo y evaluación",
                                                "Los casos especiales, sanciones y motivos de cancelación"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 p-1.5 bg-indigo-100 rounded-full">
                                                        <Check className="h-5 w-5 text-indigo-700"/>
                                                    </div>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Adaptarlo para recorrerlo con un map */}
                                    <div className="md:border-l md:pl-6 border-indigo-200/40">
                                        <h4 className="font-bold text-purple-700 mb-4 text-lg">⭐ Importancia:</h4>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 p-1.5 bg-purple-100 rounded-full">
                                                    <Shield className="h-5 w-5 text-purple-700"/>
                                                </div>
                                                Cumplir con lineamientos institucionales
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 p-1.5 bg-purple-100 rounded-full">
                                                    <Shield className="h-5 w-5 text-purple-700"/>
                                                </div>
                                                Evitar sanciones por incumplimientos
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 p-1.5 bg-purple-100 rounded-full">
                                                    <Link className="h-5 w-5 text-purple-700"/>
                                                </div>
                                                Fortalecer el vínculo académico–empresarial
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="flex-shrink-0 p-1.5 bg-purple-100 rounded-full">
                                                    <Award className="h-5 w-5 text-purple-700"/>
                                                </div>
                                                Garantizar experiencia de formación de calidad
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardFooter className="flex flex-col sm:flex-row gap-3 pt-8">
                                <Button
                                    onClick={() => {
                                        window.open(
                                            "https://www.unimagdalena.edu.co/Content/Public/Docs/Entrada_Dirección4/adjunto_1032-20190425154914_53.pdf",
                                            "_blank"
                                        );
                                    }}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-5 py-2 rounded-lg shadow-md"
                                >
                                    <Download className="h-5 w-5" />
                                    Descargar Reglamento
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 px-5 py-2 rounded-lg"
                                    onClick={() => {
                                        window.location.href =
                                            "mailto:direccionpracticas@unimagdalena.edu.co" +
                                            "?subject=Consulta%20sobre%20reglamento%20de%20prácticas%20profesionales" +
                                            "&body=Estimado%20equipo%20de%20la%20Dirección%20de%20Prácticas%2C%0D%0A%0D%0A" +
                                            "Mi%20nombre%20es%3A%20[AQUÍ%20TU%20NOMBRE]%0D%0A" +
                                            "Programa%3A%20[AQUI%20TU%20PROGRAMA]%0D%0A" +
                                            "Código%20estudiantil%3A%20[AQUI%20TU%20CÓDIGO]%0D%0A%0D%0A" +
                                            "Quisiera%20realizar%20una%20consulta%20sobre%20cierto%20punto%20del%20reglamento%20de%20prácticas.%20[REDACTAR]%0D%0A%0D%0A" +
                                            "Quedo%20atento%20a%20sus%20comentarios.%0D%0A%0D%0A" +
                                            "Gracias.%0D%0A%0D%0A" +
                                            "Cordialmente%2C%0D%0A[AQUI%20TU%20NOMBRE]";
                                    }}
                                >
                                    <Mail className="h-5 w-5" />
                                    Consultar Dudas
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* FAQ Section */}
                    <Card className="border-l-4 border-l-yellow-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-6 w-6 text-yellow-600"/>
                                Preguntas Frecuentes - Prácticas
                            </CardTitle>
                            <p className="text-gray-600">Respuestas a las dudas más comunes sobre el proceso de
                                prácticas</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <Collapsible key={index}>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="outline"
                                                    className="w-full justify-between text-left p-4 h-auto bg-transparent">
                                                <span className="font-medium">{faq.question}</span>
                                                <ChevronDown className="h-4 w-4 flex-shrink-0"/>
                                            </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="px-4 pb-4">
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Estadísticas de Empleabilidad */}
                    <StatsComponent />
                </TabsContent>

                {/* TAB 4: TESTIMONIOS */}
                <TabsContent value="testimonios" className="space-y-6">
                    <div
                        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-200"
                    >
                        {/* Círculo decorativo superior derecho */}
                        <div
                            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-300/30 rounded-full -translate-y-16 translate-x-16"
                        ></div>

                        {/* Círculo decorativo inferior izquierdo */}
                        <div
                            className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200/30 to-orange-300/30 rounded-full translate-y-12 -translate-x-12"
                        ></div>

                        <Card className="border-0 bg-transparent shadow-none">
                            <CardHeader className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    {/* Ícono principal */}
                                    <div className="p-4 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl shadow-lg">
                                        <MessageSquare className="h-8 w-8 text-white" />
                                    </div>

                                    {/* Título y subtítulo */}
                                    <div>
                                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                                            💬 Testimonios
                                        </CardTitle>
                                        <p className="text-lg text-gray-600 mt-2">
                                            Experiencias de estudiantes en sus prácticas
                                        </p>
                                    </div>
                                </div>

                                {/* Caja de contenido */}
                                <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-orange-200/50 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        {/* Icono secundario */}
                                        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full">
                                            <User className="h-6 w-6 text-white" />
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                Voces que inspiran 🌟
                                            </h3>

                                            <p className="text-gray-700 leading-relaxed">
                                                Conoce de primera mano las experiencias de otros estudiantes que ya
                                                realizaron sus prácticas. Sus testimonios te permitirán descubrir los
                                                retos, aprendizajes y oportunidades que marcaron su paso por el programa,
                                                y te motivarán a sacar el máximo provecho a tu propia experiencia.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>

                    <TestimoniesComponent />
                </TabsContent>
            </Tabs>
        </div>
    )
}
