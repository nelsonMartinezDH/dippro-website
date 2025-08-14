import {CheckCircle, Users, Building2, FileText, MapPin, Award} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {useEffect, useState} from "react";
import {Badge} from "@/components/ui/badge";

export default function InformationGeneral() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            image: "https://www.unimagdalena.edu.co/Content/Imagenes/Sliders/DireccionesOrganizativas/slider-20250317095855_872.jpg",
            title: "Oficina de Prácticas Profesionales"
        },
        {
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKn4OFAV9P85b_dV1ym67dnPRoFqJKH76QbGbRGMsoroRoEknMiNdpofJT-y-gTczS_QdIdUBwi9OBCVM8lao13YIybkG2V-mRiL4JtDjzmOuV_yvHeO8CdU3SCPQeazllzOG3I1YJ3ZHXiQJCGlBZp3Y4v6ELl31rWUyi2Rqu_I6Nyd1wCruKMqa608N6/s16000-rw/unnamed%20-%202025-05-22T200027.167.jpg",
            title: "Campus Principal"
        },
        {
            image: "https://unimagdalena.edu.co/Content/ArchivosPublicaciones/imagenes/20220610123453.483.jpeg",
            title: "Universidad Comprometida"
        },
        {
            image: "https://www.unimagdalena.edu.co/Content/ArchivosPublicaciones/imagenes/20240630112638.087.jpg",
            title: "Instalaciones Modernas"
        }
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 shadow-2xl">
                <div className="absolute inset-0 bg-black/20"></div>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-transparent"></div>

                {/* Slider */}
                <div className="absolute right-0 top-0 h-full w-2/3">
                    <div className="relative h-full overflow-hidden">
                        {slides.map((slide, index) => (
                            <div key={index}
                                 className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                                     index === currentSlide ? 'translate-x-0' :
                                         index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                                 }`}
                            >
                                <img
                                    src={slide.image || "placeholder.svg"}
                                    alt={slide.title}
                                    className="object-cover object-center opacity-40 w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 px-8 py-12 lg:px-12 lg:py-16">
                    <div className="max-w-2xl">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                                <Building2 className="h-8 w-8 text-white"/>
                            </div>
                            <Badge variant="secondary"
                                   className="flex flex-col leading-tight bg-white/20 text-white text-xs backdrop-blur-sm border-white/20 hover:scale-105">
                                <span className="font-bold">Vicerrectoría de Extensión y </span>
                                <span className="font-bold">Proyección Social</span>
                            </Badge>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
                            Dirección de Prácticas
                            <span className="block text-orange-300">Profesionales</span>
                        </h1>

                        <p className="mb-8 text-xl text-blue-100 leading-relaxed">
                            Conectamos el talento universitario con oportunidades reales en el sector empresarial,
                            formando
                            profesionales competentes y comprometidos con el desarrollo social.
                        </p>

                        {/* Bagdes */}
                        <div className="flex flex-wrap gap-4">
                            <div
                                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm hover:scale-105 hover:bg-white/20 transition-colors">
                                <MapPin className="h-4 w-4 text-orange-300"/>
                                <span className="text-sm text-white">Santa Marta, Colombia</span>
                            </div>
                            <div
                                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm hover:scale-105 hover:bg-white/20 transition-colors">
                                <Award className="h-4 w-4 text-orange-300"/>
                                <span className="text-sm text-white">Acreditación Alta Calidad</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Elementos decorativos */}
                <div
                    className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-r from-orange-400 to-orange-500"></div>
            </div>

            {/* Mision */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600"/>
                            Misión
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                <strong>Formar profesionales competentes:</strong> Brindar a los estudiantes la
                                oportunidad de demostrar
                                las competencias adquiridas para desempeñarse como profesionales altamente calificados,
                                según los
                                requisitos de la legislación vigente.
                            </p>
                            <p>
                                <strong>Compromiso social:</strong> Formar estudiantes comprometidos con las necesidades
                                de la
                                comunidad, elevando los estándares de calidad de las empresas donde se desempeñarán.
                            </p>
                            <p>
                                <strong>Formación integral:</strong> Promover estudiantes autodidactas con formación
                                autónoma,
                                humanista, reflexiva, creativa y transformadora, en consonancia con la realidad
                                socioeconómica del país.
                            </p>
                            <p>
                                <strong>Innovación y calidad:</strong> Fomentar la cultura de la innovación, la
                                excelencia
                                académica y la responsabilidad social en cada etapa del proceso formativo, garantizando
                                que
                                los estudiantes se conviertan en agentes de cambio comprometidos con el desarrollo
                                sostenible
                                y el bienestar colectivo.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Estadisticas */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600"/>
                            Estadísticas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            <div
                                className="text-center p-3 bg-blue-50 rounded-lg hover:scale-105 hover:bg-blue-100 transition-colors">
                                <div className="text-2xl font-bold text-blue-600">700+</div>
                                <div className="text-sm text-gray-600">Empresas Aliadas</div>
                            </div>
                            <div
                                className="text-center p-3 bg-orange-50 rounded-lg hover:scale-105 hover:bg-orange-100 transition-colors">
                                <div className="text-2xl font-bold text-orange-600">95%</div>
                                <div className="text-sm text-gray-600">Tasa de Éxito</div>
                            </div>
                            <div
                                className="text-center p-3 bg-green-50 rounded-lg hover:scale-105 hover:bg-green-100 transition-colors">
                                <div className="text-2xl font-bold text-green-600">1,200+</div>
                                <div className="text-sm text-gray-600">Estudiantes/Año</div>
                            </div>
                            <div
                                className="text-center p-3 bg-purple-50 rounded-lg hover:scale-105 hover:bg-purple-100 transition-colors">
                                <div className="text-2xl font-bold text-purple-600">86%</div>
                                <div className="text-sm text-gray-600">Vinculación laboral Post-Practica</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Funciones */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-600"/>
                        Principales Funciones
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Vinculación Empresarial</h4>
                                    <p className="text-sm text-gray-600">
                                        Establecer relaciones con empresas públicas y privadas para asegurar prácticas
                                        idóneas.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Formación Previa</h4>
                                    <p className="text-sm text-gray-600">Organizar y ejecutar formación antes del
                                        contrato de trabajo.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Diálogo Empresarial</h4>
                                    <p className="text-sm text-gray-600">
                                        Promover el diálogo sobre la importancia de la experiencia profesional.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Verificación</h4>
                                    <p className="text-sm text-gray-600">Verificar la idoneidad de empresas y lugares de
                                        prácticas.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Formación de Asesores</h4>
                                    <p className="text-sm text-gray-600">
                                        Selección y formación de asesores para el período de pasantía.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Seguimiento</h4>
                                    <p className="text-sm text-gray-600">
                                        Acompañamiento, supervisión y evaluación durante las prácticas.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Articulación</h4>
                                    <p className="text-sm text-gray-600">Facilitar la conexión entre el marco teórico y
                                        práctico.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Desarrollo Profesional</h4>
                                    <p className="text-sm text-gray-600">Posibilitar habilidades para grupos
                                        multidisciplinarios.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Equipo DIPPRO */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600"/>
                        Nuestro Equipo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div
                                className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <Users className="h-8 w-8 text-white"/>
                            </div>
                            <h4 className="font-semibold text-gray-800">Directora</h4>
                            <p className="text-sm text-gray-600">Coordinación general y relaciones institucionales</p>
                        </div>
                        <div className="text-center">
                            <div
                                className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <FileText className="h-8 w-8 text-white"/>
                            </div>
                            <h4 className="font-semibold text-gray-800">Coordinadores</h4>
                            <p className="text-sm text-gray-600">Seguimiento y evaluación de prácticas</p>
                        </div>
                        <div className="text-center">
                            <div
                                className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <Building2 className="h-8 w-8 text-white"/>
                            </div>
                            <h4 className="font-semibold text-gray-800">Asesores</h4>
                            <p className="text-sm text-gray-600">Adam Oliveros</p>
                            <p className="text-sm text-gray-600">Acompañamiento directo a estudiantes</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}