"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Images, BarChart3, Users } from "lucide-react";
import SliderManager from "@/admin/sections/information-general/SliderManager";
import StatisticsManager from "@/admin/sections/information-general/StatisticsManager";
import TeamManager from "@/admin/sections/information-general/TeamManager";

const InformationGeneralAdmin: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      {/* --- ENCABEZADO PRINCIPAL --- */}
      <Card className="relative overflow-hidden shadow-xl border-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white rounded-2xl">
        <div className="absolute inset-0 bg-[url('https://www.unimagdalena.edu.co/Content/images/bg-blue-pattern.svg')] bg-cover opacity-15" />
        <CardHeader className="relative z-10 py-10">
          <CardTitle className="text-3xl font-bold tracking-tight drop-shadow-md">
            Gestión de la Sección:{" "}
            <span className="text-yellow-300">Información General</span>
          </CardTitle>
          <p className="text-blue-100 mt-1 text-sm max-w-3xl leading-relaxed">
            Administra los componentes principales del portal DIPPRO:
            el <b>Slider institucional</b>, las <b>Estadísticas generales</b> y
            el <b>Equipo institucional</b>. Expande cada módulo para editar su contenido.
          </p>
        </CardHeader>
      </Card>

      {/* --- SECCIONES EN ACCORDION --- */}
      <Accordion type="multiple" className="space-y-6">
        {/* --- SLIDER --- */}
        <AccordionItem
          value="slider"
          className="border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white"
        >
          <AccordionTrigger
            className="group w-full flex items-center justify-between px-6 py-5 cursor-pointer no-underline hover:no-underline focus:no-underline"
            style={{
              boxShadow: "none",
              textDecoration: "none",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Images className="h-6 w-6 text-blue-700" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  Gestión del Slider Principal
                </h3>
                <p className="text-sm text-gray-500">
                  Administra las imágenes destacadas del portal institucional.
                </p>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent asChild>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-6 pb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-b-2xl"
            >
              <div className="mt-4">
                <SliderManager />
              </div>
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        {/* --- ESTADÍSTICAS --- */}
        <AccordionItem
          value="statistics"
          className="border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white"
        >
          <AccordionTrigger
            className="group w-full flex items-center justify-between px-6 py-5 cursor-pointer no-underline hover:no-underline focus:no-underline"
            style={{
              boxShadow: "none",
              textDecoration: "none",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-green-700" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                  Gestión de Estadísticas Generales
                </h3>
                <p className="text-sm text-gray-500">
                  Modifica los indicadores institucionales visibles en el portal.
                </p>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent asChild>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-6 pb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-b-2xl"
            >
              <div className="mt-4">
                <StatisticsManager />
              </div>
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        {/* --- EQUIPO --- */}
        <AccordionItem
          value="team"
          className="border border-yellow-100 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white"
        >
          <AccordionTrigger
            className="group w-full flex items-center justify-between px-6 py-5 cursor-pointer no-underline hover:no-underline focus:no-underline"
            style={{
              boxShadow: "none",
              textDecoration: "none",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Users className="h-6 w-6 text-yellow-700" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-yellow-700 transition-colors">
                  Gestión del Equipo Institucional
                </h3>
                <p className="text-sm text-gray-500">
                  Administra los miembros del equipo de prácticas profesionales.
                </p>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent asChild>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-6 pb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-b-2xl"
            >
              <div className="mt-4">
                <TeamManager />
              </div>
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default InformationGeneralAdmin;