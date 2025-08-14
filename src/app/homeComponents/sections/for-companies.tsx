"use client"

import {
    BookOpen,
    Briefcase, Building2, CheckCircle,
    Clock,
    Download,
    ExternalLink,
    FileCheck,
    FileText,
    Globe,
    GraduationCap,
    Phone,
    Play, Search, Users,
    Video
} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useState} from "react";
import {Input} from "@/components/ui/input";

export default function ForCompanies() {
    const [searchTerm, setSearchTerm] = useState("")

    const allPrograms = [
        // Facultad de Ciencias Empresariales y Económicas
        {
            program: "Administración de Empresas",
            faculty: "Ciencias Empresariales y Económicas",
            skills: ["Gestión Organizacional", "Marketing", "Finanzas", "Recursos Humanos"],
            color: "blue",
            description: "Profesionales capacitados para liderar organizaciones y optimizar procesos empresariales."
        },
        {
            program: "Contaduría Pública",
            faculty: "Ciencias Empresariales y Económicas",
            skills: ["Contabilidad", "Auditoría", "Tributaria", "Costos"],
            color: "green",
            description: "Expertos en información financiera, control fiscal y asesoría contable."
        },
        {
            program: "Economía",
            faculty: "Ciencias Empresariales y Económicas",
            skills: ["Análisis Económico", "Investigación", "Proyectos", "Política Económica"],
            color: "purple",
            description: "Analistas especializados en comportamiento económico y formulación de políticas."
        },
        {
            program: "Negocios Internacionales",
            faculty: "Ciencias Empresariales y Económicas",
            skills: ["Comercio Exterior", "Logística", "Negociación", "Mercados Globales"],
            color: "indigo",
            description: "Especialistas en comercio internacional y expansión empresarial global."
        },
        // Facultad de Ingeniería
        {
            program: "Ingeniería de Sistemas",
            faculty: "Ingeniería",
            skills: ["Desarrollo de Software", "Base de Datos", "Redes", "Ciberseguridad"],
            color: "blue",
            description: "Desarrolladores y arquitectos de soluciones tecnológicas innovadoras."
        },
        {
            program: "Ingeniería Civil",
            faculty: "Ingeniería",
            skills: ["Estructuras", "Construcción", "Geotecnia", "Hidráulica"],
            color: "orange",
            description: "Profesionales en diseño, construcción y mantenimiento de infraestructura."
        },
        {
            program: "Ingeniería Industrial",
            faculty: "Ingeniería",
            skills: ["Procesos", "Calidad", "Logística", "Optimización"],
            color: "red",
            description: "Optimizadores de procesos productivos y sistemas organizacionales."
        },
        {
            program: "Ingeniería Electrónica",
            faculty: "Ingeniería",
            skills: ["Automatización", "Telecomunicaciones", "Control", "Instrumentación"],
            color: "cyan",
            description: "Especialistas en sistemas electrónicos y automatización industrial."
        },
        {
            program: "Ingeniería Pesquera",
            faculty: "Ingeniería",
            skills: ["Acuicultura", "Procesamiento", "Calidad Pesquera", "Sostenibilidad"],
            color: "teal",
            description: "Expertos en recursos pesqueros y acuicultura sostenible."
        },
        {
            program: "Ingeniería Agronómica",
            faculty: "Ciencias Agropecuarias",
            skills: ["Producción Agrícola", "Suelos", "Fitosanidad", "Sostenibilidad"],
            color: "green",
            description: "Especialistas en producción agrícola sostenible y manejo de cultivos."
        },
        // Facultad de Ciencias de la Salud
        {
            program: "Medicina",
            faculty: "Ciencias de la Salud",
            skills: ["Diagnóstico", "Tratamiento", "Prevención", "Investigación Clínica"],
            color: "red",
            description: "Profesionales de la salud especializados en atención médica integral."
        },
        {
            program: "Enfermería",
            faculty: "Ciencias de la Salud",
            skills: ["Cuidado Integral", "Promoción", "Prevención", "Rehabilitación"],
            color: "pink",
            description: "Especialistas en cuidado de la salud y atención humanizada."
        },
        {
            program: "Psicología",
            faculty: "Ciencias de la Salud",
            skills: ["RRHH", "Organizacional", "Clínica", "Educativa"],
            color: "purple",
            description: "Profesionales del comportamiento humano en diversos contextos."
        },
        // Facultad de Humanidades
        {
            program: "Derecho",
            faculty: "Humanidades",
            skills: ["Jurídica", "Contratos", "Litigios", "Asesoría Legal"],
            color: "gray",
            description: "Asesores legales especializados en diversas ramas del derecho."
        },
        {
            program: "Licenciatura en Lenguas Extranjeras",
            faculty: "Humanidades",
            skills: ["Inglés", "Francés", "Traducción", "Pedagogía de Idiomas"],
            color: "green",
            description: "Profesionales en enseñanza y traducción de idiomas extranjeros."
        },
        // Facultad de Ciencias Básicas
        {
            program: "Biología",
            faculty: "Ciencias Básicas",
            skills: ["Investigación", "Biotecnología", "Ecología", "Laboratorio"],
            color: "green",
            description: "Investigadores especializados en ciencias biológicas y biotecnología."
        },
        {
            program: "Licenciatura en Química",
            faculty: "Ciencias de la Educación",
            skills: ["Didáctica de la Química", "Enseñanza de Ciencias", "Laboratorio Escolar", "Investigación Educativa"],
            color: "blue",
            description: "Profesionales expertos en la enseñanza de la química y la divulgación científica."
        },
        {
            program: "Licenciatura en Matemáticas",
            faculty: "Ciencias De la Educación",
            skills: ["Didáctica de las Matemáticas", "Razonamiento Lógico", "Modelación Matemática", "Investigación Educativa"],
            color: "indigo",
            description: "Profesionales dedicados a la enseñanza innovadora y la formación matemática de alta calidad."
        },
    ]

    const featuredPrograms = [
        "Ingeniería de Sistemas",
        "Administración de Empresas",
        "Contaduría Pública",
        "Derecho",
        "Psicología",
        "Medicina"
    ]

    const filteredPrograms = allPrograms.filter(program =>
        program.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )

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

    const modalities = [
        {
            id: "contrato-aprendizaje",
            title: "Contrato de Aprendizaje SENA",
            duration: "6-12 meses",
            description: "Vinculación bajo la Ley 789 de 2002 como aprendices SENA",
            requirements: "Empresa como agente formador",
            icon: <GraduationCap className="h-6 w-6"/>,
            color: "blue",
            fullDescription: `Esta modalidad, amparada bajo la Ley 789 de 2002, permite a las empresas vincular estudiantes en calidad de aprendices SENA durante el desarrollo de su práctica profesional. Bajo este esquema, la empresa se convierte en un agente formador que acompaña el aprendizaje del estudiante en un entorno real de trabajo, garantizando una experiencia significativa y alineada a su perfil académico.

La empresa asume la responsabilidad de gestionar y cargar los documentos requeridos, que incluyen el documento de vinculación, el certificado de afiliación a la ARL y el certificado de afiliación a salud, asegurando así la protección del estudiante durante el desarrollo de sus actividades. Esta modalidad es ideal para empresas que desean fortalecer su compromiso con la formación de talento joven, al mismo tiempo que potencian sus procesos internos mediante el aporte de nuevos conocimientos y perspectivas por parte de los estudiantes.`,
        },
        {
            id: "acuerdo-voluntades",
            title: "Vinculación por Acuerdo de Voluntades",
            duration: "3-6 meses",
            description: "Basada en la Resolución 3546 de 2018, sin relación laboral",
            requirements: "Acuerdo formal entre partes",
            icon: <FileCheck className="h-6 w-6"/>,
            color: "green",
            fullDescription: `Esta modalidad se basa en la Resolución 3546 de 2018, modificada parcialmente por la Resolución 623 de 2020, y está diseñada para las empresas que deseen vincular estudiantes mediante un acuerdo de voluntades que formalice su práctica profesional sin constituir una relación laboral.

                              En este esquema, la empresa se encarga de cargar el documento de vinculación y el certificado de afiliación a la ARL, mientras que el estudiante gestiona su afiliación a salud. Esta modalidad ofrece una gran flexibilidad, permitiendo que las partes acuerden los términos de la práctica de forma clara y transparente, garantizando la protección del estudiante durante sus actividades en la empresa.

                              Es una excelente alternativa para organizaciones que desean aportar a la formación de profesionales, al mismo tiempo que integran talento joven con nuevas ideas, motivación y disposición para aprender y aportar a los procesos organizacionales.`,
        },
        {
            id: "acto-administrativo",
            title: "Vinculación por Acto Administrativo",
            duration: "4-6 meses",
            description: "Regulada por Resolución 3546 de 2018 y modificación 623 de 2020",
            requirements: "Acto administrativo institucional",
            icon: <FileText className="h-6 w-6"/>,
            color: "purple",
            fullDescription: `La vinculación por acto administrativo, regulada por la Resolución 3546 de 2018 y su modificación parcial por la Resolución 623 de 2020, permite a las empresas formalizar la práctica profesional de los estudiantes mediante un acto administrativo emitido por la institución educativa.

                              En esta modalidad, la empresa se encarga de cargar el documento de vinculación y el certificado de afiliación a la ARL, mientras que el estudiante gestiona y carga su certificado de afiliación a salud. Este mecanismo garantiza un proceso de vinculación ágil y seguro, facilitando la integración del estudiante al ambiente laboral mientras se mantienen las condiciones de seguridad y bienestar requeridas durante su práctica.

                              Las empresas que eligen esta modalidad pueden aportar al desarrollo de competencias de los futuros profesionales y fortalecer su compromiso con la educación superior, recibiendo estudiantes con una sólida formación académica y dispuestos a aplicar sus conocimientos para el fortalecimiento de los procesos institucionales.`,
        },
        {
            id: "contrato-laboral",
            title: "Vinculación por Contrato Laboral",
            duration: "Variable",
            description: "Para estudiantes que ya laboran en la empresa",
            requirements: "Contrato laboral vigente",
            icon: <Briefcase className="h-6 w-6"/>,
            color: "orange",
            fullDescription: `Esta modalidad está dirigida a estudiantes que ya cuentan con un vínculo laboral con una empresa y desean realizar su práctica profesional en el lugar donde actualmente laboran. Aquí, el estudiante asume la responsabilidad de cargar los documentos requeridos, que incluyen el contrato laboral, el certificado laboral, los certificados de afiliación a salud, ARL y pensión, así como la planilla de pago de seguridad social.

                              La vinculación por contrato laboral permite validar como práctica profesional las funciones y actividades que el estudiante desarrolla en su puesto de trabajo, siempre que estas estén alineadas con su programa de formación y contribuyan al fortalecimiento de sus competencias profesionales.

                              Es una opción adecuada para empresas que ya cuentan con estudiantes en sus equipos de trabajo y desean apoyarlos en su proceso de graduación, facilitando la articulación entre la formación académica y la experiencia laboral.`,
        },
        {
            id: "practicas-exterior",
            title: "Vinculación para Prácticas en el Exterior",
            duration: "3-12 meses",
            description: "Experiencias internacionales con empresas en el exterior",
            requirements: "Documentación internacional",
            icon: <Globe className="h-6 w-6"/>,
            color: "indigo",
            fullDescription: `La Universidad del Magdalena ofrece la posibilidad de realizar prácticas profesionales en empresas e instituciones en el exterior, permitiendo a los estudiantes fortalecer sus competencias interculturales y globales, y adquirir experiencias internacionales que enriquezcan su formación profesional y personal.

                              En esta modalidad, las empresas en el exterior deben proporcionar documentos como carta de buena intención, certificado de acreditación de existencia, certificado de afiliación a la ARL, documento de vinculación y certificado de afiliación a salud. El estudiante, por su parte, debe presentar documentación relacionada con su movilidad, como pasaporte, visa, cédula, carnet estudiantil, formato de movilidad, itinerario de vuelo y seguros médicos internacionales, gestionados por la Oficina de Relaciones Internacionales de la Universidad.

                              Además, se requiere una carta de conocimiento del Director de Programa, asegurando que las actividades a realizar estén alineadas con el plan de formación del estudiante. Esta modalidad es ideal para empresas con proyección internacional que desean fortalecer sus equipos con talento joven colombiano y aportar a la formación de profesionales con una visión global.`,
        },
    ]

    const getColorClasses = (color: string) => {
        const colorMap = {
            blue: "border-blue-500 bg-blue-50 text-blue-700",
            green: "border-green-500 bg-green-50 text-green-700",
            purple: "border-purple-500 bg-purple-50 text-purple-700",
            orange: "border-orange-500 bg-orange-50 text-orange-700",
            indigo: "border-indigo-500 bg-indigo-50 text-indigo-700",
        }
        return colorMap[color as keyof typeof colorMap] || colorMap.blue
    }

    const getButtonColorClasses = (color: string) => {
        const colorMap = {
            blue: "bg-blue-600 hover:bg-blue-700",
            green: "bg-green-600 hover:bg-green-700",
            purple: "bg-purple-600 hover:bg-purple-700",
            orange: "bg-orange-600 hover:bg-orange-700",
            indigo: "bg-indigo-600 hover:bg-indigo-700",
        }
        return colorMap[color as keyof typeof colorMap] || colorMap.blue
    }

    return (
        <div className="space-y-8">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-800">Centro de Recursos para Empresas</CardTitle>
                    <p className="text-blue-700">Todo lo que necesita para vincular talento universitario a su
                        organización</p>
                </CardHeader>
            </Card>

            {/* Sistema GEDOPRAC */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 pb-1">
                        <Video className="h-6 w-6 text-blue-600"/>
                        Sistema GEDOPRAC - Guia Interactiva
                    </CardTitle>
                    <p className="text-gray-600">Plataforma para que las empresas registren, gestionen y den seguimiento a estudiantes en práctica, con carga de documentos y comunicación directa con la Universidad del Magdalena.</p>
                </CardHeader>

                {/* Link a GEDOPRAC */}
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <h4 className="font-semibold text-blue-700 mb-2">Acceso a la Pataforma</h4>
                            <p className="text-sm text-gray-600 mb-3">Ingrese con sus credenciales empresariales</p>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <ExternalLink className="h-4 w-4 mr-2"/>
                                Acceder a GEDOPRAC
                            </Button>
                        </div>

                        {/* Tutorial interactivo */}
                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <h4 className="font-semibold text-blue-700 mb-2">Tutorial Interactivo</h4>
                            <p className="text-sm text-gray-600 mb-3">Recorrido guiado por todas las funcionalidades</p>
                            <Button variant="outline" className="w-full bg-transparent">
                                <Play className="h-4 w-4 mr-2"/>
                                Iniciar Tutorial
                            </Button>
                        </div>

                        {/* Soporte */}
                        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <h4 className="font-semibold text-blue-700 mb-2">Soporte Técnico</h4>
                            <p className="text-sm text-gray-600 mb-3">Asistencia especializada para el sistema</p>
                            <Button variant="outline" className="w-full bg-transparent">
                                <Phone className="h-4 w-4 mr-2"/>
                                Contactar Soporte
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Manual Paso a paso */}
            <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-indigo-600"/>
                        Manual Paso a Paso - Solicitud de Practicantes
                    </CardTitle>
                    <p className="text-gray-600">Guía completa con acompañamiento gráfico y audiovisual</p>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Paso N°1 */}
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                            <div
                                className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                                1
                            </div>
                            <h4 className="font-semibold mb-2">Registro Empresarial</h4>
                            <p className="text-sm text-gray-600">Complete el formulario de registro institucional</p>
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                                <Video className="h-4 w-4 mr-1"/>
                                Ver Video
                            </Button>
                        </div>

                        {/* Paso N°2 */}
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                            <div
                                className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                                2
                            </div>
                            <h4 className="font-semibold mb-2">Definir Perfil</h4>
                            <p className="text-sm text-gray-600">Especifique el perfil profesional requerido</p>
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                                <FileText className="h-4 w-4 mr-1"/>
                                Plantilla
                            </Button>
                        </div>

                        {/* Paso N°3 */}
                        <div className="p-4 bg-orange-50 rounded-lg text-center">
                            <div
                                className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                                3
                            </div>
                            <h4 className="font-semibold mb-2">Documentación</h4>
                            <p className="text-sm text-gray-600">Adjunte los documentos requeridos</p>
                            <Button variant="outline" size="sm" className="mt-6 bg-transparent">
                                <Download className="h-4 w-4 mr-1"/>
                                Lista
                            </Button>
                        </div>

                        {/* Paso N°4 */}
                        <div className="p-4 bg-purple-50 rounded-lg text-center">
                            <div
                                className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                                4
                            </div>
                            <h4 className="font-semibold mb-2">Seguimiento</h4>
                            <p className="text-sm text-gray-600">Monitoree el estado de su solicitud</p>
                            <Button variant="outline" size="sm" className="mt-6 bg-transparent">
                                <ExternalLink className="h-4 w-4 mr-1"/>
                                Portal
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Normatividad de practicas */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-green-600"/>
                        Normatividad de Prácticas
                    </CardTitle>
                    <p className="text-gray-600">Marco legal y reglamentario que rige las prácticas profesionales</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                            <FileText className="h-8 w-8 text-green-600 mx-auto mb-3"/>
                            <h4 className="font-semibold text-green-800 mb-2">Resoluciones</h4>
                            <p className="text-sm text-gray-600 mb-3">3546/2018 y 623/2020</p>
                            <Button variant="outline" size="sm" className="bg-transparent">
                                <Download className="h-4 w-4 mr-2"/>
                                Descargar
                            </Button>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                            <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-3"/>
                            <h4 className="font-semibold text-green-800 mb-2">Recurso Disponible</h4>
                            <p className="text-sm text-gray-600 mb-3">Lineamientos Unimagdalena</p>
                            <Button variant="outline" size="sm" className="bg-transparent">
                                <Download className="h-4 w-4 mr-2"/>
                                Ver Manual
                            </Button>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3"/>
                            <h4 className="font-semibold text-green-800 mb-2">Formatos Oficiales</h4>
                            <p className="text-sm text-gray-600 mb-3">Documentos requeridos</p>
                            <Button variant="outline" size="sm" className="bg-transparent">
                                <Download className="h-4 w-4 mr-2"/>
                                Descargar Documentos
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <h5 className="font-semibold text-green-800 mb-2 text-sm">📋 Aspectos Clave</h5>
                        <ul className="text-xs text-green-700 space-y-1">
                            <li>• Duración mínima: 480 horas académicas (16 semanas)</li>
                            <li>• Cobertura obligatoria: ARL y afiliación a salud</li>
                            <li>• Supervisión conjunta: tutor empresarial y asesor académico</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Programas academicos y perfiles */}
            <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-purple-600"/>
                        Programas Académicos y Perfiles Profesionales
                    </CardTitle>
                    <p className="text-gray-600">
                        Explore los perfiles profesionales de nuestros programas académicos para identificar el talento
                        que mejor se adapte a las necesidades de su empresa
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">
                            💡 ¿Para qué sirve esta sección?
                        </h4>
                        <p className="text-sm text-purple-700">
                            Consulte información detallada sobre las competencias, habilidades y conocimientos que
                            poseen los egresados de cada programa académico.
                            Esta información le ayudará a tomar decisiones informadas sobre qué perfiles profesionales
                            solicitar para sus prácticas empresariales.
                        </p>
                    </div>

                    {/* Buscador */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                            <Input
                                placeholder="Buscar por programa, facultad o competencia..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        {searchTerm && (
                            <p className="text-sm text-gray-600 mt-2">
                                Mostrando {filteredPrograms.length} resultado(s) para &#34;{searchTerm}&#34;
                            </p>
                        )}
                    </div>

                    {/* Resultados de busqueda o programas destacados */}
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
                                        <Button variant="outline" size="sm">
                                            Ver Perfil Profesional
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Programas Destacados */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-purple-700 mb-4">🌟 Programas Más Solicitados</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {allPrograms
                                        .filter(program => featuredPrograms.includes(program.program))
                                        .map((item, index) => (
                                            <div key={index} className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
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
                                                    <Button variant="outline" size="sm">
                                                        Ver Perfil Profesional
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Guia para tutores empresariales */}
            <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-orange-600"/>
                        Guia para Tutores Empresariales
                    </CardTitle>
                    <p className="text-gray-600">Fortalezca su rol como formador complementario</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-orange-700">Herramientas Pedagógicas</h4>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <FileText className="h-4 w-4 mr-2"/>
                                    Manual del Tutor Empresarial
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Video className="h-4 w-4 mr-2"/>
                                    Técnicas de Mentoría
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <CheckCircle className="h-4 w-4 mr-2"/>
                                    Lista de Verificación Semanal
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-orange-700">Seguimiento y Evaluación</h4>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <FileText className="h-4 w-4 mr-2"/>
                                    Formatos de Evaluación
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Clock className="h-4 w-4 mr-2"/>
                                    Cronograma de Evaluaciones
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Users className="h-4 w-4 mr-2"/>
                                    Reuniones de Seguimiento
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Modalidades de Vinculación */}
            <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-indigo-600"/>
                        Modalidades de Vinculación
                    </CardTitle>
                    <p className="text-gray-600">Explore todas las opciones disponibles para vincular estudiantes</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {modalities.map((modality, index) => (
                            <div key={index}
                                 className={`p-4 border-2 rounded-lg hover:shadow-md transition-shadow ${getColorClasses(modality.color)}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-full ${modality.color === 'blue' ? 'bg-blue-100' :
                                        modality.color === 'green' ? 'bg-green-100' :
                                            modality.color === 'purple' ? 'bg-purple-100' :
                                                modality.color === 'orange' ? 'bg-orange-100' : 'bg-indigo-100'}`}>
                                        {modality.icon}
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {modality.duration}
                                    </Badge>
                                </div>
                                <h4 className="font-semibold mb-2">{modality.title}</h4>
                                <p className="text-sm mb-2">{modality.description}</p>
                                <p className="text-xs mb-3 opacity-75">{modality.requirements}</p>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`cursor-pointer w-full text-white border-none ${getButtonColorClasses(modality.color)}`}
                                        >
                                            Ver Detalles
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-3 text-xl">
                                                <div
                                                    className={`p-2 rounded-full ${modality.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                                        modality.color === 'green' ? 'bg-green-100 text-green-600' :
                                                            modality.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                                                modality.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                                    {modality.icon}
                                                </div>
                                                {modality.title}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div className="flex gap-4 mb-4">
                                                <Badge variant="outline" className="text-sm">
                                                    Duración: {modality.duration}
                                                </Badge>
                                                <Badge variant="secondary" className="text-sm">
                                                    {modality.requirements}
                                                </Badge>
                                            </div>
                                            <div className="prose max-w-none">
                                                {modality.fullDescription.split('\n\n').map((paragraph, index) => (
                                                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                            <div className="flex gap-3 pt-4 border-t">
                                                <Button className={`${getButtonColorClasses(modality.color)}`}>
                                                    <ExternalLink className="h-4 w-4 mr-2"/>
                                                    Solicitar Esta Modalidad
                                                </Button>
                                                <Button variant="outline">
                                                    <Download className="h-4 w-4 mr-2"/>
                                                    Descargar Documentos
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-red-600"/>
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
                    <div className="mt-4 text-center">
                        <Button variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2"/>
                            Ver Todas las FAQ
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Calendario */}
            <Card className="border-l-4 border-l-teal-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-6 w-6 text-teal-600"/>
                        Calendario de Actividades Institucionales
                    </CardTitle>
                    <p className="text-gray-600">Fechas importantes y eventos para empresas aliadas</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-teal-700 mb-3">Proximos Eventos</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-teal-600">15</div>
                                        <div className="text-xs text-teal-600">MAR</div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold">Feria de Prácticas 2024</h5>
                                        <p className="text-sm text-gray-600">Encuentro empresas-estudiantes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-600">22</div>
                                        <div className="text-xs text-blue-600">MAR</div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold">Charla para Empresas Aliadas</h5>
                                        <p className="text-sm text-gray-600">Nuevas modalidades de vinculación</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-teal-700 mb-3">Fechas Académicas Importantes</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Inicio de Semestre</span>
                                    <span className="font-semibold">Agosto 4</span>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Período de Prácticas I</span>
                                    <span className="font-semibold">Agosto - Diciembre</span>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Período de Prácticas II</span>
                                    <span className="font-semibold">Febrero - Junio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Reconocimiento para compañias */}
            <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        Empresas Aliadas Destacadas
                    </CardTitle>
                    <p className="text-gray-600">Reconocimiento a nuestros socios estratégicos en formación
                        profesional</p>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <h4 className="font-semibold text-yellow-700 mb-4 text-center">🏆 Empresa Aliada del Semestre -
                            Periodo I 2025</h4>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-yellow-200">
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <Building2 className="h-8 w-8 text-white"/>
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 mb-2">Ecopetrol</h5>
                                <p className="text-gray-600 mb-4">
                                    Destacada por su compromiso excepcional con la formación de 15 estudiantes
                                </p>
                                <div className="flex justify-center gap-4 text-sm">
                                    <div className="text-center">
                                        <div className="font-bold text-blue-600">15</div>
                                        <div className="text-gray-500">Practicantes</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-green-600">98%</div>
                                        <div className="text-gray-500">Satisfacción</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-purple-600">3</div>
                                        <div className="text-gray-500">Años Aliados</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Bancolombia", "EPM", "Grupo Éxito", "Avianca"].map((company, index) => (
                            <div key={index} className="p-3 bg-white rounded-lg text-center border">
                                <div
                                    className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-gray-600"/>
                                </div>
                                <h6 className="font-semibold text-sm">{company}</h6>
                                <p className="text-xs text-gray-500">Empresa Aliada</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <Button variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2"/>
                            Ver Todas las Empresas Aliadas
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}