"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Award, BarChart3, Briefcase, Building2, Check, CheckCircle, ChevronLeft, ChevronRight, Clock, ExternalLink, Eye, FileCheck, FileText, Gavel, Globe, GraduationCap, Info, KeyRound, Mail, Phone, Play, RefreshCcwDot, RotateCcw, Search, Upload, UploadCloud, User, UserCheck, UserCog, UserPlus, Users, X, Lock } from "lucide-react";
import { useState } from "react";

const GedopracTutorialComponent: React.FC = () => {
    const [showTutorial, setShowTutorial] = useState(false)
    const [tutorialStep, setTutorialStep] = useState(0)

    const tutorialSteps = [
        {
            id: 0,
            title: "Bienvenido a GEDOPRAC",
            subtitle: "Sistema de Información Web para Gestión de Prácticas Profesionales",
            icon: <Building2 className="h-12 w-12 text-white" />,
            color: "from-green-500 to-green-700",
            content: (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                            <Building2 className="h-16 w-16 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ¡Bienvenido a GEDOPRAC!
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Sistema de gestión ágil y completa para prácticas profesionales
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="font-bold text-green-800 text-lg">¿Qué es GEDOPRAC?</h4>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Es un aplicativo web desarrollado para permitir realizar de manera ágil todo el proceso de prácticas
                                profesionales donde interactúan todos los roles involucrados: estudiantes, empresas, tutores, enlaces de
                                facultad y directivos universitarios.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Globe className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="font-bold text-blue-800 text-lg">Sostenibilidad Digital</h4>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Este sistema reduce el uso de papel y fortalece los servicios digitales, permitiendo desarrollar todas
                                las actividades sin requerir documentación física.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {[
                            { icon: <FileCheck className="h-8 w-8" />, label: "Gestión Digital", color: "purple" },
                            { icon: <Users className="h-8 w-8" />, label: "Múltiples Roles", color: "orange" },
                            { icon: <Clock className="h-8 w-8" />, label: "Proceso Ágil", color: "cyan" },
                            { icon: <CheckCircle className="h-8 w-8" />, label: "Seguimiento Total", color: "pink" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-5 bg-${item.color}-50 rounded-xl text-center transform hover:scale-105 transition-all shadow-sm hover:shadow-md border border-${item.color}-200`}
                            >
                                <div className={`text-${item.color}-600 mx-auto mb-3`}>{item.icon}</div>
                                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">💡</span>
                            </div>
                            <h4 className="font-bold text-yellow-800 text-lg">Beneficios Clave</h4>
                        </div>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <span>Reducción de tiempos de gestión en un 70%</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <span>Seguimiento en tiempo real de todos los procesos</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <span>Comunicación directa entre todos los actores</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <span>Archivo digital de toda la documentación</span>
                            </li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            id: 1,
            title: "Registro de Empresa",
            subtitle: "Paso 1: Cree su cuenta empresarial",
            icon: <UserPlus className="h-12 w-12 text-white" />,
            color: "from-blue-500 to-cyan-500",
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-100 p-8 rounded-xl border-2 border-blue-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <FileText className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-blue-800 text-2xl">Información Esencial para el Registro</h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Para registrar su empresa y comenzar a interactuar con el ecosistema de talento universitario, tenga a
                            mano la siguiente documentación e información clave:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                            <h5 className="font-bold text-gray-800 mb-3 text-xl">1. Datos Generales de la Empresa</h5>
                            <ul className="text-gray-600 space-y-2 ml-5 text-base">
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    N.I.T (Número de Identificación Tributaria)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    Razón Social y Tipo de Empresa
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    Números de contacto, página web y correo electrónico institucional
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    Dirección completa (País, Departamento, Municipio, Dirección física)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    Tipo de contribuyente y Régimen fiscal
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    Sector Económico y Código CIIU (Clasificación Industrial Internacional Uniforme)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    Cámara de Comercio actualizada (Formato PDF, tamaño máximo 2 MB)
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
                            <h5 className="font-bold text-gray-800 mb-3 text-xl">2. Datos del Representante Legal / Jefe de RRHH</h5>
                            <ul className="text-gray-600 space-y-2 ml-5 text-base">
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                    Tipo y número de documento de identidad
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                    Nombres y Apellidos completos
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                    Correo electrónico institucional (será su usuario de acceso principal)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                    Número de celular de contacto
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300 shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                                <AlertCircle className="h-7 w-7 text-white" />
                            </div>
                            <h4 className="font-bold text-yellow-800 text-lg">Proceso de Validación y Notificación</h4>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="text-center md:text-left">
                                <p className="text-yellow-700 leading-relaxed text-base">
                                    Al finalizar el registro, complete el desafío <strong className="font-bold">reCAPTCHA</strong>.
                                    Recibirá un correo electrónico confirmando la recepción de su solicitud.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                    <Clock className="h-8 w-8 text-yellow-500" />
                                </div>
                                <p className="text-yellow-700 font-semibold text-base">
                                    Validación en <br />
                                    <strong className="font-bold">2-3 días hábiles</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            title: "Acceso al Sistema",
            subtitle: "Paso 2: Ingrese con sus credenciales",
            icon: <FileCheck className="h-12 w-12 text-white" />,
            color: "from-blue-500 to-indigo-500",
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-8 rounded-xl border-2 border-green-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Lock className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-green-800 text-2xl">Sus Credenciales de Acceso</h4>
                        </div>
                        <p className="text-green-700 leading-relaxed text-lg">
                            Utilice la siguiente información para acceder al portal GEDOPRAC y gestionar sus procesos de práctica
                            profesional:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="h-7 w-7 text-green-600" />
                                <h5 className="font-bold text-gray-800 text-xl">Usuario</h5>
                            </div>
                            <p className="text-gray-600 mb-3 text-base">
                                Su nombre de usuario es el <strong>correo electrónico</strong> que registró para el representante legal
                                o jefe de RRHH.
                            </p>
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-dashed border-green-300 text-sm font-mono text-green-700 text-center">
                                ejemplo: rrhh@suempresa.com
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <KeyRound className="h-7 w-7 text-purple-600" />
                                <h5 className="font-bold text-gray-800 text-xl">Contraseña Inicial</h5>
                            </div>
                            <p className="text-gray-600 mb-3 text-base">
                                Su contraseña inicial corresponde al <strong>número de documento</strong> del representante legal o jefe
                                de RRHH, tal como fue registrado.
                            </p>
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-dashed border-purple-300 text-sm font-mono text-purple-700 text-center">
                                ejemplo: 1234567890
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <RefreshCcwDot className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-blue-800 text-2xl">¡Importante! Cambio de Contraseña</h4>
                        </div>
                        <p className="text-blue-700 leading-relaxed text-lg">
                            Al iniciar sesión por primera vez, el sistema le solicitará
                            <strong>obligatoriamente cambiar su contraseña</strong> por motivos de seguridad. Elija una contraseña
                            fuerte, que combine mayúsculas, minúsculas, números y símbolos, y que sea fácil de recordar para usted.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border-2 border-dashed border-gray-300 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-5 text-center text-xl">Flujo de Acceso al Sistema</h5>
                        <div className="flex items-center justify-between">
                            <div className="text-center flex-1">
                                <div className="w-12 h-12 bg-green-500 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg transform hover:scale-110 transition-transform">
                                    1
                                </div>
                                <p className="text-sm text-gray-600">Ingrese Usuario y Contraseña</p>
                            </div>
                            <ChevronRight className="h-6 w-6 text-gray-400" />
                            <div className="text-center flex-1">
                                <div className="w-12 h-12 bg-orange-500 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg transform hover:scale-110 transition-transform">
                                    2
                                </div>
                                <p className="text-sm text-gray-600">Cambie su Contraseña</p>
                            </div>
                            <ChevronRight className="h-6 w-6 text-gray-400" />
                            <div className="text-center flex-1">
                                <div className="w-12 h-12 bg-purple-500 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg transform hover:scale-110 transition-transform">
                                    3
                                </div>
                                <p className="text-sm text-gray-600">Acceda a su Panel Principal</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-xl text-center border-l-4 border-indigo-500 shadow-sm">
                        <p className="text-indigo-700 font-semibold text-base">
                            URL Oficial de Acceso:
                            <a
                                href="https://gedoprac.unimagdalena.edu.co/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 underline hover:text-indigo-800 font-bold"
                            >
                                https://gedoprac.unimagdalena.edu.co/
                            </a>
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            title: "Página Principal",
            subtitle: "Panel de control empresarial",
            icon: <Building2 className="h-12 w-12 text-white" />,
            color: "from-blue-500 to-indigo-500",
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 rounded-xl shadow-xl">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                                <Building2 className="h-10 w-10" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold mb-2">Bienvenido a su Panel de Control</h3>
                                <p className="text-lg opacity-80">
                                    Explore los módulos disponibles y gestione eficientemente sus procesos de práctica profesional.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                                    <FileCheck className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="font-bold text-green-800 text-xl">Módulo de Convenios</h4>
                            </div>
                            <p className="text-green-700 leading-relaxed">
                                Gestione y supervise el estado de los convenios institucionales suscritos entre su empresa y la
                                Universidad.
                            </p>
                        </div>

                        <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                                    <Briefcase className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="font-bold text-blue-800 text-xl">Módulo de Vacantes</h4>
                            </div>
                            <p className="text-blue-700 leading-relaxed">
                                Cree, publique y administre ofertas de práctica profesional para atraer el talento que su organización
                                necesita.
                            </p>
                        </div>

                        <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-md">
                                    <Users className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="font-bold text-purple-800 text-xl">Módulo de Tutores</h4>
                            </div>
                            <p className="text-purple-700 leading-relaxed">
                                Registre y asigne tutores empresariales para supervisar el desarrollo de las prácticas de los
                                estudiantes.
                            </p>
                        </div>

                        <div className="p-6 bg-orange-50 rounded-xl border-l-4 border-orange-500 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
                                    <GraduationCap className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="font-bold text-orange-800 text-xl">Módulo de Practicantes</h4>
                            </div>
                            <p className="text-orange-700 leading-relaxed">
                                Consulte el listado de estudiantes en práctica activa y realice el seguimiento de sus avances y
                                documentación.
                            </p>
                        </div>

                        <div className="p-6 bg-cyan-50 rounded-xl border-l-4 border-cyan-500 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                                    <Search className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="font-bold text-cyan-800 text-xl">Gestión de Postulaciones</h4>
                            </div>
                            <p className="text-cyan-700 leading-relaxed">
                                Revise las hojas de vida de los postulantes a sus vacantes y seleccione a los candidatos ideales para
                                sus prácticas.
                            </p>
                        </div>

                        <div className="p-6 bg-red-50 rounded-xl border-l-4 border-red-500 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-md">
                                    <User className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="font-bold text-red-800 text-xl">Mi Perfil Empresarial</h4>
                            </div>
                            <p className="text-red-700 leading-relaxed">
                                Actualice la información de su empresa, datos de contacto y perfiles de usuario para garantizar una
                                gestión eficiente.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-xl border-2 border-dashed border-gray-300 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center shadow-md">
                                <Info className="h-7 w-7 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-800 text-2xl">Acceso a su Perfil de Usuario</h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            En la esquina superior derecha de su pantalla, encontrará su nombre de usuario y un ícono representativo.
                            Al hacer clic sobre él, podrá acceder a las opciones de su perfil, editar información relevante y cerrar
                            sesión de forma segura cuando lo requiera.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 4,
            title: "Módulo Convenios",
            subtitle: "Gestión de documentos del convenio",
            icon: <FileText className="h-12 w-12 text-white" />,
            color: "from-indigo-500 to-blue-500",
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <FileText className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-indigo-800 text-2xl">Estados y Documentación del Convenio</h4>
                        </div>
                        <p className="text-indigo-700 leading-relaxed text-lg">
                            Comprenda los diferentes estados de los documentos del convenio y los requisitos necesarios para su
                            aprobación y formalización.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Estados de los Documentos</h5>
                            <div className="space-y-4">
                                {[
                                    {
                                        status: "Sin Cargar",
                                        color: "gray",
                                        description: "Documento pendiente por adjuntar.",
                                        icon: <Clock className="h-6 w-6" />,
                                    },
                                    {
                                        status: "Pendiente (En Revisión)",
                                        color: "yellow",
                                        description: "Documento en proceso de validación por parte de la DIPPRO.",
                                        icon: <Clock className="h-6 w-6" />,
                                    },
                                    {
                                        status: "Rechazado",
                                        color: "red",
                                        description: "Documento requiere correcciones. Puede reemplazarlo.",
                                        icon: <X className="h-6 w-6" />,
                                    },
                                    {
                                        status: "Aprobado",
                                        color: "green",
                                        description: "Documento validado y aceptado. Solo visualización.",
                                        icon: <Check className="h-6 w-6" />,
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-5 rounded-xl border-l-4 border-${item.color}-500 bg-${item.color}-50 shadow-sm hover:shadow-md transition-shadow`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className={`w-11 h-11 bg-${item.color}-500 rounded-full flex items-center justify-center shadow-md`}
                                            >
                                                {item.icon}
                                            </div>
                                            <h6 className={`font-bold text-${item.color}-800 text-lg`}>{item.status}</h6>
                                        </div>
                                        <p className={`text-${item.color}-700 text-base`}>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Requisitos de Carga</h5>
                            <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500 shadow-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <UploadCloud className="h-8 w-8 text-white" />
                                    </div>
                                    <h4 className="font-bold text-blue-800 text-xl">Documentos y Formatos</h4>
                                </div>
                                <ul className="text-blue-700 space-y-2 text-base">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Formato requerido: <strong>PDF únicamente</strong>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Tamaño máximo por archivo: <strong>2 MB</strong>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Asegúrese de que los documentos sean <strong>legibles y completos</strong>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Adjunte siempre la <strong>Cámara de Comercio actualizada</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-8 rounded-xl border-2 border-purple-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Gavel className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-purple-800 text-2xl">Minuta del Convenio</h4>
                        </div>
                        <p className="text-purple-700 leading-relaxed text-base">
                            Una vez que todos los documentos previos hayan sido aprobados, el área jurídica de la Universidad cargará
                            la
                            <strong>Minuta del Convenio</strong>. Deberá descargarla, firmarla digitalmente o físicamente (y
                            escanearla), y cargarla nuevamente en el sistema para completar el proceso.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 5,
            title: "Módulo Vacantes",
            subtitle: "Creación y gestión de ofertas de práctica",
            icon: <Briefcase className="h-12 w-12 text-white" />,
            color: "from-blue-500 to-cyan-500",
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-xl border-2 border-blue-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Briefcase className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-blue-800 text-2xl">Publique sus Ofertas de Práctica</h4>
                        </div>
                        <p className="text-blue-700 leading-relaxed text-lg">
                            Cree y gestione ofertas de práctica profesional de manera sencilla y atractiva para captar el mejor
                            talento universitario.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Detalles para Crear una Nueva Vacante</h5>
                            <div className="space-y-4">
                                <div className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-lg">1</span>
                                        </div>
                                        <h6 className="font-semibold text-blue-800 text-lg">Información Básica</h6>
                                    </div>
                                    <ul className="text-gray-600 space-y-2 ml-5 text-base">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                            Nombre de la vacante (título atractivo y descriptivo)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                            Lugar de oferta (Nacional / Extranjera) y Ubicación específica (País, Departamento, Municipio)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                            Modalidad de vinculación (ej. Contrato de Aprendizaje, Acuerdo de Voluntades)
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-5 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-lg">2</span>
                                        </div>
                                        <h6 className="font-semibold text-green-800 text-lg">Detalles del Puesto</h6>
                                    </div>
                                    <ul className="text-gray-600 space-y-2 ml-5 text-base">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            Dependencia o área de trabajo dentro de la empresa
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            Modalidad de trabajo (Presencial / Remoto / Híbrido) y Horario laboral
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            Información sobre remuneración (si aplica: monto y periodicidad)
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-5 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-lg">3</span>
                                        </div>
                                        <h6 className="font-semibold text-purple-800 text-lg">Perfil y Actividades</h6>
                                    </div>
                                    <ul className="text-gray-600 space-y-2 ml-5 text-base">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                            Programas académicos requeridos (seleccione de la lista disponible)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                            Perfil profesional detallado (competencias, habilidades, conocimientos esperados)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                            Descripción clara y concisa de las actividades a realizar durante la práctica
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                            Fecha de cierre de postulaciones
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Gestión y Seguimiento de Candidatos</h5>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-5 bg-green-50 rounded-xl border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Users className="h-7 w-7 text-green-600" />
                                        <h6 className="font-semibold text-green-800 text-lg">Ver Postulados</h6>
                                    </div>
                                    <p className="text-green-700 leading-relaxed text-base">
                                        Acceda al listado completo de hojas de vida de estudiantes interesados. Revise sus perfiles,
                                        experiencia y habilidades para tomar decisiones informadas.
                                    </p>
                                </div>

                                <div className="p-5 bg-cyan-50 rounded-xl border-2 border-cyan-200 shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Mail className="h-7 w-7 text-cyan-600" />
                                        <h6 className="font-semibold text-cyan-800 text-lg">Invitar Estudiantes</h6>
                                    </div>
                                    <p className="text-cyan-700 leading-relaxed text-base">
                                        Envíe invitaciones directas a estudiantes que considere idóneos para sus vacantes, agilizando el
                                        proceso de selección.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300 shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="h-7 w-7 text-yellow-600" />
                            <h4 className="font-bold text-yellow-800 text-lg">Consideraciones Importantes</h4>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="text-center md:text-left">
                                <p className="text-yellow-700 leading-relaxed text-base">
                                    Si su vacante aplica para múltiples programas académicos, cada programa deberá aprobar la vacante
                                    independientemente antes de que sea visible para todos los estudiantes.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                    <Info className="h-8 w-8 text-yellow-500" />
                                </div>
                                <p className="text-yellow-700 font-semibold text-base">
                                    Asegure la correcta
                                    <br />
                                    publicación.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 6,
            title: "Postulaciones",
            subtitle: "Gestión de candidatos y selección",
            icon: <Users className="h-12 w-12 text-white" />,
            color: "from-purple-500 to-pink-500",
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border-2 border-purple-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-purple-800 text-2xl">Administre sus Candidatos</h4>
                        </div>
                        <p className="text-purple-700 leading-relaxed text-lg">
                            Explore las hojas de vida de los estudiantes postulados, revise sus perfiles y seleccione al candidato
                            ideal para su vacante de práctica.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Revisión Detallada de Perfiles</h5>
                            <div className="p-6 bg-white rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <Eye className="h-8 w-8 text-blue-600" />
                                    <h6 className="font-semibold text-blue-800 text-xl">Visualización Completa</h6>
                                </div>
                                <p className="text-gray-600 mb-5 leading-relaxed text-base">
                                    Acceda al perfil completo de cada candidato, que incluye información detallada sobre:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "Información académica y carga crediticia",
                                        "Experiencia previa (laboral o voluntariado)",
                                        "Habilidades técnicas y competencias blandas",
                                        "Certificaciones y cursos adicionales",
                                        "Idiomas y nivel de dominio",
                                        "Proyectos académicos relevantes",
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Proceso de Selección y Asignación</h5>
                            <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <UserCheck className="h-8 w-8 text-green-600" />
                                    <h6 className="font-semibold text-green-800 text-xl">Seleccione y Asigne</h6>
                                </div>
                                <p className="text-green-700 mb-5 leading-relaxed text-base">
                                    Una vez identificado el candidato ideal, siga estos pasos:
                                </p>
                                <ol className="text-green-700 space-y-3 ml-5 text-base font-medium">
                                    <li>1. Haga clic en el ícono de selección junto al nombre del candidato.</li>
                                    <li>2. Confirme su elección en el modal emergente.</li>
                                    <li>
                                        3. <strong>Asigne un Tutor Empresarial</strong> (obligatorio). Seleccione de la lista de tutores
                                        registrados.
                                    </li>
                                    <li>4. Guarde la asignación para formalizar la vinculación.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="h-7 w-7 text-purple-600" />
                            <h4 className="font-bold text-purple-800 text-lg">Notificaciones Automáticas</h4>
                        </div>
                        <p className="text-purple-700 leading-relaxed text-base">
                            El sistema enviará notificaciones automáticas a las partes involucradas:
                        </p>
                        <ul className="text-purple-700 space-y-2 mt-3 text-base">
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                El estudiante seleccionado recibirá una notificación de su elección.
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                El tutor empresarial asignado recibirá una notificación de su rol y responsabilidades.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl text-center border-l-4 border-blue-500 shadow-sm">
                        <div className="flex items-center gap-2 justify-center">
                            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                            <p className="text-blue-700 font-semibold text-base">
                                Tip Adicional: También puede invitar directamente a estudiantes específicos desde el catálogo general de
                                estudiantes disponibles en el sistema.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 7,
            title: "Módulo Tutores",
            subtitle: "Registro y gestión de tutores empresariales",
            icon: <UserPlus className="h-12 w-12 text-white" />,
            color: "from-orange-500 to-red-500",
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <UserCog className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-orange-800 text-2xl">Rol Clave del Tutor Empresarial</h4>
                        </div>
                        <p className="text-orange-700 leading-relaxed text-lg">
                            El tutor empresarial es fundamental para el éxito de la práctica. Registre y gestione a los profesionales
                            que guiarán y supervisarán a los estudiantes.
                        </p>
                    </div>

                    <div className="bg-yellow-50 p-8 rounded-xl border-l-4 border-yellow-500 shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="h-7 w-7 text-yellow-600" />
                            <h4 className="font-bold text-yellow-800 text-lg">¿Quién es el Tutor Empresarial?</h4>
                        </div>
                        <p className="text-yellow-700 leading-relaxed text-base">
                            Es la persona designada dentro de la empresa, con la experiencia y conocimiento necesarios, para guiar,
                            supervisar y evaluar el desempeño del estudiante durante su práctica profesional. Su rol es asegurar que
                            la experiencia sea formativa y alineada con los objetivos de aprendizaje.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl border-2 border-indigo-200 shadow-md hover:shadow-lg transition-shadow">
                        <h5 className="font-bold text-gray-800 mb-5 text-center text-xl">Información Requerida para el Registro</h5>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { label: "Identificación", details: "Tipo y número de documento de identidad." },
                                { label: "Datos Personales", details: "Nombres y apellidos completos, número de celular." },
                                { label: "Correo Electrónico", details: "Preferiblemente institucional o profesional." },
                                { label: "Cargo y Profesión", details: "Posición actual en la empresa y área de experticia." },
                                { label: "Estado de Acceso", details: "Activo/Inactivo para el sistema GEDOPRAC." },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-base">
                                    <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-semibold text-gray-800">{item.label}:</span>
                                        <span className="text-gray-600"> {item.details}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-5 bg-green-50 rounded-xl border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <Award className="h-7 w-7 text-green-600" />
                                <h6 className="font-semibold text-green-800 text-lg">Beneficios</h6>
                            </div>
                            <p className="text-green-700 leading-relaxed text-base">
                                Los tutores registrados recibirán credenciales de acceso al sistema GEDOPRAC, permitiéndoles realizar un
                                seguimiento digital eficiente de las prácticas y comunicarse directamente con la universidad.
                            </p>
                        </div>

                        <div className="p-5 bg-blue-50 rounded-xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <BarChart3 className="h-7 w-7 text-blue-600" />
                                <h6 className="font-semibold text-blue-800 text-lg">Funciones Principales</h6>
                            </div>
                            <p className="text-blue-700 leading-relaxed text-base">
                                Las funciones del tutor incluyen: evaluar el desempeño del practicante, registrar actividades
                                realizadas, proporcionar retroalimentación constructiva y servir como punto de contacto principal con la
                                universidad.
                            </p>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-xl text-center border-l-4 border-purple-500 shadow-sm">
                        <p className="text-purple-700 font-semibold text-base">
                            Puede registrar múltiples tutores y asignarlos estratégicamente según las necesidades específicas de cada
                            practicante o área.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 8,
            title: "Módulo Practicantes",
            subtitle: "Seguimiento y legalización de prácticas",
            icon: <GraduationCap className="h-12 w-12 text-white" />,
            color: "from-orange-500 to-red-500",
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-orange-800 text-2xl">Supervise a sus Practicantes</h4>
                        </div>
                        <p className="text-orange-700 leading-relaxed text-lg">
                            Administre y realice un seguimiento detallado de los estudiantes que se encuentran actualmente realizando
                            sus prácticas profesionales en su organización.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Visualización y Gestión</h5>
                            <div className="p-6 bg-white rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <Eye className="h-8 w-8 text-blue-600" />
                                    <h6 className="font-semibold text-blue-800 text-xl">Acceso Completo</h6>
                                </div>
                                <p className="text-gray-600 mb-5 leading-relaxed text-base">
                                    Desde el listado de practicantes activos, usted puede:
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Ver el detalle completo de cada práctica.
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Consultar el estado de los documentos de legalización.
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Verificar las fechas de inicio y finalización programadas.
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Confirmar el tutor empresarial asignado.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Documentación de Legalización</h5>
                            <div className="p-6 bg-orange-50 rounded-xl border-l-4 border-orange-500 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <UploadCloud className="h-8 w-8 text-orange-600" />
                                    <h6 className="font-semibold text-orange-800 text-xl">Requisitos por Modalidad</h6>
                                </div>
                                <p className="text-orange-700 mb-5 leading-relaxed text-base">
                                    Asegúrese de cargar los documentos correctos según la modalidad de vinculación:
                                </p>
                                <div className="space-y-3 text-sm">
                                    <div className="p-3 bg-white rounded border border-orange-200">
                                        <p className="text-orange-700 font-medium mb-1">Contrato de Aprendizaje SENA:</p>
                                        <p className="text-orange-600">Documento de vinculación, ARL, Afiliación a Salud.</p>
                                    </div>
                                    <div className="p-3 bg-white rounded border border-orange-200">
                                        <p className="text-orange-700 font-medium mb-1">Acuerdo de Voluntades:</p>
                                        <p className="text-orange-600">Documento de vinculación, Certificado ARL.</p>
                                    </div>
                                    <div className="p-3 bg-white rounded border border-orange-200">
                                        <p className="text-orange-700 font-medium mb-1">Acto Administrativo:</p>
                                        <p className="text-orange-600">Documento de vinculación, Certificado ARL.</p>
                                    </div>
                                    <div className="p-3 bg-white rounded border border-orange-200">
                                        <p className="text-orange-700 font-medium mb-1">Contrato Laboral:</p>
                                        <p className="text-orange-600">El estudiante carga sus documentos laborales.</p>
                                    </div>
                                    <div className="p-3 bg-white rounded border border-orange-200">
                                        <p className="text-orange-700 font-medium mb-1">Prácticas en el Exterior:</p>
                                        <p className="text-orange-600">Carta de intención, Acreditación, ARL, Vinculación internacional.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="h-7 w-7 text-green-600" />
                            <h4 className="font-bold text-green-800 text-lg">Proceso de Aprobación de Documentos</h4>
                        </div>
                        <p className="text-green-700 leading-relaxed text-base">
                            Los documentos de legalización siguen el mismo ciclo de estados que los del convenio:
                        </p>
                        <div className="flex items-center justify-between mt-5">
                            <div className="text-center">
                                <div className="w-10 h-10 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center shadow-inner">
                                    <Clock className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xs text-gray-600 font-medium">Sin Cargar</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                            <div className="text-center">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full mx-auto mb-2 flex items-center justify-center shadow-inner">
                                    <Clock className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xs text-yellow-700 font-medium">Pendiente</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                            <div className="text-center">
                                <div className="w-10 h-10 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center shadow-inner">
                                    <Check className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xs text-green-700 font-medium">Aprobado</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl text-center border-l-4 border-blue-500 shadow-sm">
                        <div className="flex items-center gap-2 justify-center">
                            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                            <p className="text-blue-700 font-semibold text-base">
                                Una vez aprobados todos los documentos, el estudiante podrá iniciar oficialmente sus prácticas.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 9,
            title: "¡Tutorial Completado!",
            subtitle: "Está listo para usar GEDOPRAC",
            icon: <CheckCircle className="h-12 w-12 text-white" />,
            color: "from-green-500 to-emerald-500",
            content: (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                            <CheckCircle className="h-16 w-16 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ¡Felicitaciones!
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Ha completado con éxito el tutorial de GEDOPRAC diseñado para empresas. Está preparado para optimizar la
                            gestión de sus prácticas profesionales.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-8 rounded-xl border-2 border-green-200 shadow-md">
                        <h4 className="font-bold text-green-800 mb-5 text-center text-2xl">Resumen de Módulos Principales</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: <FileCheck className="h-8 w-8" />, label: "Convenios" },
                                { icon: <Briefcase className="h-8 w-8" />, label: "Vacantes" },
                                { icon: <Users className="h-8 w-8" />, label: "Tutores" },
                                { icon: <GraduationCap className="h-8 w-8" />, label: "Practicantes" },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 bg-white rounded-xl text-center transform hover:scale-105 transition-all shadow-sm hover:shadow-md border border-gray-100"
                                >
                                    <div className="text-green-600 mx-auto mb-3">{item.icon}</div>
                                    <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Próximos Pasos Recomendados</h5>
                            <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500 shadow-md">
                                <ul className="text-blue-700 space-y-3 text-base leading-relaxed">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Acceda a <strong className="font-bold">GEDOPRAC</strong> con sus credenciales empresariales.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Complete y actualice el perfil de su empresa.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Registre a sus tutores empresariales para supervisar las prácticas.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Publique su primera oferta de práctica profesional.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        Revise las postulaciones y seleccione a los candidatos ideales.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold text-gray-800 mb-4 text-xl">Soporte y Contacto</h5>
                            <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500 shadow-md">
                                <div className="space-y-3 text-base leading-relaxed">
                                    <p className="text-purple-700">
                                        Si tiene alguna duda o necesita asistencia adicional, no dude en contactarnos:
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                        <span className="text-purple-700">
                                            Correo: <strong className="font-bold">empresas@unimagdalena.edu.co</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                        <span className="text-purple-700">
                                            Teléfono: <strong className="font-bold">(+57-5) 4381000 Ext. 3912</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300 shadow-md">
                        <h4 className="font-bold text-orange-800 mb-3 text-center text-xl">💡 Consejo Final para el Éxito</h4>
                        <p className="text-orange-700 leading-relaxed text-center text-base">
                            Mantenga su información empresarial actualizada y responda con agilidad a las postulaciones. Una
                            comunicación fluida y una gestión proactiva maximizarán sus oportunidades de atraer y vincular el mejor
                            talento universitario. ¡Mucho éxito!
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-10 py-6 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                            <ExternalLink className="h-6 w-6 mr-3" />
                            Ir a GEDOPRAC
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() =>
                                window.open(
                                    "https://www.unimagdalena.edu.co/Content/Public/Docs/Entrada_Direcci%C3%B3n4/adjunto_1032-20241121115133_113.pdf",
                                    "_blank"
                                )
                            }
                            className="px-8 py-6 text-base font-semibold border-green-500 text-green-600 hover:bg-green-50 transform hover:scale-105 transition-all"
                        >
                            <FileText className="h-6 w-6 mr-1" />
                            Abrir Manual de Usuario
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => setTutorialStep(0)}
                            className="px-8 py-6 text-base font-semibold border-green-500 text-green-600 hover:bg-green-50 transform hover:scale-105 transition-all"
                        >
                            <RotateCcw className="h-6 w-6 mr-1" />
                            Ver Tutorial Nuevamente
                        </Button>
                    </div>
                </div>
            ),
        },
    ]

    return (
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-blue-700 mb-2">Tutorial Interactivo</h4>
            <p className="text-sm text-gray-600 mb-3">Recorrido guiado por todas las funcionalidades</p>
            <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                    setShowTutorial(true)
                    setTutorialStep(0)
                }}
            >
                <Play className="h-4 w-4 mr-2" />
                Iniciar Tutorial
            </Button>

            <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
                <DialogContent className="max-w-[75vw] max-h-[95vh] overflow-hidden flex flex-col p-0 rounded-3xl shadow-2xl">
                    <DialogHeader className="px-10 pt-5 pb-5 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-b-2 border-green-200">
                        <DialogTitle className="flex items-center gap-5">
                            <div
                                className={`w-16 h-16 bg-gradient-to-br ${tutorialSteps[tutorialStep].color} rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform`}
                            >
                                {tutorialSteps[tutorialStep].icon}
                            </div>
                            <div className="flex-1">
                                <div className="text-3xl font-bold text-gray-800 mb-2">{tutorialSteps[tutorialStep].title}</div>
                                <div className="text-lg text-gray-600">{tutorialSteps[tutorialStep].subtitle}</div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-10 py-8">
                        <div className="max-w-5xl mx-auto">{tutorialSteps[tutorialStep].content}</div>
                    </div>

                    <div className="border-t-2 px-10 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-slate-50">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setTutorialStep(Math.max(0, tutorialStep - 1))}
                            disabled={tutorialStep === 0}
                            className="px-8 py-6 text-base font-semibold hover:bg-gray-100 shadow-md transform hover:scale-105 transition-transform border-gray-300"
                        >
                            <ChevronLeft className="h-6 w-6 mr-3" />
                            Anterior
                        </Button>

                        <div className="flex gap-3">
                            {tutorialSteps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setTutorialStep(index)}
                                    className={`rounded-full transition-all duration-300 transform hover:scale-110 ${index === tutorialStep
                                        ? "bg-gradient-to-r from-green-600 to-emerald-600 w-16 h-4 shadow-lg"
                                        : index < tutorialStep
                                            ? "bg-green-400 w-4 h-4 hover:bg-green-500"
                                            : "bg-gray-300 w-4 h-4 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Ir al paso ${index + 1}`}
                                />
                            ))}
                        </div>

                        {tutorialStep < tutorialSteps.length - 1 ? (
                            <Button
                                size="lg"
                                onClick={() => setTutorialStep(Math.min(tutorialSteps.length - 1, tutorialStep + 1))}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                Siguiente
                                <ChevronRight className="h-6 w-6 ml-3" />
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                onClick={() => setShowTutorial(false)}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                <CheckCircle className="h-6 w-6 mr-3" />
                                Finalizar Tutorial
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GedopracTutorialComponent;