import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, MessageCircle, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";

const TechnicalSupportGedoprac = () => {
    const [isSupportContactOpen, setIsSupportContactOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 gap-4 mb-6">
            <Button
                variant="outline"
                className="h-24 p-4 flex flex-col items-center gap-3 bg-gradient-to-br from-white to-orange-50 hover:from-orange-50 hover:to-orange-100 border-2 border-orange-200 hover:border-orange-300 transition-all duration-200"
                onClick={() => setIsSupportContactOpen(true)}
            >
                <Phone className="h-8 w-8 text-orange-600" />
                <span className="font-semibold text-orange-700">Soporte</span>
                <Badge variant="secondary" className="text-xs">
                    3 Canales
                </Badge>
            </Button>

            <Dialog open={isSupportContactOpen} onOpenChange={setIsSupportContactOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 border-2 border-orange-200 rounded-2xl">

                    {/* Header */}
                    <DialogHeader className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 text-white rounded-t-2xl p-8 -m-6 mb-8 shadow-lg">
                        <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                            <MessageCircle className="h-8 w-8" />
                            Soporte Técnico GEDOPRAC
                        </DialogTitle>
                        <p className="text-orange-50 mt-3 text-base leading-relaxed">
                            Estamos aquí para ayudarte. Contáctanos a través del medio que prefieras y te responderemos lo antes posible.
                        </p>
                    </DialogHeader>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-6">

                        {/* Email */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-300 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-400 to-amber-200 group-hover:w-2 transition-all duration-300"></div>

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-orange-100 to-amber-50 p-4 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                    <Mail className="h-7 w-7 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Correo Electrónico</h3>
                                    <p className="text-xs text-orange-500 font-semibold">Respuesta: 24-48 horas</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Envía tu consulta directamente a nuestro equipo de soporte y recibe una respuesta detallada.
                            </p>

                            <a
                                href="mailto:gedoprac@unimagdalena.edu.co?subject=Soporte%20GEDOPRAC"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <Mail className="h-5 w-5" />
                                Enviar correo
                            </a>

                            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-orange-700 font-mono text-sm break-all">
                                    gedoprac@unimagdalena.edu.co
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-300 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-yellow-200 group-hover:w-2 transition-all duration-300"></div>

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-amber-100 to-yellow-50 p-4 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                    <Phone className="h-7 w-7 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Llamada Telefónica</h3>
                                    <p className="text-xs text-amber-500 font-semibold">L-V: 8:00 AM - 5:00 PM</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Habla directamente con nuestro equipo de soporte en horario laboral.
                            </p>

                            <a
                                href="tel:+5746381000"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <Phone className="h-5 w-5" />
                                Llamar ahora
                            </a>

                            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                <p className="text-amber-700 font-mono text-sm">
                                    +57 (4) 6381000 Ext. 3321-3322
                                </p>
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-300 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-400 to-amber-300 group-hover:w-2 transition-all duration-300"></div>

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-orange-100 to-amber-50 p-4 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                    <MessageCircle className="h-7 w-7 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">WhatsApp</h3>
                                    <p className="text-xs text-orange-500 font-semibold">
                                        Respuesta: {'<'} 1 hora
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Mensajes rápidos y directos. Disponible también fuera de horario laboral.
                            </p>

                            <a
                                href="https://wa.me/573216381000?text=Hola%20necesito%20soporte%20en%20GEDOPRAC"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Enviar WhatsApp
                            </a>

                            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-orange-700 font-mono text-sm">
                                    +57 321 6381000
                                </p>
                            </div>
                        </div>

                        {/* Live Chat */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-300 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-400 to-orange-200 group-hover:w-2 transition-all duration-300"></div>

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-red-100 to-orange-50 p-4 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                    <MessageSquare className="h-7 w-7 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Chat en Vivo</h3>
                                    <p className="text-xs text-red-500 font-semibold">Disponible 24/7 en GEDOPRAC</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Soporte inmediato dentro de la plataforma GEDOPRAC. Inicia sesión para acceder.
                            </p>

                            <button
                                onClick={() => {
                                    window.open(
                                        "https://gedoprac.unimagdalena.edu.co/auth/login?return=%2Fpages%2Fdashboard",
                                        "_blank"
                                    );
                                    setIsSupportContactOpen(false);
                                }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <MessageSquare className="h-5 w-5" />
                                Ir a GEDOPRAC
                            </button>

                            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                                <p className="text-red-700 text-sm font-semibold">
                                    Acceso mediante tu cuenta institucional
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mx-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-200 rounded-xl p-5">
                            <h4 className="font-bold text-orange-700 mb-2 flex items-center gap-2">
                                <span className="text-xl">⏱️</span> Tiempo de Respuesta
                            </h4>
                            <p className="text-orange-600 text-sm">
                                Garantizamos respuesta en menos de 2 horas en horario laboral.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-200 rounded-xl p-5">
                            <h4 className="font-bold text-amber-700 mb-2 flex items-center gap-2">
                                <span className="text-xl">📋</span> Información Requerida
                            </h4>
                            <p className="text-amber-600 text-sm">
                                Ten a mano tu carné, código de estudiante y detalles del inconveniente.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-200 rounded-xl p-5">
                            <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                                <span className="text-xl">🔒</span> Privacidad
                            </h4>
                            <p className="text-red-600 text-sm">
                                Todos tus datos están protegidos y se mantienen confidenciales.
                            </p>
                        </div>
                    </div>

                    {/* Tip */}
                    <div className="mx-6 mb-6 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-l-4 border-orange-300 rounded-lg p-6">
                        <div className="flex gap-4">
                            <span className="text-2xl">💡</span>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-2">Antes de contactarnos, intenta esto:</h4>
                                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                                    <li>• Limpia la caché de tu navegador</li>
                                    <li>• Intenta acceder desde otro navegador</li>
                                    <li>• Revisa nuestra sección de preguntas frecuentes en la plataforma</li>
                                    <li>• Asegúrate de usar tu correo institucional válido</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TechnicalSupportGedoprac;