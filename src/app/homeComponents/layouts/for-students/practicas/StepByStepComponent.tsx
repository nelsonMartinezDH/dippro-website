"use client";

import React, { useEffect, useState } from "react";
import { getSteps, PracticasStep } from "@/services/sections/for-students/practicas-profesionales/step-by-step-component/practicasStepService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Download,
    ExternalLink,
    FileText,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const apiBaseUrl = "http://localhost:5213";

const StepByStepComponent: React.FC = () => {
    const [steps, setSteps] = useState<PracticasStep[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        getSteps().then((data) => {
            const sorted = data.sort((a, b) => a.stepNumber - b.stepNumber);
            setSteps(sorted);
        });
    }, []);

    if (steps.length === 0) {
        return (
            <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-3 bg-blue-600 rounded-full">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        📚 Proceso de Prácticas Profesionales
                    </CardTitle>
                    <p className="text-gray-600 text-lg">
                        Guía visual interactiva del proceso desde la preparación hasta el cierre académico
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-500 py-10">
                        Cargando pasos del proceso...
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-blue-600 rounded-full">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                    📚 Proceso de Prácticas Profesionales
                </CardTitle>
                <p className="text-gray-600 text-lg">
                    Guía visual interactiva del proceso desde la preparación hasta el cierre académico
                </p>
            </CardHeader>

            <CardContent>
                <div className="space-y-8">
                    {/* SLIDER */}
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {steps.map((step, index) => (
                                    <div key={step.id} className="w-full flex-shrink-0 p-8">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                            {/* Texto */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg bg-${step.color}-600`}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-3xl font-bold text-gray-800">{step.title}</h3>
                                                        <p className="text-lg text-gray-600">{step.subtitle}</p>
                                                    </div>
                                                </div>

                                                <p className="text-gray-700 leading-relaxed">{step.description}</p>

                                                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                                                    <p className="text-sm text-yellow-800">💡 {step.tips}</p>
                                                </div>

                                                <div className="space-y-3">
                                                    <h4 className="font-semibold text-gray-800 text-lg">Acciones clave:</h4>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {step.actions.split(",").map((action, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-2 bg-gray-50 border p-1 rounded-md"
                                                            >
                                                                <CheckCircle className="h-5 w-5 text-blue-600" />
                                                                <span className="text-sm">{action.trim()}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Imagen */}
                                            <div className="flex justify-center">
                                                <div className="relative">
                                                    <img
                                                        src={`${apiBaseUrl}${step.imageUrl}`}
                                                        alt={step.title}
                                                        className="rounded-2xl shadow-2xl max-w-full h-auto border-4 border-white"
                                                    />
                                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold text-sm">{index + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controles */}
                        <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                            >
                                <ChevronLeft className="h-5 w-5" />
                                Anterior
                            </Button>

                            <div className="flex items-center gap-4">
                                <div className="flex gap-2">
                                    {steps.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentSlide(i)}
                                            className={`w-4 h-4 rounded-full ${
                                                currentSlide === i ? "bg-blue-600 scale-125" : "bg-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {currentSlide + 1} de {steps.length}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => setCurrentSlide((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                            >
                                Siguiente
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* BOTONES INFERIORES */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar Manual Completo
                        </Button>
                        <Button variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Acceder a GEDOPRAC
                        </Button>
                        <Button variant="outline">
                            <Mail className="h-4 w-4 mr-2" />
                            Contactar Soporte
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StepByStepComponent;