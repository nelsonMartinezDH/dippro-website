"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BarChart3, Workflow, Layers3, FileBadge } from "lucide-react";

import StepByStepManager from "@/admin/sections/for-students/practicas-profesionales/StepByStepManager";
import GedopracCardManager from "@/admin/sections/for-students/practicas-profesionales/GedopracCardManager";
import VinculationModalityManager from "@/admin/sections/for-students/practicas-profesionales/VinculationModalityManager";
import StatsManager from "@/admin/sections/for-students/practicas-profesionales/StatsManager";

const PracticasProfesionalesAdmin: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Accordion type="single" collapsible className="space-y-4">
        {/* Paso a Paso */}
        <AccordionItem value="stepbystep">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Workflow className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-blue-700 transition-colors">
                  Proceso Paso a Paso
                </h3>
                <p className="text-sm text-gray-500">Configura los pasos del proceso de práctica profesional.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
              <StepByStepManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Tarjetas Gedoprac */}
        <AccordionItem value="gedoprac">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Layers3 className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-green-700 transition-colors">
                  Tarjeta Informativa GEDOPRAC
                </h3>
                <p className="text-sm text-gray-500">Administra los recursos digitales pertenecientes a este componente.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
              <GedopracCardManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Modalidades */}
        <AccordionItem value="vinculacion">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <FileBadge className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                  Modalidades de Vinculación
                </h3>
                <p className="text-sm text-gray-500">Gestiona los tipos de vinculación para las prácticas.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
              <VinculationModalityManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Estadísticas */}
        <AccordionItem value="stats">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-purple-700 transition-colors">
                  Estadísticas Generales
                </h3>
                <p className="text-sm text-gray-500">Visualiza y administra métricas sobre las prácticas activas.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
              <StatsManager />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default PracticasProfesionalesAdmin;