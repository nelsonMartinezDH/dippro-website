"use client"

import {useEffect, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {
    Search,
    Calendar,
    Building2,
    Users,
    ExternalLink,
    Clock,
    MapPin,
    Globe,
    Monitor,
    Filter,
    SortAsc, Layers, Briefcase, BookOpen, DollarSign, FileText, Star, Lightbulb, Eye, User, Award, Check
} from "lucide-react"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {format, parseISO} from "date-fns"
import {es} from "date-fns/locale"

interface CallStatisticsData {
    id: number;
    convocatoriasActivas: string;
    empresasAliadas: string;
    estudiantesEnPractica: string;
}

interface CallHeroImageData {
    id: number;
    imageUrl: string;
}

const safeJsonParse = (jsonString: string | null | undefined): string[] => {
    if (!jsonString) return []
    try {
        const parsed = JSON.parse(jsonString)
        return Array.isArray(parsed) && parsed.every(item => typeof item === 'string') ? parsed : []
    } catch (error) {
        console.error("Error parsing JSON string:", error, jsonString)
        return []
    }
}

interface Convocatoria {
    id: number
    title: string
    company: string
    type: string
    status: "Activa" | "Cerrada"
    startDate: string
    endDate: string
    location: string
    vacancies: number
    description: string
    requirementsJson: string
    actividadesDesarrollarJson: string
    requisitosVacanteJson: string
    pasosPostulacionJson: string
    modality: string
    duration: string
    modalidadVinculacion: string
    remuneracionEconomica: string
    perfilProfesionalRequerido: string
    modalidadTrabajo: "Presencial" | "Remoto" | "Híbrido" | "Virtual"
    programaRequerido: string
    tipoPostulacion: "GEDOPRAC" | "Empresa"
    enlacePostulacion: string
    perfilVacante: string
    urgency: "Alta" | "Media" | "Baja"
    companyLogo?: string
    featured?: boolean
    applicationCount?: number
    successRate?: number
}

export default function Convocatorias() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("Todas")
    const [typeFilter, setTypeFilter] = useState<string>("Todos")
    const [programFilter, setProgramFilter] = useState<string>("Todos")
    const [sortBy, setSortBy] = useState<string>("fecha")
    const [salaryFilter, setSalaryFilter] = useState<string>("todos")
    const [modalityFilter, setModalityFilter] = useState<string>("todas")
    const [postulationTypeFilter, setPostulationTypeFilter] = useState<string>("todos")
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

    const [statistics, setStatistics] = useState<CallStatisticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [callHeroImage, setCallHeroImage] = useState<CallHeroImageData | null>(null);

    const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);

    const baseServerUrl = "http://localhost:5213";
    const apiStatisticsUrl = "http://localhost:5213/api/CallStatistics";
    const apiHeroImage = "http://localhost:5213/api/CallHeroImage";
    const apiConvocatoriasUrl = "http://localhost:5213/api/Convocatorias";

    const getFullImageUrl = (path: string | undefined) => {
        if (!path || path.trim() === "") return null;
        if (path.startsWith('http')) {
            return path;
        }
        return `${baseServerUrl}${path}`;
    }

    useEffect(() => {
        fetch(apiStatisticsUrl)
            .then((res) => {
                if (!res.ok) throw new Error("Fallo al cargar estadísticas.");
                return res.json();
            })
            .then((data: CallStatisticsData) => {
                setStatistics(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener estadísticas de convocatorias:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch(apiHeroImage)
            .then((res) => {
                if (!res.ok) throw new Error("Fallo al cargar la imagen de fondo");
                return res.json();
            })
            .then((data: CallHeroImageData) => {
                setCallHeroImage(data);
            })
            .catch((err) => {
                console.error("Error al obtener imagen del hero:", err);
            });
    }, []);

    useEffect(() => {
        fetch(apiConvocatoriasUrl)
            .then((res) => {
                if (!res.ok) throw new Error("Fallo al cargar las convocatorias.");
                return res.json();
            })
            .then((data: Convocatoria[]) => {
                setConvocatorias(data);
            })
            .catch((err) => {
                console.error("Error al obtener convocatorias:", err);
            });
    }, []);

    const filteredConvocatorias = convocatorias.filter((conv) => {
        const matchesSearch =
            conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.programaRequerido.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "Todas" || conv.status === statusFilter
        const matchesType = typeFilter === "Todos" || conv.type === typeFilter
        const matchesProgram =
            programFilter === "Todos" || conv.programaRequerido.toLowerCase().includes(programFilter.toLowerCase())

        const matchesSalary =
            salaryFilter === "todos" ||
            (salaryFilter === "con-remuneracion" && conv.remuneracionEconomica !== "Sin remuneración" && conv.remuneracionEconomica !== "0") ||
            (salaryFilter === "sin-remuneracion" && (conv.remuneracionEconomica === "Sin remuneración" || conv.remuneracionEconomica === "0"))

        const matchesModality = modalityFilter === "todas" || (conv.modalidadTrabajo && conv.modalidadTrabajo.toLowerCase() === modalityFilter)

        const matchesPostulationType = postulationTypeFilter === "todos" || (conv.tipoPostulacion && conv.tipoPostulacion.toLowerCase() === postulationTypeFilter)

        return matchesSearch && matchesStatus && matchesType && matchesProgram && matchesSalary && matchesModality && matchesPostulationType
    })

    const sortedConvocatorias = [...filteredConvocatorias].sort((a, b) => {
        switch (sortBy) {
            case "fecha":
                return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            case "empresa":
                return a.company.localeCompare(b.company)
            case "posiciones":
                return b.vacancies - a.vacancies
            case "cierre":
                return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
            case "relevancia":
                return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            default:
                return 0
        }
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Activa":
                return "bg-green-100 text-green-800 border-green-200"
            case "Cerrada":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Tutores":
                return "bg-purple-100 text-purple-800 border-purple-200"
            case "Practicas profesionales":
                return "bg-orange-100 text-orange-800 border-orange-200"
            case "Beca De Práctica Pofesional Institucional":
                return "bg-blue-100 text-blue-800 border-blue-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getModalidadVinculacionColor = (modalidad: string) => {
        switch (modalidad) {
            case "Contrato de Aprendizaje SENA":
                return "bg-green-100 text-green-800 border-green-200"
            case "Acuerdo de Voluntades":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "Acto Administrativo":
                return "bg-purple-100 text-purple-800 border-purple-200"
            case "Contrato Laboral":
                return "bg-orange-100 text-orange-800 border-orange-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getModalidadTrabajoIcon = (modalidad: string) => {
        switch (modalidad) {
            case "Presencial":
                return <Building2 className="h-4 w-4"/>
            case "Remoto":
                return <Globe className="h-4 w-4"/>
            case "Híbrido":
                return <Monitor className="h-4 w-4"/>
            case "Virtual":
                return <Monitor className="h-4 w-4"/>
            default:
                return <Building2 className="h-4 w-4"/>
        }
    }

    const heroBackgroundUrl = getFullImageUrl(callHeroImage?.imageUrl);

    const heroStyle = heroBackgroundUrl ? {
        backgroundImage: `url('${heroBackgroundUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {
        background: 'linear-gradient(135deg, #1e3a8a 0%, #4c1d95 50%, #4338ca 100%)',
    };

    const heroContainerStyle = {
        minHeight: '400px',
    };

    return (
        <div className="space-y-8">
            <div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                style={heroContainerStyle}
            >
                <div
                    className="absolute inset-0 z-0 transition-all duration-500"
                    style={{
                        ...heroStyle,
                        filter: heroBackgroundUrl ? 'blur(0px)' : 'none',
                        transform: 'scale(1.02)'
                    }}
                ></div>
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 px-8 py-16 lg:px-12 lg:py-20 text-center">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-6 flex justify-center">
                            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                                <Building2 className="h-12 w-12 text-white"/>
                            </div>
                        </div>

                        <h1 className="mb-6 text-5xl font-bold text-white lg:text-6xl">
                            Convocatorias de
                            <span className="block text-orange-300">Prácticas Profesionales</span>
                        </h1>

                        <p className="mb-8 text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                            Descubre oportunidades únicas para desarrollar tu carrera profesional. Conectamos tu talento
                            con las mejores empresas e instituciones del país.
                        </p>

                        {/* Estadisticas */}
                        {loading ? (
                            <div className="text-center text-gray-200 py-4">Cargando datos de impacto...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                                <div
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                                    <div className="text-3xl font-bold text-orange-300 mb-2">{statistics?.convocatoriasActivas}</div>
                                    <div className="text-white font-medium">Convocatorias Activas</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                                    <div className="text-3xl font-bold text-orange-300 mb-2">{statistics?.empresasAliadas}</div>
                                    <div className="text-white font-medium">Empresas Aliadas</div>
                                </div>

                                <div
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                                    <div className="text-3xl font-bold text-orange-300 mb-2">{statistics?.estudiantesEnPractica}</div>
                                    <div className="text-white font-medium">Estudiantes en Practicas</div>
                                </div>
                            </div>)}
                    </div>
                </div>

                <div
                    className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-r from-orange-400 to-orange-500"></div>
            </div>

            <Card className="shadow-xl border-2 border-blue-100">
                <CardContent className="p-8">
                    <div className="space-y-6">
                        {/* Barra de busqueda */}
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                            <Input
                                placeholder="Buscar por programa, título, empresa o descripción..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                            />
                        </div>

                        {/* Seccion de filtros */}
                        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                            <div className="flex flex-wrap gap-3">
                                {["Todas", "Activa", "Cerrada"].map((status) => (
                                    <Button
                                        key={status}
                                        variant={statusFilter === status ? "default" : "outline"}
                                        onClick={() => setStatusFilter(status)}
                                        className={`rounded-full px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                                            statusFilter === status
                                                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl"
                                                : "hover:bg-blue-50 border-2 border-blue-200 text-blue-700 hover:border-blue-400"
                                        }`}
                                    >
                                        {status}
                                        {status === "Activa" && (
                                            <Badge className="ml-2 bg-green-500 text-white text-xs px-2 py-1">
                                                {convocatorias.filter((c) => c.status === "Activa").length}
                                            </Badge>
                                        )}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                    className="flex items-center gap-3 border-2 border-gray-300 hover:border-blue-400 rounded-xl px-6 py-3 font-semibold"
                                >
                                    <Filter className="h-5 w-5"/>
                                    Filtros Avanzados
                                    <Badge variant="secondary" className="ml-2">
                                        {showAdvancedFilters ? "Ocultar" : "Mostrar"}
                                    </Badge>
                                </Button>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger
                                        className="w-56 border-2 border-gray-300 hover:border-blue-400 rounded-xl px-6 py-3 font-semibold">
                                        <SortAsc className="h-5 w-5 mr-2"/>
                                        <SelectValue placeholder="Ordenar por"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevancia">Más relevantes</SelectItem>
                                        <SelectItem value="fecha">Más recientes</SelectItem>
                                        <SelectItem value="empresa">Empresa A-Z</SelectItem>
                                        <SelectItem value="posiciones">Más posiciones</SelectItem>
                                        <SelectItem value="cierre">Próximo a cerrar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Panel de filtros avanzados */}
                        {showAdvancedFilters && (
                            <div
                                className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-600 rounded-lg">
                                        <Layers className="h-5 w-5 text-white"/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Filtros Avanzados</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Briefcase className="h-4 w-4"/>
                                            Tipo de Convocatoria
                                        </label>
                                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                                            <SelectTrigger className="border-2 border-gray-300 rounded-xl">
                                                <SelectValue placeholder="Seleccionar tipo"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Todos">Todos los tipos</SelectItem>
                                                <SelectItem value="Tutores">Tutores</SelectItem>
                                                <SelectItem value="Practicas profesionales">Practicas profesionales</SelectItem>
                                                <SelectItem value="Beca De Práctica Pofesional Institucional">Becas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <BookOpen className="h-4 w-4"/>
                                            Programa Académico
                                        </label>
                                        <Select value={programFilter} onValueChange={setProgramFilter}>
                                            <SelectTrigger className="border-2 border-gray-300 rounded-xl">
                                                <SelectValue placeholder="Seleccionar programa"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Todos">Todos los programas</SelectItem>
                                                <SelectItem value="Derecho">Derecho</SelectItem>
                                                <SelectItem value="Administración">Administración</SelectItem>
                                                <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                                                <SelectItem value="Negocios">Negocios</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <DollarSign className="h-4 w-4"/>
                                            Remuneración
                                        </label>
                                        <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                                            <SelectTrigger className="border-2 border-gray-300 rounded-xl">
                                                <SelectValue placeholder="Seleccionar remuneración"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="todos">Todas</SelectItem>
                                                <SelectItem value="con-remuneracion">Con remuneración</SelectItem>
                                                <SelectItem value="sin-remuneracion">Sin remuneración</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Globe className="h-4 w-4"/>
                                            Modalidad de Trabajo
                                        </label>
                                        <Select value={modalityFilter} onValueChange={setModalityFilter}>
                                            <SelectTrigger className="border-2 border-gray-300 rounded-xl">
                                                <SelectValue placeholder="Seleccionar modalidad"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="todas">Todas</SelectItem>
                                                <SelectItem value="presencial">Presencial</SelectItem>
                                                <SelectItem value="remoto">Remoto</SelectItem>
                                                <SelectItem value="híbrido">Híbrido</SelectItem>
                                                <SelectItem value="virtual">Virtual</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6 border-t border-gray-300">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearchTerm("")
                                            setStatusFilter("Todas")
                                            setTypeFilter("Todos")
                                            setProgramFilter("Todos")
                                            setSalaryFilter("todos")
                                            setModalityFilter("todas")
                                            setSortBy("relevancia")
                                        }}
                                        className="border-2 border-gray-300 hover:border-red-400 text-gray-700 hover:text-red-600 rounded-xl px-6 py-3 font-semibold"
                                    >
                                        Limpiar Filtros
                                    </Button>
                                    <Button
                                        onClick={() => setShowAdvancedFilters(false)}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-3 font-semibold"
                                    >
                                        Aplicar Filtros
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Resultados de filtros y link a GEDOPRAC */}
                        <div
                            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <p className="text-lg font-semibold text-gray-700">
                                    <span
                                        className="text-2xl font-bold text-blue-600">{filteredConvocatorias.length}</span> convocatorias
                                    encontradas
                                </p>
                                {searchTerm && (
                                    <Badge variant="outline" className="text-sm">
                                        Búsqueda: &quot;{searchTerm}&quot;;
                                    </Badge>
                                )}
                            </div>

                            <Button
                                size="lg"
                                onClick={() => window.open("https://gedoprac.unimagdalena.edu.co/auth/login?return=%2Fpages%2Fdashboard", "_blank")}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg font-semibold px-8"
                            >
                                <ExternalLink className="h-5 w-5 mr-2"/>
                                Plataforma GEDOPRAC
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Panel de convocatorias */}
            <div className="grid gap-8">
                {sortedConvocatorias.map((convocatoria) => (
                    <Card
                        key={convocatoria.id}
                        className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${
                            convocatoria.status === "Activa" ? "border-green-400 border-2" : "border-gray-300 border"
                        }`}
                    >
                        <CardHeader className="pb-6 bg-gradient-to-r from-gray-50 to-blue-50">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex flex-wrap gap-3">
                                        <Badge
                                            className={`${getStatusColor(convocatoria.status)} px-3 py-1 text-sm font-semibold`}>
                                            {convocatoria.status}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={`${getTypeColor(convocatoria.type)} px-3 py-1 text-sm font-semibold`}
                                        >
                                            {convocatoria.type}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={`${getModalidadVinculacionColor(convocatoria.modalidadVinculacion)} px-3 py-1 text-sm font-semibold`}
                                        >
                                            {convocatoria.modalidadVinculacion}
                                        </Badge>
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <CardTitle
                                            className="text-2xl text-blue-900 hover:text-blue-700 transition-colors flex-1">
                                            {convocatoria.title}
                                        </CardTitle>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-lg text-gray-600">
                                            <FileText className="h-4 w-4 text-green-500"/>
                                            <span className="font-medium">Programa:</span>
                                            <span>{convocatoria.programaRequerido}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                                            <Building2 className="h-5 w-5 text-blue-500"/>
                                            <span className="font-medium">{convocatoria.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                                            <MapPin className="h-5 w-5 text-green-500"/>
                                            <span className="font-medium">{convocatoria.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                                            <Users className="h-5 w-5 text-purple-500"/>
                                            <span className="font-medium">{convocatoria.vacancies} plazas</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 min-w-[200px]">
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="h-4 w-4 text-orange-500"/>
                                            <div>
                                                <div className="font-semibold">Fecha publicación:</div>
                                                <div>{format(parseISO(convocatoria.startDate), 'dd MMM', { locale: es })}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="h-4 w-4 text-red-500"/>
                                            <div>
                                                <div className="font-semibold">Cierre Convocatoria:</div>
                                                <div>{format(parseISO(convocatoria.endDate), 'dd MMM', { locale: es })}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Clock className="h-4 w-4 text-blue-500"/>
                                            <div>
                                                <div className="font-semibold">Duración:</div>
                                                <div>{convocatoria.duration}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <p className="text-gray-700 mb-6 text-lg leading-relaxed line-clamp-3">{convocatoria.description}</p>

                            <div
                                className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                <div className="flex flex-wrap gap-3">
                                  <span
                                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2">
                                    {getModalidadTrabajoIcon(convocatoria.modalidadTrabajo)}
                                      {convocatoria.modalidadTrabajo}
                                  </span>
                                    <span
                                        className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        {convocatoria.duration}
                                    </span>
                                        <span
                                            className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                        {convocatoria.modalidadVinculacion}
                                        </span>
                                </div>

                                <div className="flex gap-3">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
                                            >
                                                <Eye className="h-5 w-5 mr-2"/>
                                                Ver detalles
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle
                                                    className="text-unimagdalena-primary">{convocatoria.title}
                                                </DialogTitle>
                                            </DialogHeader>

                                            {/* Inside dialog: Ver detalles */}
                                            <Tabs defaultValue="detalles" className="w-full">
                                                <TabsList className="grid w-full grid-cols-3">
                                                    <TabsTrigger value="detalles">Detalles</TabsTrigger>
                                                    <TabsTrigger value="aplicacion">Aplicación</TabsTrigger>
                                                    <TabsTrigger value="consejos">Consejos</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="detalles" className="space-y-6">
                                                    <div className="space-y-6">
                                                        <div className="flex flex-wrap gap-3">
                                                            <Badge
                                                                className={getStatusColor(convocatoria.status)}>
                                                                {convocatoria.status}
                                                            </Badge>
                                                            <Badge variant="outline"
                                                                   className={getTypeColor(convocatoria.type)}>
                                                                {convocatoria.type}
                                                            </Badge>
                                                            <Badge
                                                                variant="outline"
                                                                className={getModalidadVinculacionColor(convocatoria.modalidadVinculacion)}
                                                            >
                                                                {convocatoria.modalidadVinculacion}
                                                            </Badge>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <Building2 className="h-4 w-4 text-gray-500"/>
                                                                <span>
                                                                  <strong>Empresa:</strong> {convocatoria.company}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-gray-500"/>
                                                                <span>
                                                                  <strong>Ubicación:</strong> {convocatoria.location}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Users className="h-4 w-4 text-gray-500"/>
                                                                <span>
                                                                  <strong>Plazas:</strong> {convocatoria.vacancies}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4 text-gray-500"/>
                                                                <span>
                                                                  <strong>Duración:</strong> {convocatoria.duration}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <DollarSign className="h-4 w-4 text-gray-500"/>
                                                                <span>
                                                                  <strong>Remuneración:</strong> {convocatoria.remuneracionEconomica}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {getModalidadTrabajoIcon(convocatoria.modalidadTrabajo)}
                                                                <span>
                                                                  <strong>Modalidad:</strong> {convocatoria.modalidadTrabajo}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="h-4 w-4 text-gray-500"/>
                                                                <span>
                                                                  <strong>Programa Requerido:</strong> {convocatoria.programaRequerido}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4 text-gray-500"/>
                                                                <span>
                                                                      <strong>Inicio:</strong> {format(parseISO(convocatoria.startDate), 'dd MMM', { locale: es })}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4 text-gray-500"/>
                                                                <span>
                                                                  <strong>Cierre:</strong> {format(parseISO(convocatoria.endDate), 'dd MMM', { locale: es })}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold mb-2">Descripción</h4>
                                                            <p className="text-gray-600">{convocatoria.description}</p>
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold mb-2">Perfil Profesional Requerido</h4>
                                                            <p className="text-gray-600">{convocatoria.perfilProfesionalRequerido}</p>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Actividades a Desarrollar</h4>
                                                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                                {safeJsonParse(convocatoria.actividadesDesarrollarJson).map((actividad, index) => (
                                                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1"/>
                                                                        {actividad}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            {/* <h4 className="font-semibold mb-2">Actividades a Desarrollar</h4>
                                                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                                {convocatoria.actividadesDesarrollarJson.map((actividad, index) => (
                                                                    <li key={index}>{actividad}</li>
                                                                ))}
                                                            </ul>*/}
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Requisitos de Postulación</h4>
                                                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                                {safeJsonParse(convocatoria.requisitosVacanteJson).map((req, index) => (
                                                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                                                        <FileText className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1"/>
                                                                        {req}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        {/*
                                                        <div>
                                                            <h4 className="font-semibold mb-2">Requisitos de la Vacante</h4>
                                                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                                {convocatoria.requisitosVacante.map((req, index) => (
                                                                    <li key={index}>{req}</li>
                                                                ))}
                                                            </ul>
                                                        </div> */}
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="aplicacion" className="space-y-6">
                                                    <h4 className="text-xl font-bold text-gray-800 border-b pb-2">Proceso de Postulación</h4>
                                                    <div className={`p-4 rounded-xl ${convocatoria.tipoPostulacion === 'GEDOPRAC' ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} border-2`}>
                                                        <div className="flex items-center gap-2 font-bold text-lg mb-2">
                                                            <Award className="h-5 w-5"/>
                                                            <span className={convocatoria.tipoPostulacion === 'GEDOPRAC' ? 'text-blue-700' : 'text-orange-700'}>
                                                                        Postulación Vía: {convocatoria.tipoPostulacion}
                                                                    </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">
                                                            {convocatoria.tipoPostulacion === 'GEDOPRAC'
                                                                ? "El proceso se gestiona completamente a través de la plataforma GEDOPRAC de la Universidad."
                                                                : "Debe postularse directamente a través del enlace de la empresa."
                                                            }
                                                        </p>
                                                    </div>

                                                    <ol className="space-y-3 list-decimal pl-5">
                                                        {safeJsonParse(convocatoria.pasosPostulacionJson).map((paso, index) => (
                                                            <li key={index} className="text-gray-700 font-medium">
                                                                {paso}
                                                            </li>
                                                        ))}
                                                    </ol>

                                                    {/*<div>
                                                        <h4 className="font-semibold mb-2">Tipo de Postulación</h4>
                                                        <div className="p-4 bg-blue-50 rounded-lg">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <Briefcase className="h-5 w-5 text-blue-600"/>
                                                                <span className="font-medium text-blue-800">
                                                                  Postulación vía {convocatoria.tipoPostulacion}
                                                                </span>
                                                            </div>
                                                            <h5 className="font-semibold mb-2 text-blue-800">Pasos para postularse:</h5>
                                                            <ol className="list-decimal list-inside space-y-1 text-blue-700">
                                                                {convocatoria.pasosPostulacion.map((paso, index) => (
                                                                    <li key={index}>{paso}</li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                    </div>*/}
                                                </TabsContent>

                                                <TabsContent value="consejos" className="space-y-6">
                                                    <div className="p-6 bg-green-50 rounded-lg">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <Lightbulb className="h-6 w-6 text-green-600"/>
                                                            <h3 className="text-xl font-semibold text-green-800">Consejos para Aplicar</h3>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h4 className="font-semibold text-green-800 mb-2">Antes de aplicar:</h4>
                                                                <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                                                                    <li>Revisa cuidadosamente todos los requisitos</li>
                                                                    <li>Actualiza tu hoja de vida en GEDOPRAC</li>
                                                                    <li>Prepara todos los documentos necesarios</li>
                                                                </ul>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-green-800 mb-2">Durante la aplicación:</h4>
                                                                <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                                                                    <li>Sé específico en tu carta de motivación</li>
                                                                    <li>Destaca experiencias relevantes</li>
                                                                    <li>Aplica antes de la fecha límite</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabsContent>
                                            </Tabs>

                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    className="flex-1 bg-unimagdalena-primary hover:bg-unimagdalena-primary/90"
                                                    disabled={convocatoria.status === "Cerrada"}
                                                    onClick={() => window.open(convocatoria.enlacePostulacion, "_blank")}
                                                >
                                                    <ExternalLink className="h-4 w-4 mr-2"/>
                                                    {convocatoria.status === "Cerrada"
                                                        ? "Convocatoria Cerrada"
                                                        : `Postularse vía ${convocatoria.tipoPostulacion}`}
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    {convocatoria.status === "Activa" && (
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg font-semibold px-8"
                                            onClick={() => window.open(convocatoria.enlacePostulacion, "_blank")}
                                        >
                                            <ExternalLink className="h-5 w-5 mr-2"/>
                                            Postularse Ahora
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Control condicional: Convocatorias encontradas */}
            {filteredConvocatorias.length === 0 && (
                <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="text-center py-16">
                        <div className="space-y-6">
                            <div
                                className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                <Search className="h-12 w-12 text-gray-400"/>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-gray-900">No se encontraron convocatorias</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    No hay convocatorias que coincidan con tus criterios de búsqueda. Intenta ajustar
                                    los filtros o revisa
                                    más tarde.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    onClick={() => {
                                        setSearchTerm("")
                                        setStatusFilter("Todas")
                                        setTypeFilter("Todos")
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                                >
                                    Limpiar todos los filtros
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() =>
                                        window.open("https://gedoprac.unimagdalena.edu.co/auth/login?return=%2Fpages%2Fdashboard", "_blank")
                                    }
                                    className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold"
                                >
                                    <ExternalLink className="h-5 w-5 mr-2"/>
                                    Ver en GEDOPRAC
                                </Button>
                            </div>
                        </div>

                        {/* {convocatorias.length === 0 && !loading && (
                            <div className="text-center py-16">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                    No hay convocatorias disponibles actualmente
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Por favor, revisa más tarde o ponte en contacto con la Dirección de Prácticas.
                                </p>
                            </div>
                        )}*/ }
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
