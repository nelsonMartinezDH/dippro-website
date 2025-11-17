"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CalendarDays, FileText, BookOpen } from "lucide-react";

import CalendarPrePracticasManager from "@/admin/sections/for-students/pre-practicas/CalendarPrePracticasManager";
import PrePracticasProcessManager from "@/admin/sections/for-students/pre-practicas/PrePracticasProcessManager";
import PrePracticasResourcesManager from "@/admin/sections/for-students/pre-practicas/PrePracticasResourcesManager";

const PrePracticasAdmin: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Accordion type="single" collapsible className="space-y-4">
        {/* Proceso */}
        <AccordionItem value="process">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <FileText className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-green-700 transition-colors">
                  Proceso de Pre-Prácticas
                </h3>
                <p className="text-sm text-gray-500">
                  Gestiona los recursos en el componente guia Paso a Paso para las Pre-Practicas.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
              <PrePracticasProcessManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Calendario */}
        <AccordionItem value="calendar">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <CalendarDays className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-blue-700 transition-colors">
                  Calendario de Pre-Prácticas
                </h3>
                <p className="text-sm text-gray-500">Gestiona las fechas clave y plazos del proceso.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
              <CalendarPrePracticasManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Recursos */}
        <AccordionItem value="resources">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <BookOpen className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-yellow-600 transition-colors">
                  Recursos para Pre-Prácticas
                </h3>
                <p className="text-sm text-gray-500">
                  Administra documentos, guías y materiales informativos.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
              <PrePracticasResourcesManager />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default PrePracticasAdmin;