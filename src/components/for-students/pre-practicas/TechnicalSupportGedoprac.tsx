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
                size="sm"
                className="bg-white border-gray-300 hover:bg-gray-100"
                onClick={() => setIsSupportContactOpen(true)}
            >
                <Mail className="h-4 w-4 mr-1 text-teal-700" />
                Contacto
            </Button>

            <Dialog open={isSupportContactOpen} onOpenChange={setIsSupportContactOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 border-2 border-teal-300 rounded-2xl">

                    {/* Header */}
                    <DialogHeader className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white rounded-t-2xl p-8 -m-6 mb-8 shadow-xl">
                        <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                            <MessageCircle className="h-8 w-8" />
                            Soporte Técnico GEDOPRAC
                        </DialogTitle>
                        <p className="text-teal-100 mt-3 text-base leading-relaxed">
                            Estamos aquí para ayudarte. Contáctanos a través del medio que prefieras y te responderemos lo antes posible.
                        </p>
                    </DialogHeader>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-6">

                        {/* Email */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-teal-400 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-600 to-teal-300 group-hover:w-2 transition-all duration-300" />

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="h-7 w-7 text-teal-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Correo Electrónico</h3>
                                    <p className="text-xs text-teal-600 font-semibold">Respuesta: 24-48 horas</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Envía tu consulta directamente a nuestro equipo de soporte y recibe una respuesta detallada.
                            </p>

                            <a
                                href="mailto:gedoprac@unimagdalena.edu.co?subject=Soporte%20GEDOPRAC"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
                            >
                                <Mail className="h-5 w-5" />
                                Enviar correo
                            </a>

                            <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
                                <p className="text-teal-800 font-mono text-sm break-all">gedoprac@unimagdalena.edu.co</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-400 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-600 to-emerald-300 group-hover:w-2 transition-all duration-300" />

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="h-7 w-7 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Llamada Telefónica</h3>
                                    <p className="text-xs text-emerald-600 font-semibold">L-V: 8:00 AM - 5:00 PM</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Habla directamente con nuestro equipo de soporte en horario laboral.
                            </p>

                            <a
                                href="tel:+5746381000"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
                            >
                                <Phone className="h-5 w-5" />
                                Llamar ahora
                            </a>

                            <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                <p className="text-emerald-800 font-mono text-sm">+57 (4) 6381000 Ext. 3321-3322</p>
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-cyan-400 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-600 to-cyan-300 group-hover:w-2 transition-all duration-300" />

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-cyan-100 to-cyan-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <MessageCircle className="h-7 w-7 text-cyan-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">WhatsApp</h3>
                                    <p className="text-xs text-cyan-600 font-semibold">Respuesta: {'<'} 1 hora</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Mensajes rápidos y directos. Disponible también fuera de horario laboral.
                            </p>

                            <a
                                href="https://wa.me/573216381000?text=Hola%20necesito%20soporte%20en%20GEDOPRAC"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Enviar WhatsApp
                            </a>

                            <div className="mt-4 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                                <p className="text-cyan-800 font-mono text-sm">+57 321 6381000</p>
                            </div>
                        </div>

                        {/* Chat en Vivo */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-teal-400 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-700 to-teal-300 group-hover:w-2 transition-all duration-300" />

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <MessageSquare className="h-7 w-7 text-teal-700" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Chat en Vivo</h3>
                                    <p className="text-xs text-teal-700 font-semibold">Disponible 24/7 en GEDOPRAC</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Soporte inmediato dentro de la plataforma GEDOPRAC. Inicia sesión para acceder.
                            </p>

                            <button
                                onClick={() => {
                                    window.open(
                                        "https://gedoprac.unimagdalena.edu.co/auth/login?return=%2Fpages%2Fdashboard",
                                        "_blank",
                                    );
                                    setIsSupportContactOpen(false);
                                }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
                            >
                                <MessageSquare className="h-5 w-5" />
                                Ir a GEDOPRAC
                            </button>

                            <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
                                <p className="text-teal-800 text-sm font-semibold">Acceso mediante tu cuenta institucional</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mx-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                        <div className="bg-gradient-to-br from-teal-100 to-teal-50 border-2 border-teal-200 rounded-xl p-5">
                            <h4 className="font-bold text-teal-800 mb-2 flex items-center gap-2">
                                ⏱️ Tiempo de Respuesta
                            </h4>
                            <p className="text-teal-700 text-sm">Garantizamos respuesta en menos de 2 horas en horario laboral.</p>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-100 to-cyan-50 border-2 border-cyan-200 rounded-xl p-5">
                            <h4 className="font-bold text-cyan-800 mb-2 flex items-center gap-2">
                                📋 Información Requerida
                            </h4>
                            <p className="text-cyan-700 text-sm">Ten a mano tu carné, código de estudiante y detalles del inconveniente.</p>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 border-2 border-emerald-200 rounded-xl p-5">
                            <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                                🔒 Privacidad
                            </h4>
                            <p className="text-emerald-700 text-sm">Todos tus datos están protegidos y se mantienen confidenciales.</p>
                        </div>
                    </div>

                    {/* Help Tip */}
                    <div className="mx-6 mb-6 bg-gradient-to-r from-teal-100 via-cyan-50 to-emerald-50 border-l-4 border-teal-500 rounded-lg p-6">
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