"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { GraduationCap, ClipboardList, BookOpenCheck, MessageSquareText, Briefcase } from "lucide-react";

// Subcomponentes (las subsecciones)
import PrePracticasAdmin from "@/admin/sections/admin-panel/for-students/pre-practicas/PrePracticasAdmin";
import PracticasProfesionalesAdmin from "@/admin/sections/admin-panel/for-students/practicas-profesionales/PracticasProfesionalesAdmin";
import TestimoniosAdmin from "@/admin/sections/admin-panel/for-students/testimonios/TestimoniosAdmin";

const ForStudentsAdmin: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      {/* --- ENCABEZADO --- */}
      <Card className="relative overflow-hidden shadow-lg border-0 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white">
        <div className="absolute inset-0 bg-[url('https://www.unimagdalena.edu.co/Content/images/bg-blue-pattern.svg')] bg-cover opacity-20" />
        <CardHeader className="relative z-10 py-8">
          <CardTitle className="text-3xl font-semibold tracking-tight drop-shadow-sm">
            Gestión de la Sección:{" "}
            <span className="text-yellow-300">Para Estudiantes</span>
          </CardTitle>
          <p className="text-blue-100 mt-2 text-sm max-w-3xl leading-relaxed">
            Administra los procesos, recursos y testimonios relacionados con la experiencia
            de los estudiantes en sus prácticas profesionales.
          </p>
        </CardHeader>
      </Card>

      {/* --- ACCORDION PRINCIPAL --- */}
      <Accordion type="single" collapsible className="space-y-6">
        {/* --- PREPRÁCTICAS --- */}
        <AccordionItem value="prepracticas">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpenCheck className="h-6 w-6 text-blue-700" />
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-gray-900 text-base hover:text-blue-700 transition-colors">
                  Gestión de Pre-Prácticas
                </h2>
                <p className="text-sm text-gray-500">
                  Administra los recursos, calendarios y procesos previos al inicio de las prácticas.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mt-2 shadow-inner">
              <PrePracticasAdmin />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* --- PRÁCTICAS PROFESIONALES --- */}
        <AccordionItem value="practicas">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Briefcase className="h-6 w-6 text-green-700" />
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-gray-900 text-base hover:text-green-700 transition-colors">
                  Gestión de Prácticas Profesionales
                </h2>
                <p className="text-sm text-gray-500">
                  Administra los pasos, modalidades, recursos y estadísticas del proceso de prácticas.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mt-2 shadow-inner">
              <PracticasProfesionalesAdmin />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* --- TESTIMONIOS --- */}
        <AccordionItem value="testimonios">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <MessageSquareText className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-gray-900 text-base hover:text-yellow-600 transition-colors">
                  Testimonios de Estudiantes
                </h2>
                <p className="text-sm text-gray-500">
                  Gestiona los testimonios y experiencias compartidas por los estudiantes.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mt-2 shadow-inner">
              <TestimoniosAdmin />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default ForStudentsAdmin;