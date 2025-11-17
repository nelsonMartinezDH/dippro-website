"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Users} from "lucide-react";
import {StudentTestimonyPreview} from "@/services/sections/information-general/StudentTestimonyPreview";

const API_URL = "http://localhost:5213/api/StudentTestimony";
const BACKEND_URL = "http://localhost:5213";

const StudentExperiencesComponent = () => {
    const [testimonies, setTestimonies] = useState<StudentTestimonyPreview[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(API_URL);
                const data: StudentTestimonyPreview[] = await res.json();

                setTestimonies(data.slice(0, 3));
            } catch (error) {
                console.error("Error cargando testimonios:", error);
            }
        };

        fetchData();
    }, []);

    // Función para generar iniciales si no hay foto
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0].toUpperCase())
            .join("");
    };

    return (
        <Card className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-2 border-pink-200 shadow-xl">
            <CardHeader className="text-center pb-6">
                <div
                    className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-white"/>
                </div>

                <CardTitle
                    className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    🌟 Experiencias Estudiantiles
                </CardTitle>

                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Descubre cómo nuestros estudiantes han transformado sus prácticas profesionales en oportunidades
                    de crecimiento y éxito laboral
                </p>
            </CardHeader>

            <CardContent className="space-y-8">

                {/* Testimonios dinámicos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonies.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-pink-100"
                        >
                            <div className="flex items-center gap-3 mb-4">

                                {/* Imagen o iniciales */}
                                {item.profileImageUrl ? (
                                    <img
                                        src={`${BACKEND_URL}${item.profileImageUrl}`}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.currentTarget.src = "/default-avatar.png"; // opcional fallback
                                        }}
                                        className="w-12 h-12 rounded-full object-cover border border-purple-300"
                                    />
                                ) : (
                                    <div
                                        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            {getInitials(item.name)}
                                        </span>
                                    </div>
                                )}

                                <div>
                                    <h5 className="font-bold text-gray-800">{item.name}</h5>
                                    <p className="text-sm text-purple-600 font-medium">{item.program}</p>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4 italic">
                                "{item.recommendations || "Sin recomendaciones registradas"}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Botón para ver todos */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg text-lg py-6 font-semibold"
                    >
                        <Users className="h-5 w-5 mr-2"/>
                        Ver Todos los Testimonios
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
};

export default StudentExperiencesComponent;