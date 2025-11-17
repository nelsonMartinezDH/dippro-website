import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, MessageCircle, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";

const TechnicalSupportGedoprac = () => {
    const [isSupportContactOpen, setIsSupportContactOpen] = useState(false);

    return (
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-blue-700 mb-2">Soporte Técnico</h4>
            <p className="text-sm text-gray-600 mb-3">Asistencia especializada para el sistema</p>
            <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setIsSupportContactOpen(true)}
            >
                Contactar Soporte
            </Button>

            <Dialog open={isSupportContactOpen} onOpenChange={setIsSupportContactOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl">

                    {/* HEADER */}
                    <DialogHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-t-2xl p-8 -m-6 mb-8 shadow-xl">
                        <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                            <MessageCircle className="h-8 w-8" />
                            Soporte Técnico GEDOPRAC
                        </DialogTitle>
                        <p className="text-blue-100 mt-3 text-base leading-relaxed">
                            Estamos aquí para ayudarte. Contáctanos por el medio que prefieras.
                        </p>
                    </DialogHeader>

                    {/* CONTACT METHODS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-6">

                        {/* EMAIL */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-400 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-300 group-hover:w-2 transition-all duration-300"></div>

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="h-7 w-7 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Correo Electrónico</h3>
                                    <p className="text-xs text-blue-600 font-semibold">Respuesta: 24–48 horas</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Recibe una respuesta detallada de nuestro equipo de soporte.
                            </p>

                            <a
                                href="mailto:gedoprac@unimagdalena.edu.co?subject=Soporte%20GEDOPRAC"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                                <Mail className="h-5 w-5" />
                                Enviar correo
                            </a>

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-blue-800 font-mono text-sm break-all">gedoprac@unimagdalena.edu.co</p>
                            </div>
                        </div>

                        {/* TELÉFONO */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-400 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-600 to-indigo-300 group-hover:w-2 transition-all duration-300"></div>

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="h-7 w-7 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Llamada Telefónica</h3>
                                    <p className="text-xs text-indigo-600 font-semibold">L–V: 8 AM – 5 PM</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Habla directamente con nuestro equipo en horario laboral.
                            </p>

                            <a
                                href="tel:+5746381000"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                                <Phone className="h-5 w-5" />
                                Llamar ahora
                            </a>

                            <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                <p className="text-indigo-800 font-mono text-sm">+57 (4) 6381000 Ext. 3321–3322</p>
                            </div>
                        </div>

                        {/* WHATSAPP */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-sky-400 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-600 to-sky-300 group-hover:w-2 transition-all duration-300"></div>

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-sky-100 to-sky-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <MessageCircle className="h-7 w-7 text-sky-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">WhatsApp</h3>
                                    <p className="text-xs text-sky-600 font-semibold">Respuesta: &lt; 1 hora</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Atención rápida, incluso fuera del horario laboral.
                            </p>

                            <a
                                href="https://wa.me/573216381000?text=Hola%20necesito%20soporte%20en%20GEDOPRAC"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                                <MessageCircle className="h-5 w-5" />
                                Enviar WhatsApp
                            </a>

                            <div className="mt-4 p-3 bg-sky-50 rounded-lg border border-sky-200">
                                <p className="text-sky-800 font-mono text-sm">+57 321 6381000</p>
                            </div>
                        </div>

                        {/* CHAT EN VIVO */}
                        <div className="group bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-400 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-700 to-indigo-400 group-hover:w-2 transition-all duration-300"></div>

                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <MessageSquare className="h-7 w-7 text-indigo-700" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Chat en Vivo</h3>
                                    <p className="text-xs text-indigo-700 font-semibold">Disponible 24/7</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Atención inmediata dentro de la plataforma GEDOPRAC.
                            </p>

                            <button
                                onClick={() => {
                                    window.open(
                                        "https://gedoprac.unimagdalena.edu.co/auth/login?return=%2Fpages%2Fdashboard",
                                        "_blank"
                                    );
                                    setIsSupportContactOpen(false);
                                }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-indigo-800 hover:from-indigo-800 hover:to-indigo-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                                <MessageSquare className="h-5 w-5" />
                                Ir a GEDOPRAC
                            </button>

                            <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                <p className="text-indigo-800 text-sm font-semibold">Acceso con tu cuenta institucional</p>
                            </div>
                        </div>
                    </div>

                    {/* INFO EXTRA */}
                    <div className="mx-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 rounded-xl p-5">
                            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">⏱️ Tiempo de Respuesta</h4>
                            <p className="text-blue-700 text-sm">
                                Respondemos en menos de 2 horas en horario laboral.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 border-2 border-indigo-200 rounded-xl p-5">
                            <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">📋 Información Requerida</h4>
                            <p className="text-indigo-700 text-sm">
                                Ten a mano tu carné, código y descripción del inconveniente.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 rounded-xl p-5">
                            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">🔒 Privacidad</h4>
                            <p className="text-blue-700 text-sm">
                                Tus datos están protegidos y manejados con estricta confidencialidad.
                            </p>
                        </div>
                    </div>

                    {/* TIP FINAL */}
                    <div className="mx-6 mb-6 bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 border-l-4 border-blue-500 rounded-lg p-6">
                        <div className="flex gap-4">
                            <span className="text-2xl">💡</span>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-2">Antes de contactarnos, prueba esto:</h4>
                                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                                    <li>• Limpia la caché del navegador</li>
                                    <li>• Prueba desde otro navegador</li>
                                    <li>• Revisa las preguntas frecuentes</li>
                                    <li>• Usa tu correo institucional válido</li>
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