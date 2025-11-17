"use client"

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Loader2, Plus, Edit, Trash2, Save, X, AlertTriangle, CheckCircle, Users, Clock, MapPin, Building2, FileText, Calendar, DollarSign, Globe, Monitor,
    Eye, ExternalLink, Briefcase, Lightbulb,
    Edit3,
    MessageSquare,
    Settings,
    Link,
    Code,
    Terminal,
    Code2,
    LayoutDashboard
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const GEDOPRAC_STEPS = JSON.stringify([
    "Ingresar a GEDOPRAC con usuario institucional",
    "Completar perfil profesional con información actualizada",
    "Postularse a la convocatoria específica dentro de la plataforma",
    "Cargar documentos requeridos (Ej: Hoja de vida, notas)",
    "Esperar la notificación del proceso de selección por parte de la OPPP",
]);

const EMPRESA_STEPS = JSON.stringify([
    "Visitar el enlace de postulación provisto por la empresa",
    "Crear o iniciar sesión en su plataforma de reclutamiento",
    "Llenar el formulario de aplicación o enviar CV/documentos solicitados",
    "Confirmar el envío de la postulación y estar atento al correo",
]);

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
    featured: boolean
    applicationCount: number
    successRate: number
}

const initialConvocatoriaState: Convocatoria = {
    id: 0,
    title: "Nueva Convocatoria",
    company: "Empresa de Prueba",
    type: "Practicas profesionales",
    status: "Activa",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    location: "Santa Marta, Colombia",
    vacancies: 5,
    description: "Esta es la descripción detallada de la nueva convocatoria en el sistema, mostrando todas las características y campos importantes.",
    requirementsJson: '["Ser estudiante activo", "Haber cursado el 70% de créditos"]',
    modality: "Tiempo completo",
    duration: "6 meses",
    modalidadVinculacion: "Acuerdo de Voluntades",
    remuneracionEconomica: "Sin remuneración",
    perfilProfesionalRequerido: "Estudiante de Ingeniería de Sistemas o Industrial con enfoque en análisis de datos.",
    actividadesDesarrollarJson: '["Análisis de datos de rendimiento", "Soporte técnico a usuarios", "Documentación de procesos"]',
    requisitosVacanteJson: '["Manejo avanzado de Excel", "Conocimiento básico de SQL"]',
    modalidadTrabajo: "Híbrido",
    programaRequerido: "Ingeniería de Sistemas",
    tipoPostulacion: "GEDOPRAC",
    enlacePostulacion: "https://ejemplo.com/postulacion",
    pasosPostulacionJson: GEDOPRAC_STEPS,
    perfilVacante: "Analista Junior",
    urgency: "Media",
    companyLogo: undefined,
    featured: false,
    applicationCount: 0,
    successRate: 0,
};

const parseJsonArray = (jsonString: string): string[] => {
    if (!jsonString || jsonString.trim() === "") return [];
    try {
        const parsed = JSON.parse(jsonString.trim());
        if (Array.isArray(parsed)) {
            return parsed.filter(item => typeof item === 'string' && item.length > 0);
        }
        if (typeof parsed === 'string') {
            return parsed.split('\n')
                .flatMap(line => line.split(','))
                .map(s => s.trim())
                .filter(s => s.length > 0);
        }
        return [];
    } catch (e) {
        return jsonString.split('\n')
            .flatMap(line => line.split(','))
            .map(s => s.trim())
            .filter(s => s.length > 0);
    }
};


const ConvocatoriasManager: React.FC = () => {
    // ESTADOS
    const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [isAdding, setIsAdding] = useState(false);
    const [newConvocatoria, setNewConvocatoria] = useState<Convocatoria>(initialConvocatoriaState);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Convocatoria | null>(null);

    const [selectedToDelete, setSelectedToDelete] = useState<number | null>(null);

    // URLs de la API
    const apiUrl = "http://localhost:5213/api/Convocatorias";
    const baseServerUrl = "http://localhost:5213";

    const fetchConvocatorias = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error("Fallo al cargar las convocatorias.");
            const data: Convocatoria[] = await res.json();
            setConvocatorias(data);
        } catch (err: any) {
            setError(err.message || "Error desconocido al cargar datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConvocatorias();
    }, []);

    const getFullImageUrl = (path: string | undefined) => {
        if (!path || path.trim() === "") return "/placeholder-company.png";
        if (path.startsWith('http')) {
            return path;
        }
        return `${baseServerUrl}${path}`;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Activa": return "bg-green-100 text-green-800 border-green-200"
            case "Cerrada": return "bg-red-100 text-red-800 border-red-200"
            default: return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Tutores": return "bg-purple-100 text-purple-800 border-purple-200"
            case "Practicas profesionales": return "bg-orange-100 text-orange-800 border-orange-200"
            case "Beca De Práctica Pofesional Institucional": return "bg-blue-100 text-blue-800 border-blue-200"
            default: return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getModalidadVinculacionColor = (modalidad: string) => {
        switch (modalidad) {
            case "Contrato de Aprendizaje SENA": return "bg-green-100 text-green-800 border-green-200"
            case "Acuerdo de Voluntades": return "bg-blue-100 text-blue-800 border-blue-200"
            case "Acto Administrativo": return "bg-purple-100 text-purple-800 border-purple-200"
            case "Contrato Laboral": return "bg-orange-100 text-orange-800 border-orange-200"
            default: return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getModalidadTrabajoIcon = (modalidad: string) => {
        switch (modalidad) {
            case "Presencial": return <Building2 className="h-4 w-4" />
            case "Remoto": return <Globe className="h-4 w-4" />
            case "Híbrido": return <Monitor className="h-4 w-4" />
            case "Virtual": return <Monitor className="h-4 w-4" />
            default: return <Building2 className="h-4 w-4" />
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Convocatoria, isEdit: boolean) => {
        const value = e.target.value;
        if (isEdit && editData) {
            setEditData(prev => ({ ...prev!, [field]: field === 'vacancies' || field === 'applicationCount' || field === 'successRate' ? parseInt(value) || 0 : value }));
        } else if (!isEdit) {
            setNewConvocatoria(prev => ({ ...prev, [field]: field === 'vacancies' || field === 'applicationCount' || field === 'successRate' ? parseInt(value) || 0 : value }));
        }
        setSuccess(null);
        setError(null);
    };

    const handleSelectChange = (value: string | boolean, field: keyof Convocatoria, isEdit: boolean) => {
        let updateFn: React.Dispatch<React.SetStateAction<Convocatoria>> | null = null;
        let currentData = isEdit ? editData : newConvocatoria;

        if (isEdit && editData) {
            updateFn = setEditData as React.Dispatch<React.SetStateAction<Convocatoria>>;
        } else if (!isEdit) {
            updateFn = setNewConvocatoria as React.Dispatch<React.SetStateAction<Convocatoria>>;
        }

        if (!updateFn || !currentData) return;

        const finalValue = typeof value === 'boolean' ? value : value;

        let newStepsJson = currentData.pasosPostulacionJson;

        if (field === 'tipoPostulacion' && typeof finalValue === 'string') {
            if (finalValue === 'GEDOPRAC') {
                newStepsJson = GEDOPRAC_STEPS;
            } else if (finalValue === 'Empresa') {
                newStepsJson = EMPRESA_STEPS;
            }
        }

        updateFn(prev => ({
            ...prev!,
            [field]: finalValue,
            ...(field === 'tipoPostulacion' ? { pasosPostulacionJson: newStepsJson } : {})
        }));

        setSuccess(null);
        setError(null);
    };

    const startEdit = (convocatoria: Convocatoria) => {
        setEditingId(convocatoria.id);
        setEditData({
            ...convocatoria,
            startDate: new Date(convocatoria.startDate).toISOString().split('T')[0],
            endDate: new Date(convocatoria.endDate).toISOString().split('T')[0],
        });
        setIsAdding(false);
        setError(null);
        setSuccess(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData(null);
        setError(null);
        setSuccess(null);
    };

    const handleAdd = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newConvocatoria),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Fallo al agregar: ${res.statusText}. Detalle: ${errorText}`);
            }

            setSuccess("Convocatoria agregada exitosamente.");
            setIsAdding(false);
            setNewConvocatoria(initialConvocatoriaState);
            await fetchConvocatorias();
        } catch (err: any) {
            setError(err.message || "Error desconocido al agregar.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!editData) return;
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/update/${editData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Fallo al actualizar: ${res.statusText}. Detalle: ${errorText}`);
            }

            setSuccess("Convocatoria actualizada exitosamente.");
            cancelEdit();
            await fetchConvocatorias();
        } catch (err: any) {
            setError(err.message || "Error desconocido al actualizar.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/delete/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Fallo al eliminar: ${res.statusText}. Detalle: ${errorText}`);
            }

            setSuccess("Convocatoria eliminada exitosamente.");
            await fetchConvocatorias();
        } catch (err: any) {
            setError(err.message || "Error desconocido al eliminar.");
        } finally {
            setLoading(false);
        }
    };

    const PreviewCard = ({ convocatoria }: { convocatoria: Convocatoria }) => {
        const logoUrl = getFullImageUrl(convocatoria.companyLogo);
        const placeholderDate = "Sin fecha";
        const formatVacancies = (vacancies: number) => vacancies > 0 ? `${vacancies} plazas` : "0 plazas";

        return (
            <Card className="shadow-2xl border-2 border-blue-500 bg-white min-w-full">
                <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="space-y-4 flex-1">
                            <div className="flex flex-wrap gap-3">
                                <Badge
                                    className={`${getStatusColor(convocatoria.status)} px-3 py-1 text-sm font-semibold`}
                                >
                                    {convocatoria.status || "Activa"}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={`${getTypeColor(convocatoria.type)} px-3 py-1 text-sm font-semibold`}
                                >
                                    {convocatoria.type || "Tipo"}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={`${getModalidadVinculacionColor(convocatoria.modalidadVinculacion)} px-3 py-1 text-sm font-semibold`}
                                >
                                    {convocatoria.modalidadVinculacion || "Vinculación"}
                                </Badge>
                            </div>

                            <div className="flex items-start justify-between">
                                <CardTitle className="text-2xl text-blue-900 flex-1">
                                    {convocatoria.title || "Título de la Convocatoria (Vista Previa)"}
                                </CardTitle>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-lg text-gray-600">
                                    <FileText className="h-4 w-4 text-green-500" />
                                    <span className="font-medium">Programa:</span>
                                    <span>{convocatoria.programaRequerido || "Programa Requerido"}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                                    <Building2 className="h-5 w-5 text-blue-500" />
                                    <span className="font-medium">{convocatoria.company || "Empresa"}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                                    <MapPin className="h-5 w-5 text-green-500" />
                                    <span className="font-medium">{convocatoria.location || "Ubicación"}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                                    <Users className="h-5 w-5 text-purple-500" />
                                    <span className="font-medium">{formatVacancies(convocatoria.vacancies)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 min-w-[200px]">
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-4 w-4 text-orange-500" />
                                    <div>
                                        <div className="font-semibold">Fecha publicación:</div>
                                        <div>{convocatoria.startDate ? new Date(convocatoria.startDate).toLocaleDateString("es-ES") : placeholderDate}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-4 w-4 text-red-500" />
                                    <div>
                                        <div className="font-semibold">Cierre Convocatoria:</div>
                                        <div>{convocatoria.endDate ? new Date(convocatoria.endDate).toLocaleDateString("es-ES") : placeholderDate}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="font-semibold">Duración:</div>
                                        <div>{convocatoria.duration || "Duración"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed line-clamp-3">
                        {convocatoria.description || "Descripción (3 líneas máximo en la vista de tarjeta)."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2">
                                {getModalidadTrabajoIcon(convocatoria.modalidadTrabajo)}
                                {convocatoria.modalidadTrabajo || "Modalidad"}
                            </span>
                            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                {convocatoria.remuneracionEconomica || "Remuneración"}
                            </span>
                            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                {convocatoria.modalidadVinculacion || "Vinculación"}
                            </span>
                        </div>

                        <div className="flex gap-3 mt-4 sm:mt-0">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
                                    >
                                        <Eye className="h-5 w-5 mr-2" />
                                        Ver detalles (Vista Previa)
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle
                                            className="text-2xl font-bold text-blue-800">{convocatoria.title || "Título Convocatoria"}
                                        </DialogTitle>
                                    </DialogHeader>

                                    <Tabs defaultValue="detalles" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="detalles">Detalles</TabsTrigger>
                                            <TabsTrigger value="aplicacion">Aplicación</TabsTrigger>
                                            <TabsTrigger value="consejos">Consejos</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="detalles" className="space-y-6">
                                            <div className="space-y-6">
                                                <div className="flex flex-wrap gap-3">
                                                    <Badge className={getStatusColor(convocatoria.status)}>{convocatoria.status}</Badge>
                                                    <Badge variant="outline" className={getTypeColor(convocatoria.type)}>{convocatoria.type}</Badge>
                                                    <Badge variant="outline" className={getModalidadVinculacionColor(convocatoria.modalidadVinculacion)}>{convocatoria.modalidadVinculacion}</Badge>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            <strong>Empresa:</strong> {convocatoria.company || "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            <strong>Ubicación:</strong> {convocatoria.location || "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            <strong>Plazas:</strong> {convocatoria.vacancies || 0}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            <strong>Duración:</strong> {convocatoria.duration || "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            <strong>Remuneración:</strong> {convocatoria.remuneracionEconomica || "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {getModalidadTrabajoIcon(convocatoria.modalidadTrabajo)}
                                                        <span>
                                                            <strong>Modalidad:</strong> {convocatoria.modalidadTrabajo || "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            <strong>Programa Requerido:</strong> {convocatoria.programaRequerido || "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            <strong>Inicio:</strong> {convocatoria.startDate ? new Date(convocatoria.startDate).toLocaleDateString("es-ES") : "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-gray-500" />
                                                        <span>
                                                            <strong>Cierre:</strong> {convocatoria.endDate ? new Date(convocatoria.endDate).toLocaleDateString("es-ES") : "N/A"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-2">Descripción</h4>
                                                    <p className="text-gray-600">{convocatoria.description || "Sin descripción."}</p>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-2">Perfil Profesional Requerido</h4>
                                                    <p className="text-gray-600">{convocatoria.perfilProfesionalRequerido || "Sin perfil requerido."}</p>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-2">Actividades a Desarrollar</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                        {parseJsonArray(convocatoria.actividadesDesarrollarJson).map((actividad, index) => (
                                                            <li key={index}>{actividad}</li>
                                                        ))}
                                                        {parseJsonArray(convocatoria.actividadesDesarrollarJson).length === 0 && <li>Sin actividades a desarrollar.</li>}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-2">Requisitos de la Vacante</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                        {parseJsonArray(convocatoria.requisitosVacanteJson).map((req, index) => (
                                                            <li key={index}>{req}</li>
                                                        ))}
                                                        {parseJsonArray(convocatoria.requisitosVacanteJson).length === 0 && <li>Sin requisitos de la vacante.</li>}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-2">Requisitos Generales</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                        {parseJsonArray(convocatoria.requirementsJson).map((req, index) => (
                                                            <li key={index}>{req}</li>
                                                        ))}
                                                        {parseJsonArray(convocatoria.requirementsJson).length === 0 && <li>Sin requisitos generales.</li>}
                                                    </ul>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="aplicacion" className="space-y-6">
                                            <div>
                                                <h4 className="font-semibold mb-2">Tipo de Postulación</h4>
                                                <div className="p-4 bg-blue-50 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Briefcase className="h-5 w-5 text-blue-600" />
                                                        <span className="font-medium text-blue-800">
                                                            Postulación vía {convocatoria.tipoPostulacion || "N/A"}
                                                        </span>
                                                    </div>
                                                    <h5 className="font-semibold mb-2 text-blue-800">Pasos para postularse:</h5>
                                                    <ol className="list-decimal list-inside space-y-1 text-blue-700">
                                                        {parseJsonArray(convocatoria.pasosPostulacionJson).map((paso, index) => (
                                                            <li key={index}>{paso}</li>
                                                        ))}
                                                        {parseJsonArray(convocatoria.pasosPostulacionJson).length === 0 && <li>Sin pasos de postulación definidos.</li>}
                                                    </ol>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="consejos" className="space-y-6">
                                            <div className="p-6 bg-green-50 rounded-lg">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Lightbulb className="h-6 w-6 text-green-600" />
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
                                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                                            disabled={true} // Deshabilitado en el Manager
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Postularse Ahora (Deshabilitado en Manager)
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Button size="lg" disabled className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg font-semibold px-8">
                                <ExternalLink className="h-5 w-5 mr-2" />
                                Postularse Ahora
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    const ConvocatoriaForm = useMemo(() => (data: Convocatoria, isEdit: boolean) => {
        const currentData = isEdit ? editData : newConvocatoria;
        if (!currentData) return null;

        const formHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleChange(e, e.target.id as keyof Convocatoria, isEdit);

        // --- ASUME LA IMPORTACIÓN DE TABS ---
        // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
        // --- ASUME LA IMPORTACIÓN DE NUEVOS ICONOS ---
        // import { LayoutDashboard, Settings, Code2, Terminal, Eye } from "lucide-react"

        return (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">

                {/* --- CONTENEDOR DEL FORMULARIO (AHORA CON TABS) --- */}
                <div className="lg:col-span-3">
                    <Card className="shadow-2xl border-2 overflow-hidden">
                        {/* Encabezado Fijo (igual que antes) */}
                        <div className="bg-gradient-to-r from-slate-50 to-gray-50">
                            <CardHeader className="border-b-2 border-gray-200">
                                <CardTitle className="text-2xl flex items-center gap-3">
                                    {isEdit ? (
                                        <>
                                            <div className="p-2 bg-amber-100 rounded-lg">
                                                <Edit3 className="h-6 w-6 text-amber-600" />
                                            </div>
                                            <span className="text-amber-700">Editar Convocatoria</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Plus className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <span className="text-blue-700">Nueva Convocatoria</span>
                                        </>
                                    )}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {isEdit
                                        ? "Modifique los campos necesarios y guarde los cambios"
                                        : "Complete el formulario para agregar una nueva convocatoria"}
                                </CardDescription>
                            </CardHeader>
                        </div>

                        {/* Contenido del Formulario con NAVEGACIÓN POR PESTAÑAS */}
                        <CardContent className="pt-6"> {/* Ajustado el padding superior */}
                            <Tabs defaultValue="step1" className="w-full">

                                {/* NAVEGACIÓN DE PESTAÑAS MEJORADA */}
                                <TabsList className="grid w-full grid-cols-3 h-16 p-2 bg-gray-100 rounded-lg mb-6 shadow-inner">
                                    <TabsTrigger value="step1" className="h-full text-base font-semibold flex items-center gap-2 rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600">
                                        <LayoutDashboard className="h-5 w-5" />
                                        Paso 1: Esencial
                                    </TabsTrigger>
                                    <TabsTrigger value="step2" className="h-full text-base font-semibold flex items-center gap-2 rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600">
                                        <Settings className="h-5 w-5" />
                                        Paso 2: Detalles
                                    </TabsTrigger>
                                    <TabsTrigger value="step3" className="h-full text-base font-semibold flex items-center gap-2 rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600">
                                        <Code2 className="h-5 w-5" />
                                        Paso 3: Contenido
                                    </TabsTrigger>
                                </TabsList>

                                {/* --- PESTAÑA 1: INFORMACIÓN ESENCIAL --- */}
                                <TabsContent value="step1">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <FileText className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <h3 className="font-bold text-xl text-blue-900">Información Principal</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 shadow-inner">
                                            {/* Título */}
                                            <div className="space-y-2">
                                                <Label htmlFor="title" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                    Título de la Convocatoria <span className="text-red-500 text-lg">*</span>
                                                </Label>
                                                <Input id="title" value={currentData.title} onChange={formHandleChange} required className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200" />
                                            </div>
                                            {/* Empresa */}
                                            <div className="space-y-2">
                                                <Label htmlFor="company" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                    Empresa / Institución <span className="text-red-500 text-lg">*</span>
                                                </Label>
                                                <Input id="company" value={currentData.company} onChange={formHandleChange} required className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200" />
                                            </div>
                                            {/* Vacantes */}
                                            <div className="space-y-2">
                                                <Label htmlFor="vacancies" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                    Vacantes <span className="text-red-500 text-lg">*</span>
                                                </Label>
                                                <Input id="vacancies" type="number" value={currentData.vacancies} onChange={formHandleChange} required className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200" />
                                            </div>
                                            {/* Ubicación */}
                                            <div className="space-y-2">
                                                <Label htmlFor="location" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                    Ubicación <span className="text-red-500 text-lg">*</span>
                                                </Label>
                                                <Input id="location" value={currentData.location} onChange={formHandleChange} required className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200" />
                                            </div>
                                            {/* Fecha Inicio */}
                                            <div className="space-y-2">
                                                <Label htmlFor="startDate" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                    Fecha de Inicio <span className="text-red-500 text-lg">*</span>
                                                </Label>
                                                <Input id="startDate" type="date" value={currentData.startDate} onChange={formHandleChange} required className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200" />
                                            </div>
                                            {/* Fecha Cierre */}
                                            <div className="space-y-2">
                                                <Label htmlFor="endDate" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                    Fecha de Cierre <span className="text-red-500 text-lg">*</span>
                                                </Label>
                                                <Input id="endDate" type="date" value={currentData.endDate} onChange={formHandleChange} required className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200" />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* --- PESTAÑA 2: DETALLES Y CONFIGURACIÓN --- */}
                                <TabsContent value="step2">
                                    <div className="space-y-8">
                                        {/* --- Sección Descripción y Perfil --- */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <MessageSquare className="h-6 w-6 text-purple-600" />
                                                </div>
                                                <h3 className="font-bold text-xl text-purple-900">Descripción y Perfil</h3>
                                            </div>
                                            <div className="space-y-6 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 shadow-inner">
                                                <div className="space-y-2">
                                                    <Label htmlFor="description" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                        Descripción <span className="text-red-500 text-lg">*</span>
                                                    </Label>
                                                    <Textarea id="description" value={currentData.description} onChange={formHandleChange} rows={3} required className="resize-none text-base border-2 focus:border-purple-400 focus:ring-2 focus:ring-purple-200" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="perfilProfesionalRequerido" className="flex items-center gap-2 text-base font-semibold text-gray-700">Perfil Profesional Requerido</Label>
                                                    <Textarea id="perfilProfesionalRequerido" value={currentData.perfilProfesionalRequerido} onChange={formHandleChange} rows={2} className="resize-none text-base border-2 focus:border-purple-400 focus:ring-2 focus:ring-purple-200" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- Sección Configuración y Opciones --- */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-teal-100 rounded-lg">
                                                    <Settings className="h-6 w-6 text-teal-600" />
                                                </div>
                                                <h3 className="font-bold text-xl text-teal-900">Configuración y Opciones</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl border-2 border-teal-200 shadow-inner">
                                                {/* Tipo */}
                                                <div className="space-y-2">
                                                    <Label className="text-base font-semibold text-gray-700">Tipo</Label>
                                                    <Select value={currentData.type} onValueChange={(v) => handleSelectChange(v, 'type', isEdit)}>
                                                        <SelectTrigger className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Practicas profesionales">Prácticas Profesionales</SelectItem>
                                                            <SelectItem value="Beca De Práctica Pofesional Institucional">Beca Institucional</SelectItem>
                                                            <SelectItem value="Tutores">Tutores</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {/* Status */}
                                                <div className="space-y-2">
                                                    <Label className="text-base font-semibold text-gray-700">Status</Label>
                                                    <Select value={currentData.status} onValueChange={(v) => handleSelectChange(v, 'status', isEdit)}>
                                                        <SelectTrigger className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Activa">Activa</SelectItem>
                                                            <SelectItem value="Cerrada">Cerrada</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {/* Modalidad Trabajo */}
                                                <div className="space-y-2">
                                                    <Label className="text-base font-semibold text-gray-700">Modalidad de Trabajo</Label>
                                                    <Select value={currentData.modalidadTrabajo} onValueChange={(v) => handleSelectChange(v, 'modalidadTrabajo', isEdit)}>
                                                        <SelectTrigger className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Presencial">Presencial</SelectItem>
                                                            <SelectItem value="Remoto">Remoto</SelectItem>
                                                            <SelectItem value="Híbrido">Híbrido</SelectItem>
                                                            <SelectItem value="Virtual">Virtual</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {/* Destacada */}
                                                <div className="space-y-2">
                                                    <Label className="text-base font-semibold text-gray-700">Destacada</Label>
                                                    <Select value={currentData.featured.toString()} onValueChange={(v) => handleSelectChange(v === 'true', 'featured', isEdit)}>
                                                        <SelectTrigger className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Sí</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {/* Tipo Postulación */}
                                                <div className="space-y-2">
                                                    <Label className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                        Tipo Postulación <span className="text-red-500 text-lg">*</span>
                                                    </Label>
                                                    <Select value={currentData.tipoPostulacion} onValueChange={(v) => handleSelectChange(v, 'tipoPostulacion', isEdit)}>
                                                        <SelectTrigger className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="GEDOPRAC">GEDOPRAC</SelectItem>
                                                            <SelectItem value="Empresa">Empresa (Link Externo)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {/* Modalidad Vinculación */}
                                                <div className="space-y-2">
                                                    <Label className="text-base font-semibold text-gray-700">Modalidad Vinculación</Label>
                                                    <Select value={currentData.modalidadVinculacion} onValueChange={(v) => handleSelectChange(v, 'modalidadVinculacion', isEdit)}>
                                                        <SelectTrigger className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Contrato de Aprendizaje SENA">Contrato de Aprendizaje SENA</SelectItem>
                                                            <SelectItem value="Acuerdo de Voluntades">Acuerdo de Voluntades</SelectItem>
                                                            <SelectItem value="Acto Administrativo">Acto Administrativo</SelectItem>
                                                            <SelectItem value="Contrato Laboral">Contrato Laboral</SelectItem>
                                                            <SelectItem value="Sin Vinculación">Sin Vinculación</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- Sección Remuneración y Enlaces --- */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-amber-100 rounded-lg">
                                                    <Link className="h-6 w-6 text-amber-600" />
                                                </div>
                                                <h3 className="font-bold text-xl text-amber-900">Remuneración y Enlaces</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 shadow-inner">
                                                <div className="space-y-2">
                                                    <Label htmlFor="remuneracionEconomica" className="flex items-center gap-2 text-base font-semibold text-gray-700">Remuneración Económica</Label>
                                                    <Input id="remuneracionEconomica" value={currentData.remuneracionEconomica} onChange={formHandleChange} placeholder="Ej: $1.200.000" className="h-12 text-base border-2 focus:border-amber-400 focus:ring-2 focus:ring-amber-200" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="enlacePostulacion" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                                        Enlace de Postulación <span className="text-red-500 text-lg">*</span>
                                                    </Label>
                                                    <Input id="enlacePostulacion" value={currentData.enlacePostulacion} onChange={formHandleChange} placeholder="https://..." required className="h-12 text-base border-2 focus:border-amber-400 focus:ring-2 focus:ring-amber-200" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label htmlFor="companyLogo" className="flex items-center gap-2 text-base font-semibold text-gray-700">URL/Ruta Logo Empresa</Label>
                                                    <Input id="companyLogo" value={currentData.companyLogo || ''} onChange={formHandleChange} placeholder="/uploads/logo.png o https://..." className="h-12 text-base border-2 focus:border-amber-400 focus:ring-2 focus:ring-amber-200" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* --- PESTAÑA 3: CONTENIDO DETALLADO (JSON) --- */}
                                <TabsContent value="step3">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gray-100 rounded-lg">
                                                <Code className="h-6 w-6 text-gray-600" />
                                            </div>
                                            <h3 className="font-bold text-xl text-gray-900">Contenido Detallado (JSON)</h3>
                                        </div>

                                        {/* Helper Box de JSON Mejorado */}
                                        <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-inner">
                                            <div className="p-2 bg-white rounded-lg shadow-inner flex-shrink-0">
                                                <Terminal className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-lg text-purple-900">Formato de Listas</h5>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Ingresa elementos separados por comas (Ej: `item 1, item 2`) o como un array JSON (Ej: `["item 1", "item 2"]`).
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-6 pt-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="requirementsJson" className="text-base font-semibold text-gray-700">Requisitos Generales</Label>
                                                <Textarea id="requirementsJson" value={currentData.requirementsJson} onChange={formHandleChange} rows={2} className="resize-none text-base border-2 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 font-mono" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="actividadesDesarrollarJson" className="text-base font-semibold text-gray-700">Actividades a Desarrollar</Label>
                                                <Textarea id="actividadesDesarrollarJson" value={currentData.actividadesDesarrollarJson} onChange={formHandleChange} rows={2} className="resize-none text-base border-2 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 font-mono" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="requisitosVacanteJson" className="text-base font-semibold text-gray-700">Requisitos de la Vacante</Label>
                                                <Textarea id="requisitosVacanteJson" value={currentData.requisitosVacanteJson} onChange={formHandleChange} rows={2} className="resize-none text-base border-2 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 font-mono" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pasosPostulacionJson" className="text-base font-semibold text-gray-700">Pasos de Postulación</Label>
                                                <Textarea id="pasosPostulacionJson" value={currentData.pasosPostulacionJson} onChange={formHandleChange} rows={4} className="resize-none text-base border-2 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 font-mono" />
                                                <p className="text-xs text-gray-500">*Se autocompleta con el Tipo Postulación*</p>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* --- SECCIÓN DE BOTONES FIJA (FUERA DE LAS TABS) --- */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8 border-t-2 mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={isEdit ? cancelEdit : () => setIsAdding(false)}
                                    disabled={loading}
                                    className="h-12 px-6 text-base font-semibold hover:bg-gray-100 bg-transparent"
                                >
                                    <X className="h-5 w-5 mr-2" />
                                    Cancelar
                                </Button>
                                <Button
                                    type="button"
                                    onClick={isEdit ? handleUpdate : handleAdd}
                                    disabled={loading}
                                    className="h-12 px-8 text-base font-semibold sm:min-w-[240px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            {isEdit ? "Guardar Cambios" : "Crear Convocatoria"}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* --- CONTENEDOR DE LA VISTA PREVIA (CON ESTILO MEJORADO) --- */}
                <div className="lg:col-span-2 lg:sticky lg:top-8 self-start">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-4">
                        Vista Previa
                    </h3>
                    <PreviewCard convocatoria={currentData} />

                    {/* Alerta de "info" MEJORADA */}
                    <div className="mt-6 p-4 rounded-xl border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-inner flex-shrink-0">
                                <Eye className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-900 text-base">Vista Previa Dinámica</h4>
                                <p className="text-sm text-blue-800 mt-1">
                                    Vista previa en tiempo real de cómo se visualizará la convocatoria en el sitio web.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [editData, newConvocatoria, loading]);

    return (
        <Card className="shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                    <Users className="h-6 w-6" /> Gestión de Convocatorias
                </CardTitle>
                <Button onClick={() => { setIsAdding(true); setEditingId(null); setNewConvocatoria(initialConvocatoriaState); }} disabled={isAdding || editingId !== null} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-5 w-5 mr-2" />
                    Nueva Convocatoria
                </Button>
            </CardHeader>
            <CardContent>
                {success && (
                    <div className="mb-4 bg-green-100 border-green-400 text-green-700 p-3 rounded flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-4 bg-red-100 border-red-400 text-red-700 p-3 rounded flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        {error}
                    </div>
                )}

                {(isAdding || editingId !== null) && (
                    <div className="mb-8">
                        {ConvocatoriaForm(editingId !== null && editData ? editData : newConvocatoria, editingId !== null)}
                    </div>
                )}

                <div className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 text-gray-700">Lista de Convocatorias ({convocatorias.length})</h3>
                    {loading && !isAdding && editingId === null ? (
                        <div className="text-center py-8 text-gray-500 flex justify-center items-center">
                            <Loader2 className="h-6 w-6 mr-2 animate-spin" /> Cargando convocatorias...
                        </div>
                    ) : convocatorias.length === 0 && !isAdding ? (
                        <div className="text-center py-8 text-gray-500">No hay convocatorias registradas.</div>
                    ) : (
                        convocatorias.map((convocatoria) => (
                            convocatoria.id === editingId && editData ? null : (
                                <Card key={convocatoria.id} className="border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 flex justify-between items-center">
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className="h-12 w-12 rounded-full border border-gray-300 p-2 flex items-center justify-center bg-white shadow-sm">
                                                <Building2 className="h-7 w-7 text-blue-500" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-lg font-bold text-blue-800 truncate">{convocatoria.title}</p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {convocatoria.company} - {convocatoria.location}
                                                </p>
                                                <div className="flex flex-wrap gap-2 text-xs mt-1">
                                                    <Badge className={getStatusColor(convocatoria.status)}>
                                                        {convocatoria.status}
                                                    </Badge>
                                                    <Badge variant="outline" className="bg-gray-200 text-gray-800">
                                                        {convocatoria.type}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-blue-600 border-blue-200 flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        Cierre: {new Date(convocatoria.endDate).toLocaleDateString()}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="icon" onClick={() => startEdit(convocatoria)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => setSelectedToDelete(convocatoria.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        ))
                    )}
                </div>
            </CardContent>

            <AlertDialog
                open={!!selectedToDelete}
                onOpenChange={(open) => {
                    if (!open) setSelectedToDelete(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <AlertDialogTitle className="text-xl font-semibold text-red-600">
                                Confirmar Eliminación
                            </AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-base leading-relaxed">
                            ¿Estás seguro de que deseas eliminar esta convocatoria? Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="gap-2 sm:gap-2">
                        <AlertDialogCancel onClick={() => setSelectedToDelete(null)}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (selectedToDelete) handleDelete(selectedToDelete);
                                setSelectedToDelete(null);
                            }}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default ConvocatoriasManager;