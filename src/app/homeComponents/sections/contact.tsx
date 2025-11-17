"use client"

import type React from "react"
import {useState} from "react"
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    User,
    Building2,
    MessageSquare,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Info,
    Calendar,
    Globe,
    FileText,
    HelpCircle,
    Search, Headphones,
} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Input} from "@/components/ui/input"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {Separator} from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const facultyContacts = [
    {
        faculty: "Facultad de Ingeniería",
        programs: ["Ingeniería de Sistemas", "Ingeniería Industrial", "Ingeniería Civil", "Ingeniería Electrónica"],
        liaison: "Ing. María Fernanda Rodríguez",
        email: "mrodriguez@unimagdalena.edu.co",
        phone: "(57-5) 4381000 Ext. 1234",
        office: "Edificio de Ingeniería, Oficina 201",
        hours: "Lunes a Viernes: 8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM",
        color: "blue",
    },
    {
        faculty: "Facultad de Ciencias Empresariales y Económicas",
        programs: ["Administración de Empresas", "Contaduría Pública", "Economía", "Negocios Internacionales"],
        liaison: "Adm. Carlos Alberto Mendoza",
        email: "cmendoza@unimagdalena.edu.co",
        phone: "(57-5) 4381000 Ext. 1235",
        office: "Edificio Administrativo, Oficina 305",
        hours: "Lunes a Viernes: 7:30 AM - 11:30 AM, 1:30 PM - 5:30 PM",
        color: "green",
    },
    {
        faculty: "Facultad de Ciencias de la Salud",
        programs: ["Medicina", "Enfermería", "Psicología", "Fisioterapia"],
        liaison: "Dr. Ana Lucía Herrera",
        email: "aherrera@unimagdalena.edu.co",
        phone: "(57-5) 4381000 Ext. 1236",
        office: "Edificio de Ciencias de la Salud, Oficina 102",
        hours: "Lunes a Viernes: 8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM",
        color: "red",
    },
    {
        faculty: "Facultad de Ciencias de la Educación",
        programs: [
            "Licenciatura en Educación Infantil",
            "Licenciatura en Lenguas Extranjeras",
            "Licenciatura en Matemáticas",
        ],
        liaison: "Lic. Roberto Jiménez Castillo",
        email: "rjimenez@unimagdalena.edu.co",
        phone: "(57-5) 4381000 Ext. 1237",
        office: "Edificio de Educación, Oficina 204",
        hours: "Lunes a Viernes: 7:00 AM - 11:00 AM, 1:00 PM - 5:00 PM",
        color: "purple",
    },
    {
        faculty: "Facultad de Humanidades",
        programs: ["Derecho", "Antropología", "Historia", "Cine y Audiovisuales"],
        liaison: "Dr. Patricia Morales Vega",
        email: "pmorales@unimagdalena.edu.co",
        phone: "(57-5) 4381000 Ext. 1238",
        office: "Edificio de Humanidades, Oficina 301",
        hours: "Lunes a Viernes: 8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM",
        color: "orange",
    },
]

const faqItems = [
    {
        question: "¿Cuándo puedo iniciar mi proceso de prácticas?",
        answer:
            "Puedes iniciar tu proceso de prácticas una vez hayas cumplido con el 60% de los créditos de tu programa académico y no tengas materias pendientes del primer semestre.",
    },
    {
        question: "¿Cuánto tiempo dura el proceso de prácticas?",
        answer: "La duración estándar es de 4 a 6 meses, dependiendo de tu programa académico y el acuerdo con la empresa.",
    },
    {
        question: "¿Las prácticas son remuneradas?",
        answer:
            "Depende de la empresa y la modalidad de vinculación. Algunas ofrecen remuneración económica, otras ofrecen apoyo de sostenimiento o bonificaciones.",
    },
    {
        question: "¿Puedo hacer prácticas en otra ciudad?",
        answer:
            "Sí, puedes realizar tus prácticas en cualquier ciudad del país o incluso en el extranjero, siempre que cumplas con los requisitos y el proceso de legalización.",
    },
]

export default function Contact() {
    const [activeTab, setActiveTab] = useState("general")
    const [expandedFaculty, setExpandedFaculty] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredFaculties = facultyContacts.filter(
        (contact) =>
            contact.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.programs.some((program) => program.toLowerCase().includes(searchQuery.toLowerCase())) ||
            contact.liaison.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const getColorClasses = (color: string) => {
        const colors: { [key: string]: string } = {
            blue: "border-l-blue-500 hover:bg-blue-50/50",
            green: "border-l-green-500 hover:bg-green-50/50",
            red: "border-l-red-500 hover:bg-red-50/50",
            purple: "border-l-purple-500 hover:bg-purple-50/50",
            orange: "border-l-orange-500 hover:bg-orange-50/50",
        }
        return colors[color] || colors.blue
    }

    return (
        <div className="space-y-8">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-800">Centro de Atención y Contacto</CardTitle>
                    <p className="text-blue-700">Encuentra aquí los canales oficiales de comunicación con la Dirección
                        de Prácticas Profesionales</p>
                </CardHeader>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 bg-gray-50 rounded-lg p-1">
                    {[
                        {value: "general", icon: Building2, label: "Info. General"},
                        {value: "faculty", icon: User, label: "Por Facultad"},
                        {value: "faq", icon: HelpCircle, label: "Preguntas Frecuentes"},
                    ].map(({value, icon: Icon, label}) => (
                        <TabsTrigger
                            key={value}
                            value={value}
                            className="flex items-center gap-2"
                        >
                            <Icon className="h-4 w-4"/>
                            <span className="hidden sm:inline">{label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="general" className="space-y-8 mt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* --- CARD PRINCIPAL: Dirección --- */}
                        <Card
                            className="lg:col-span-2 border-none shadow-md hover:shadow-xl transition-all duration-300">
                            <CardHeader
                                className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-700 text-white rounded-t-xl p-6">
                                <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                                    <div className="p-3 bg-white/20 rounded-lg">
                                        <Building2 className="h-6 w-6 text-white"/>
                                    </div>
                                    Dirección de Prácticas Profesionales
                                </CardTitle>
                                <CardDescription className="text-blue-100">
                                    Centro de coordinación y apoyo integral para estudiantes
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6 p-6 bg-white rounded-b-xl">
                                <ul className="space-y-6">

                                    <li className="flex items-start gap-4 group">
                                        <div
                                            className="p-2 bg-blue-50 rounded-lg shadow-sm mt-1 group-hover:bg-blue-100 transition-all">
                                            <Mail className="h-5 w-5 text-blue-600"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700 mb-1">Correo Principal</p>
                                            <a
                                                href="mailto:direccionpracticas@unimagdalena.edu.co"
                                                className="text-blue-600 hover:underline break-all font-medium"
                                            >
                                                direccionpracticas@unimagdalena.edu.co
                                            </a>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-4 group">
                                        <div
                                            className="p-2 bg-green-50 rounded-lg shadow-sm mt-1 group-hover:bg-green-100 transition-all">
                                            <Phone className="h-5 w-5 text-green-600"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700 mb-1">Líneas Telefónicas</p>
                                            <p className="text-gray-800 font-medium">(57-5) 4381000</p>
                                            <p className="text-gray-600 text-sm">4365000</p>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-4 group">
                                        <div
                                            className="p-2 bg-orange-50 rounded-lg shadow-sm mt-1 group-hover:bg-orange-100 transition-all">
                                            <MapPin className="h-5 w-5 text-orange-600"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700 mb-1">Ubicación</p>
                                            <p className="text-gray-700 text-sm">Carrera 32 No 22 - 08</p>
                                            <p className="text-gray-700 text-sm">Santa Marta D.T.C.H., Colombia</p>
                                            <p className="text-gray-500 text-xs mt-1">Código Postal: 470004</p>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-4 group">
                                        <div
                                            className="p-2 bg-purple-50 rounded-lg shadow-sm mt-1 group-hover:bg-purple-100 transition-all">
                                            <Clock className="h-5 w-5 text-purple-600"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700 mb-1">Horario de Atención</p>
                                            <p className="text-gray-700 text-sm">Lunes a Viernes</p>
                                            <p className="text-gray-800 font-medium text-sm">8:00 AM - 12:00 PM</p>
                                            <p className="text-gray-800 font-medium text-sm">2:00 PM - 6:00 PM</p>
                                        </div>
                                    </li>
                                </ul>

                                <Separator className="my-6"/>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        asChild
                                        className="flex-1 bg-blue-900 hover:bg-blue-700 text-white py-3 text-base shadow-md hover:shadow-lg transition-all"
                                    >
                                        <a href="mailto:direccionpracticas@unimagdalena.edu.co?subject=Consulta sobre Prácticas Profesionales">
                                            <Mail className="h-4 w-4 mr-2"/>
                                            Enviar Correo
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="flex-1 py-3 text-blue-600 border-blue-500 hover:bg-blue-50 transition-all"
                                    >
                                        <a
                                            href="https://gedoprac.unimagdalena.edu.co"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2"/>
                                            Ir a GEDOPRAC
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* --- LATERAL: Enlaces rápidos + Dato --- */}
                        <div className="space-y-5">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                                        <Globe className="h-5 w-5 text-blue-600"/>
                                        Enlaces Rápidos
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button asChild variant="ghost"
                                            className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                                        <a href="https://practicasprofesionales.unimagdalena.edu.co/Convocatoria"
                                           target="_blank" rel="noreferrer">
                                            <ExternalLink className="h-4 w-4 mr-2"/>
                                            Ver Convocatorias
                                        </a>
                                    </Button>
                                    <Button asChild variant="ghost"
                                            className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                                        <a href="https://www.unimagdalena.edu.co" target="_blank" rel="noreferrer">
                                            <Globe className="h-4 w-4 mr-2"/>
                                            Portal Unimagdalena
                                        </a>
                                    </Button>
                                    <Button asChild variant="ghost"
                                            className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                                        <a
                                            href="https://www.unimagdalena.edu.co/Content/Public/Docs/Entrada_Direcci%C3%B3n4/adjunto_1032-20190425154914_53.pdf"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FileText className="h-4 w-4 mr-2"/>
                                            Reglamento de Prácticas
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card
                                className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                                        <Info className="h-5 w-5"/>
                                        Dato Importante
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                        Recuerda registrarte en la plataforma GEDOPRAC antes de iniciar tu búsqueda de
                                        prácticas.
                                    </p>
                                    <Button asChild size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                                        <a href="https://gedoprac.unimagdalena.edu.co" target="_blank"
                                           rel="noopener noreferrer">
                                            Ir a GEDOPRAC
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"> <CardHeader
                                className="pb-3"> <CardTitle className="text-lg flex items-center gap-2 text-green-900">
                                <Calendar className="h-5 w-5"/> Horario Especial </CardTitle> </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-green-800 mb-2"> Durante periodos de
                                        convocatoria, extendemos nuestro horario de atención: </p>
                                    <p className="text-sm font-semibold text-green-900">
                                        Lunes a Viernes: 7:00 AM - 7:00 PM</p>
                                    <p className="text-sm font-semibold text-green-900">Sábados: 9:00 AM - 1:00 PM</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* --- INICIO: Pestaña Facultad --- */}
                <TabsContent value="faculty" className="space-y-6 mt-6">
                    <div className="space-y-6">
                        <div className="text-center space-y-4 max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold text-unimagdalena-primary">Contactos Especializados por
                                Facultad</h3>
                            <p className="text-gray-600">
                                Cada facultad cuenta con un enlace especializado para brindarte atención personalizada
                                según tu programa
                                académico. Busca tu facultad o programa a continuación.
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                <Input
                                    placeholder="Buscar por facultad, programa o enlace..."
                                    className="pl-10 h-12 text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {filteredFaculties.length === 0 ? (
                            <Alert variant="destructive" className="max-w-2xl mx-auto">
                                <AlertCircle className="h-4 w-4"/>
                                <AlertDescription>
                                    No se encontraron resultados para "{searchQuery}". Intenta con otro término de
                                    búsqueda.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-4">
                                {filteredFaculties.map((contact, index) => (
                                    <Card
                                        key={index}
                                        className={`border-l-4 transition-all duration-300 ${getColorClasses(contact.color)} ${
                                            expandedFaculty === contact.faculty ? "shadow-xl" : "hover:shadow-lg"
                                        }`}
                                    >
                                        <CardHeader
                                            className="cursor-pointer select-none"
                                            onClick={() => setExpandedFaculty(expandedFaculty === contact.faculty ? null : contact.faculty)}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                                            <Building2 className="h-5 w-5 text-unimagdalena-primary"/>
                                                        </div>
                                                        <CardTitle
                                                            className="text-xl text-unimagdalena-primary">{contact.faculty}</CardTitle>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {contact.programs.slice(0, 3).map((program, idx) => (
                                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                                {program}
                                                            </Badge>
                                                        ))}
                                                        {contact.programs.length > 3 && (
                                                            <Badge variant="outline" className="text-xs font-semibold">
                                                                +{contact.programs.length - 3} programas más
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="shrink-0">
                                                    {expandedFaculty === contact.faculty ? (
                                                        <ChevronUp className="h-5 w-5"/>
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5"/>
                                                    )}
                                                </Button>
                                            </div>
                                        </CardHeader>

                                        {expandedFaculty === contact.faculty && (
                                            <CardContent
                                                className="space-y-6 animate-in slide-in-from-top-4 duration-300">
                                                <Separator/>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    {/* ... (Información de contacto del enlace) ... */}
                                                    <div className="space-y-4">
                                                        <div
                                                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <User className="h-5 w-5 text-unimagdalena-primary mt-0.5"/>
                                                            <div>
                                                                <p className="font-semibold text-sm text-gray-700">Enlace
                                                                    Especializado</p>
                                                                <p className="text-gray-900 font-medium">{contact.liaison}</p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <Mail
                                                                className="h-5 w-5 text-unimagdalena-complement mt-0.5"/>
                                                            <div>
                                                                <p className="font-semibold text-sm text-gray-700 mb-1">Correo
                                                                    Electrónico</p>
                                                                <a
                                                                    href={`mailto:${contact.email}`}
                                                                    className="text-unimagdalena-primary hover:underline break-all"
                                                                >
                                                                    {contact.email}
                                                                </a>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <Phone className="h-5 w-5 text-green-600 mt-0.5"/>
                                                            <div>
                                                                <p className="font-semibold text-sm text-gray-700 mb-1">Teléfono</p>
                                                                <p className="text-gray-900 font-medium">{contact.phone}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div
                                                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <MapPin className="h-5 w-5 text-red-600 mt-0.5"/>
                                                            <div>
                                                                <p className="font-semibold text-sm text-gray-700 mb-1">Ubicación</p>
                                                                <p className="text-gray-600">{contact.office}</p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <Clock className="h-5 w-5 text-blue-600 mt-0.5"/>
                                                            <div>
                                                                <p className="font-semibold text-sm text-gray-700 mb-1">Horario
                                                                    de Atención</p>
                                                                <p className="text-gray-600 text-sm whitespace-pre-line">{contact.hours}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* --- INICIO: Lista de Programas --- */}
                                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                    <p className="text-sm font-semibold mb-3 text-blue-900">Programas
                                                        Académicos Atendidos:</p>
                                                    <ul className="space-y-1.5 list-disc list-inside columns-1 md:columns-2 gap-x-6">
                                                        {contact.programs.map((program, idx) => (
                                                            <li key={idx} className="text-sm text-gray-700">
                                                                {program}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button asChild
                                                            className="flex-1 bg-unimagdalena-primary hover:bg-unimagdalena-primary/90">
                                                        <a href={`mailto:${contact.email}?subject=Consulta sobre Prácticas - ${contact.faculty}`}>
                                                            <Mail className="h-4 w-4 mr-2"/>
                                                            Enviar Correo
                                                        </a>
                                                    </Button>
                                                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                                                        <a href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}>
                                                            <Phone className="h-4 w-4 mr-2"/>
                                                            Llamar
                                                        </a>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* --- INICIO: Pestaña FAQ --- */}
                <TabsContent value="faq" className="space-y-6 mt-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="text-center space-y-4">
                            <h3 className="text-2xl font-bold text-unimagdalena-primary flex items-center justify-center gap-3">
                                <HelpCircle className="h-7 w-7"/>
                                Preguntas Frecuentes
                            </h3>
                            <p className="text-gray-600">
                                Encuentra respuestas rápidas a las consultas más comunes sobre el proceso de prácticas
                                profesionales.
                            </p>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-3">
                            {faqItems.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-l-4 border-l-unimagdalena-complement bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <AccordionTrigger
                                        className="flex items-start gap-3 p-4 text-left font-semibold text-gray-800 hover:no-underline">
                                        <div className="p-2 bg-unimagdalena-complement/10 rounded-lg shrink-0 mt-0.5">
                                            <HelpCircle className="h-4 w-4 text-unimagdalena-complement"/>
                                        </div>
                                        <span className="flex-1">{item.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-0 pb-4 px-4 pl-16">
                                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                            <CardContent className="pt-6">
                                <div className="text-center space-y-4">
                                    <p className="text-gray-700 font-medium">¿No encontraste respuesta a tu
                                        pregunta?</p>
                                    <Button
                                        onClick={() => setActiveTab("form")}
                                        className="bg-unimagdalena-primary hover:bg-unimagdalena-primary/90"
                                    >
                                        <MessageSquare className="h-4 w-4 mr-2"/>
                                        Contáctanos Directamente
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
};