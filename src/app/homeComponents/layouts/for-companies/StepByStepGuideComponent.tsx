"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    FileText,
    ExternalLink,
    AlertCircle,
    CheckCircle,
    CheckSquare,
    Download,
    Mail,
    Phone,
    Building2,
    Users,
    Search,
    FileCheck
} from "lucide-react";
import * as Icons from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

const apiBaseUrl = "http://localhost:5213";

interface StepResource {
    id: number;
    stepNumber: number;
    title: string;
    buttonLabel: string;
    iconName: string;
    fileUrl: string;
}

const StepByStepGuideComponent: React.FC = () => {
    const [resourcesByStep, setResourcesByStep] = useState<{ [key: number]: StepResource[] }>({});

    useEffect(() => {
        const fetchResources = async () => {
            const results: any = {};
            for (const step of [1, 2, 3, 4]) {
                const res = await fetch(`${apiBaseUrl}/api/StepResource?stepNumber=${step}`);
                results[step] = res.ok ? await res.json() : [];
            }
            setResourcesByStep(results);
        };
        fetchResources();
    }, []);

    const DynamicIcon = ({ name }: { name: string }) => {
        const LucideIcon = (Icons as any)[name] || Icons.FileText;
        return <LucideIcon className="h-5 w-5 text-green-600" />;
    };

    const stepByStepGuide = [
        {
            number: 1,
            title: "Registro de la Empresa en GEDOPRAC",
            shortDescription: "Ingrese y complete el registro en la plataforma",
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "bg-indigo-600",
            icon: <Building2 className="h-5 w-5" />,
            detailedDescription:
                "El primer paso para vincular estudiantes en práctica profesional es registrar su empresa en el sistema GEDOPRAC. Este proceso solo debe realizarse una vez y le permitirá tener acceso a los diferentes perfiles disponibles.",
            tips: [
                "Tener el certificado de Cámara de Comercio de la empresa con fecha de expedición no mayor a 30 dias.",
                "Si es una entidad pública debe cargar el RUT con fecha de expedición no mayor a 30 dias.",
                "Asegúrese de tener un correo electrónico corporativo activo.",
                "Una vez realizado el registro el proceso de aprobación se realiza de 2 a 3 días hábiles.",
            ],
            steps: [
                "Ingrese a la plataforma GEDOPRAC",
                "Seleccione la opción 'Registrar Nueva Empresa'",
                "Complete el formulario con la información requerida",
                "Adjunte los documentos requeridos (RUT ó Certificado de Cámara de Comercio)",
                "Espere la notificación de aprobación por parte de la Dirección de Practica enviada al correo electronico registrado",
            ],
            faqs: [
                {
                    q: "¿Cuánto tiempo toma la aprobación?",
                    a: "El proceso de verificación y aprobación toma de 2 a 3 días hábiles.",
                },
                {
                    q: "¿Qué hago si no tengo Cámara de Comercio actualizada?",
                    a: "Debe renovarla antes de iniciar el registro. El certificado no puede tener más de 30 días de expedición.",
                },
            ],
        },
        {
            number: 2,
            title: "Creación de la vacante para perfil requerido",
            shortDescription: "Inicie sesión en GEDOPRAC y registre una vacante.",
            color: "green",
            bgColor: "bg-green-50",
            iconColor: "bg-green-600",
            icon: <Users className="h-5 w-5" />,
            detailedDescription:
                "Una vez registrada la empresa, puede crear vacantes dirigidas al programa académico del perfil requerido. Esto le permitirá acceder a los perfiles de los estudiantes aptos para realizar prácticas profesionales.",
            tips: [
                "Antes de crear la vacante, registre al tutor empresarial (Jefe directo o supervisor del estudiante)",
                "El tutor empresarial debe ser un profesional con formación y experiencia en el área correspondiente al programa académico del estudiante.",
                "Seleccione la modalidad de vinculación que mejor se ajuste a las necesidades y características de su organización.",
                "Indique las actividades específicas que realizará el estudiante",
                "Seleccione el programa academico de acuerdo al perfil requerido",
            ],
            steps: [
                "Ingrese a GEDOPRAC con sus credenciales de acceso.",
                "Dirigase al modulo de 'Vacantes'.",
                "Dar clic en 'Crear Vacante'.",
                "Complete el formulario con toda la información requerida",
                "Seleccione el tutor empresarial.",
                "Asegúrese de guardar la vacante dando clic al boton 'Guardar Cambios'.",
                "El programa académico revisa y aprueba la vacante",
                "Una vez aprobada la vacante podrá invitar a estudiantes y contar con postulados",
            ],
            faqs: [
                {
                    q: "¿Puedo crear múltiples vacantes?",
                    a: "Sí, puede crear tantas vacantes como necesite para diferentes perfiles o áreas.",
                },
                {
                    q: "¿Puedo seleccionar más de un estudiante por vacante?",
                    a: "Sí, puede seleccionar hasta 5 estudiantes por vacante.",
                },
            ],
        },
        {
            number: 3,
            title: "Proceso de selección del practicante (QUEDAMOS POR AQUI)",
            shortDescription: "Seleccione al estudiante que cumpla con el perfil requerido",
            color: "orange",
            bgColor: "bg-orange-50",
            iconColor: "bg-orange-600",
            icon: <Search className="h-5 w-5" />,
            detailedDescription:
                "Revise los perfiles de los estudiantes postulados, desarrolle su proceso de selección y seleccione al candidato que mejor se ajuste a las necesidades de la organización.",
            tips: [
                "Revise cuidadosamente las hojas de vida y portafolios de los candidatos",
                "Programe entrevistas virtuales o presenciales con los finalistas",
                "Evalúe tanto competencias técnicas como habilidades blandas",
                "Considere la disponibilidad de horario del estudiante",
                "Comunique su decisión de manera oportuna a todos los postulados",
                "Coordine con la Universidad para formalizar la selección",
            ],
            steps: [
                "Acceda a la sección 'Mis Vacantes' en GEDOPRAC",
                "Revise la lista de estudiantes postulados",
                "Descargue las hojas de vida de los candidatos de interés",
                "Contacte a los estudiantes para programar entrevistas",
                "Realice el proceso de selección según sus criterios internos",
                "Notifique al estudiante seleccionado a través de la plataforma",
                "Informe a la Universidad sobre su decisión",
            ],
            faqs: [
                {
                    q: "¿Puedo entrevistar a varios candidatos?",
                    a: "Sí, puede entrevistar a todos los candidatos que considere necesarios antes de tomar su decisión.",
                },
                {
                    q: "¿Qué hago si ningún candidato cumple el perfil?",
                    a: "Puede ajustar los requisitos de la vacante o solicitar apoyo a la Coordinación de Prácticas para encontrar candidatos más adecuados.",
                },
            ],
        },
        {
            number: 4,
            title: "Cargue de documentación requerida",
            shortDescription: "Adjunte los documentos necesarios para formalizar el proceso",
            color: "purple",
            bgColor: "bg-purple-50",
            iconColor: "bg-purple-600",
            icon: <FileCheck className="h-5 w-5" />,
            detailedDescription:
                "El último paso es cargar toda la documentación requerida según la modalidad de vinculación seleccionada. Esto formaliza legalmente la práctica profesional del estudiante.",
            tips: [
                "Verifique que todos los documentos estén firmados y con fecha actualizada",
                "Los archivos deben estar en formato PDF y no superar 5MB cada uno",
                "Asegúrese de que la información en los documentos coincida con los datos registrados",
                "La afiliación a ARL debe estar activa antes de que el estudiante inicie actividades",
                "Guarde copias de todos los documentos cargados para sus registros internos",
            ],
            steps: [
                "Prepare todos los documentos según la modalidad de vinculación",
                "Ingrese a GEDOPRAC y vaya a la sección del estudiante seleccionado",
                "Cargue el documento de vinculación (contrato, acuerdo o acto administrativo)",
                "Adjunte el certificado de afiliación a ARL del estudiante",
                "Cargue el certificado de afiliación a salud (si aplica según modalidad)",
                "Verifique que todos los documentos se hayan cargado correctamente",
                "Espere la validación por parte de la Universidad",
            ],
            faqs: [
                {
                    q: "¿Qué pasa si un documento es rechazado?",
                    a: "Recibirá una notificación con las observaciones. Debe corregir y volver a cargar el documento.",
                },
                {
                    q: "¿Cuánto tiempo toma la validación?",
                    a: "La Universidad valida los documentos en un plazo de 2-3 días hábiles.",
                },
                {
                    q: "¿Puedo modificar un documento ya cargado?",
                    a: "Sí, puede reemplazar documentos antes de que sean validados. Después de la validación, debe solicitar autorización.",
                },
            ],
        },
    ];

    return (
        <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-indigo-600" />
                    Pasos para solicitud de practicantes
                </CardTitle>
                <p className="text-gray-600">Guía completa con acompañamiento gráfico y audiovisual</p>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stepByStepGuide.map((step) => (
                        <div key={step.number} className={`p-4 ${step.bgColor} rounded-lg text-center`}>
                            <div
                                className={`w-12 h-12 ${step.iconColor} text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold`}
                            >
                                {step.number}
                            </div>
                            <h4 className="font-semibold mb-2">{step.title}</h4>
                            <p className="text-sm text-gray-600">{step.shortDescription}</p>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                                        <ExternalLink className="h-4 w-4 mr-0.5" />
                                        Ver Detalles
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-3 text-2xl">
                                            <div
                                                className={`w-12 h-12 ${step.iconColor} text-white rounded-full flex items-center justify-center text-xl font-bold`}
                                            >
                                                {step.number}
                                            </div>
                                            {step.title}
                                        </DialogTitle>
                                    </DialogHeader>

                                    <Tabs defaultValue="overview" className="w-full">
                                        <TabsList className="grid w-full grid-cols-4">
                                            <TabsTrigger value="overview">Resumen</TabsTrigger>
                                            <TabsTrigger value="steps">Pasos</TabsTrigger>
                                            <TabsTrigger value="resources">Recursos</TabsTrigger>
                                            <TabsTrigger value="faq">FAQ</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="overview" className="space-y-4">
                                            <div className={`p-4 ${step.bgColor} rounded-lg border-l-4 border-l-${step.color}-500`}>
                                                <p className="text-gray-700 leading-relaxed">{step.detailedDescription}</p>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-lg flex items-center gap-2">
                                                    <AlertCircle className="h-5 w-5 text-amber-600" />
                                                    Consejos Importantes
                                                </h4>
                                                <ul className="space-y-2">
                                                    {step.tips.map((tip, index) => (
                                                        <li key={index} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                                                            <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="steps" className="space-y-4">
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-lg flex items-center gap-2">
                                                    <CheckSquare className="h-5 w-5 text-blue-600" />
                                                    Proceso Detallado
                                                </h4>
                                                <div className="space-y-3">
                                                    {step.steps.map((stepItem, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500"
                                                        >
                                                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                                                                {index + 1}
                                                            </div>
                                                            <p className="text-gray-700 pt-1">{stepItem}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="resources" className="space-y-4">
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-lg flex items-center gap-2">
                                                    <Download className="h-5 w-5 text-green-600" />
                                                    Recursos Disponibles
                                                </h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {resourcesByStep[step.number]?.length ? (
                                                        resourcesByStep[step.number].map((resource) => (
                                                            <div
                                                                key={resource.id}
                                                                className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-3 mb-3">
                                                                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                                                        <DynamicIcon name={resource.iconName} />
                                                                    </div>
                                                                    <h5 className="font-semibold text-gray-800 flex-1">
                                                                        {resource.title}
                                                                    </h5>
                                                                </div>
                                                                <a
                                                                    href={`${apiBaseUrl}${resource.fileUrl}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <Button className="w-full bg-green-600 hover:bg-green-700">
                                                                        {resource.buttonLabel}
                                                                    </Button>
                                                                </a>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-gray-500 text-sm italic">
                                                            No hay recursos disponibles para este paso.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="faq" className="space-y-4">
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-lg flex items-center gap-2">
                                                    <AlertCircle className="h-5 w-5 text-purple-600" />
                                                    Preguntas Frecuentes
                                                </h4>
                                                <div className="space-y-3">
                                                    {step.faqs.map((faq, index) => (
                                                        <div key={index} className="p-4 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                                                            <h5 className="font-semibold text-purple-800 mb-2">{faq.q}</h5>
                                                            <p className="text-gray-700">{faq.a}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <div className="flex items-start gap-3">
                                                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                                                    <div>
                                                        <h5 className="font-semibold text-blue-800 mb-1">¿Necesita más ayuda?</h5>
                                                        <p className="text-sm text-blue-700 mb-3">
                                                            Nuestro equipo está disponible para resolver cualquier duda adicional
                                                        </p>
                                                        <Button variant="outline" size="sm" className="bg-white">
                                                            <Phone className="h-4 w-4 mr-2" />
                                                            Contactar Soporte
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default StepByStepGuideComponent;