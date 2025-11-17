"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Building2,
  Layers,
  BookOpenCheck,
  FootprintsIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import CalendarManager from "@/admin/sections/for-companies/CalendarManager";
import FeaturedCompaniesManager from "@/admin/sections/for-companies/FeaturedCompaniesManager";
import ModalityManager from "@/admin/sections/for-companies/ModalityManager";
import StepResourceManager from "@/admin/sections/for-companies/StepResourceManager";
import TutorGuideManager from "@/admin/sections/for-companies/TutorGuideManager";

const ForCompaniesAdmin: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      {/* --- ENCABEZADO GENERAL --- */}
      <Card className="relative overflow-hidden shadow-lg border-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('https://www.unimagdalena.edu.co/Content/images/bg-blue-pattern.svg')] bg-cover opacity-20" />
        <CardHeader className="relative z-10 py-8">
          <CardTitle className="text-3xl font-semibold tracking-tight drop-shadow-sm">
            Gestión de la Sección:{" "}
            <span className="text-yellow-300">Para Empresas</span>
          </CardTitle>
          <p className="text-blue-100 mt-2 text-sm max-w-3xl leading-relaxed">
            Administra los módulos visibles en la sección institucional para
            empresas aliadas de la DIPPRO: calendario, empresas
            destacadas, modalidades, recursos paso a paso y guías para tutores.
          </p>
        </CardHeader>
      </Card>

      {/* --- ACCORDIONS --- */}
      <Accordion type="single" collapsible className="space-y-6">
        {/* PASOS Y RECURSOS */}
        <AccordionItem
          value="steps"
          className="border border-purple-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all"
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline group focus:outline-none">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl transition-all duration-200 group-hover:bg-purple-200">
                <FootprintsIcon className="h-6 w-6 text-purple-700 group-hover:text-purple-900 transition-colors" />
              </div>
              <div className="text-left">
                <h2 className="text-base font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  Recursos Paso a Paso
                </h2>
                <p className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
                  Controla los pasos y materiales explicativos para el recurso guia Paso a paso
                  para las empresas.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-b-2xl">
            <StepResourceManager />
          </AccordionContent>
        </AccordionItem>

        {/* MODALIDADES */}
        <AccordionItem
          value="modality"
          className="border border-green-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all"
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline group focus:outline-none">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl transition-all duration-200 group-hover:bg-green-200">
                <Layers className="h-6 w-6 text-green-700 group-hover:text-green-900 transition-colors" />
              </div>
              <div className="text-left">
                <h2 className="text-base font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                  Modalidades de Práctica
                </h2>
                <p className="text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                  Configura y actualiza las modalidades disponibles para
                  empresas.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-b-2xl">
            <ModalityManager />
          </AccordionContent>
        </AccordionItem>

        {/* GUÍAS DE TUTORES */}
        <AccordionItem
          value="tutors"
          className="border border-orange-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all"
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline group focus:outline-none">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-xl transition-all duration-200 group-hover:bg-orange-200">
                <BookOpenCheck className="h-6 w-6 text-orange-600 group-hover:text-orange-800 transition-colors" />
              </div>
              <div className="text-left">
                <h2 className="text-base font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
                  Guías para Tutores Empresariales
                </h2>
                <p className="text-sm text-gray-500 group-hover:text-orange-600 transition-colors">
                  Gestiona materiales, guías y recursos para los tutores de
                  empresas.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-b-2xl">
            <TutorGuideManager />
          </AccordionContent>
        </AccordionItem>

        {/* CALENDARIO */}
        <AccordionItem
          value="calendar"
          className="border border-blue-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all"
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline group focus:outline-none">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl transition-all duration-200 group-hover:bg-blue-200">
                <CalendarDays className="h-6 w-6 text-blue-700 group-hover:text-blue-900 transition-colors" />
              </div>
              <div className="text-left">
                <h2 className="text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  Calendario Institucional
                </h2>
                <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                  Gestiona los eventos y fechas clave para las empresas aliadas.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-b-2xl">
            <CalendarManager />
          </AccordionContent>
        </AccordionItem>

        {/* EMPRESAS DESTACADAS */}
        <AccordionItem
          value="featured"
          className="border border-yellow-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all"
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline group focus:outline-none">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-xl transition-all duration-200 group-hover:bg-yellow-200">
                <Building2 className="h-6 w-6 text-yellow-600 group-hover:text-yellow-800 transition-colors" />
              </div>
              <div className="text-left">
                <h2 className="text-base font-semibold text-gray-800 group-hover:text-yellow-700 transition-colors">
                  Empresas Destacadas
                </h2>
                <p className="text-sm text-gray-500 group-hover:text-yellow-600 transition-colors">
                  Administra las empresas destacadas y aliadas en el portal público .
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-b-2xl">
            <FeaturedCompaniesManager />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default ForCompaniesAdmin;