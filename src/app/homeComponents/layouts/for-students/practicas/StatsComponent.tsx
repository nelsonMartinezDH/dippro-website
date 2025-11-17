"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface EmployabilityStat {
    id: number;
    empresasAliadas: string;
    empleabilidad: string;
    estudiantesEnPracticas: string;
    satisfaccionPromedio: string;
}

const StatsComponent: React.FC = () => {
    const [statistics, setStatistics] = useState<EmployabilityStat | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:5213/api/employabilitystat")
            .then((res) => {
                if (!res.ok) throw new Error("Fallo al cargar estadísticas de empleabilidad.");
                return res.json();
            })
            .then((data: EmployabilityStat) => setStatistics(data))
            .catch((err) => {
                console.error("Error al obtener estadísticas:", err);
                setError("No se pudieron cargar las estadísticas.");
            });
    }, []);

    return (
        <Card className="border-l-4 border-l-orange-500 shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                    Estadísticas de Empleabilidad
                </CardTitle>
                <p className="text-gray-600 text-sm md:text-base">
                    Datos actualizados sobre la empleabilidad y satisfacción de nuestros practicantes y egresados
                </p>
            </CardHeader>

            <CardContent>
                {error && (
                    <div className="text-center text-red-500 font-medium py-4">{error}</div>
                )}

                {!statistics && !error ? (
                    <div className="text-center text-gray-500 py-4">Cargando datos...</div>
                ) : statistics && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Empleabilidad */}
                        <div className="text-center p-4 bg-blue-50 rounded-lg shadow-sm">
                            <div className="text-3xl font-bold text-blue-600">{statistics.empleabilidad}</div>
                            <div className="text-sm text-gray-700">Empleabilidad</div>
                            <div className="text-xs text-blue-600">Promedio</div>
                        </div>

                        {/* Empresas Aliadas */}
                        <div className="text-center p-4 bg-green-50 rounded-lg shadow-sm">
                            <div className="text-3xl font-bold text-green-600">{statistics.empresasAliadas}</div>
                            <div className="text-sm text-gray-700">Empresas Aliadas</div>
                            <div className="text-xs text-green-600">Activas</div>
                        </div>

                        {/* Estudiantes en Prácticas */}
                        <div className="text-center p-4 bg-purple-50 rounded-lg shadow-sm">
                            <div className="text-3xl font-bold text-purple-600">{statistics.estudiantesEnPracticas}</div>
                            <div className="text-sm text-gray-700">Estudiantes</div>
                            <div className="text-xs text-purple-600">En prácticas</div>
                        </div>

                        {/* Satisfacción Promedio */}
                        <div className="text-center p-4 bg-orange-50 rounded-lg shadow-sm">
                            <div className="text-3xl font-bold text-orange-600">{statistics.satisfaccionPromedio}</div>
                            <div className="text-sm text-gray-700">Satisfacción</div>
                            <div className="text-xs text-orange-600">Promedio</div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StatsComponent;