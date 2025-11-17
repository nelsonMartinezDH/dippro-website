import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    const links = [
        "Gobierno en línea",
        "Ministerio de Educación",
        "Control y mecanismos de monitoreo",
        "Colombia Aprende",
        "Icetex",
        "Colciencias",
        "Renata",
        "Universia",
        "universia.encuestafacil",
    ]

    const publicServices = [
        "Transparencia y acceso a la información pública",
        "Pago online",
        "Página para niños",
        "Ubicación y medios de contacto",
        "Preguntas frecuentes",
        "Solicitudes, quejas, y sugerencias",
        "Protección de datos personales",
        "Carta de trato digno al ciudadano",
        "Glosario",
    ]

    const generalInfo = [
        "Reglamento para estudiantes",
        "Calendario académico",
        "Protección de datos personales",
        "Informes de gestión",
    ]

    const services = [
        "Bienestar universitario",
        "Campus Virtual",
        "Recursos educativos",
        "Biblioteca Germán Bula Meyer",
        "Consultorio jurídico y centro de conciliación",
        "Cartera",
        "Pagos en línea",
        "Consultar portal anterior",
    ]

    return (
        <footer className="bg-[#1e5a96] text-white">
            <div className="border-2 border-orange-400" />
            {/* First Section: Certifications */}
            <div className="border-b border-blue-700/30">
                <div className="container mx-auto px-3 py-7">
                    {/* Logos */}
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <img
                            src="https://cdn.unimagdalena.edu.co/images/escudo/bg_dark/default.png"
                            alt="Logo Universidad del Magdalena"
                            className="w-24 h-24 object-contain"
                        />

                        <img
                            src="https://cdn.unimagdalena.edu.co/images/acreditacion2/default.png"
                            alt="Marca de acreditación de alta calidad"
                            className="h-24 w-32 object-contain"
                        />

                        <img
                            src="https://cdn.unimagdalena.edu.co/images/logo_marcapais.png"
                            alt="Logotipo de la marca país"
                            className="w-20 h-20 object-contain"
                        />

                        <img
                            src="https://cdn.unimagdalena.edu.co/images/escudo_colombia.png"
                            alt="Escudo de colombia"
                            className="w-20 h-20 object-contain"
                        />

                        <img
                            src="https://www.unimagdalena.edu.co/Content/Imagenes/FundacionCEIMAR.png"
                            alt="Sellos de calidad"
                            className="max-w-32 max-h-20 object-contain"
                        />

                        <img
                            src="https://cdn.unimagdalena.edu.co/images/sello_icontec_iqnet.png"
                            alt="Sello icontec"
                            className="max-w-32 max-h-20 object-contain"
                        />

                        <img
                            src="https://cdn.unimagdalena.edu.co/images/calidad/bg-dark/default.png"
                            alt="Sellos de calidad"
                            className="w-32 h-20 object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Second Section: Links */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-300">Links</h3>
                        <ul className="space-y-2">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Public services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-300">Servicios Públicos</h3>
                        <ul className="space-y-2">
                            {publicServices.map((service, index) => (
                                <li key={index}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* General Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-300">Información General</h3>
                        <ul className="space-y-2">
                            {generalInfo.map((info, index) => (
                                <li key={index}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                                        {info}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-300">Servicios</h3>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Third section: Contact info */}
            <div className="border-t border-blue-700/30 bg-blue-900/50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center space-y-4">
                        <h3 className="text-xl font-semibold text-orange-300">Información de contacto</h3>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>Línea Gratuita Nacional: 01 8000 180 504. PBX: (57 - 605) 4381000 - 4365000</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>Dirección: Calle 29H3 No 22 - 01 Santa Marta D.T.C.H. - Colombia. Código Postal No. 470004</span>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            <span>Email: ciudadano@unimagdalena.edu.co</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fourth Section: The Bottom */}
            <div className="bg-blue-900/50">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center space-y-2 text-sm text-gray-300">
                        <p>
                            La Universidad del Magdalena está sujeta a inspección y vigilancia por el Ministerio de Educación
                            Nacional.
                        </p>
                        <p>Desarrollado por el Centro de Investigación y Desarrollo de Software CIDS - Unimagdalena © 2018</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
