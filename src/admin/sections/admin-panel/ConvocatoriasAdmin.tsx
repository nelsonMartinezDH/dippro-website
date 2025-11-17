"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Megaphone, Image, BarChart3 } from "lucide-react";

import CallHeroImageManager from "@/admin/sections/convocatorias/CallHeroImageManager";
import CallStatisticsManager from "@/admin/sections/convocatorias/CallStatisticsManager";
import ConvocatoriasManager from "@/admin/sections/convocatorias/ConvocatoriasManager";

const ConvocatoriasAdmin: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | undefined>("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      {/* --- ENCABEZADO PRINCIPAL --- */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white border border-blue-700/30">
        <div className="absolute inset-0 bg-[url('https://www.unimagdalena.edu.co/Content/images/bg-blue-pattern.svg')] bg-cover opacity-20" />
        <div className="relative z-10 p-8">
          <h1 className="text-3xl font-semibold tracking-tight drop-shadow-sm">
            Gestión de la Sección:{" "}
            <span className="text-yellow-300">Convocatorias</span>
          </h1>
          <p className="text-blue-100 mt-2 text-sm max-w-3xl leading-relaxed">
            Administra el contenido de la sección de convocatorias del portal
            DIPPRO, incluyendo su imagen principal, estadísticas y convocatorias activas o pasadas.
          </p>
        </div>
      </div>

      {/* --- ACORDEONES DE GESTIÓN --- */}
      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
        className="space-y-5"
      >
        {/* --- HERO IMAGE --- */}
        <AccordionItem value="hero-image">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl shadow-sm">
                <Image className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-lg hover:text-blue-700 transition-colors">
                  Imagen Principal de Convocatorias
                </h2>
                <p className="text-sm text-gray-500">
                  Gestiona la imagen destacada que se muestra en la cabecera de la sección.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
              <CallHeroImageManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* --- ESTADÍSTICAS --- */}
        <AccordionItem value="call-stats">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl shadow-sm">
                <BarChart3 className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-lg hover:text-green-700 transition-colors">
                  Estadísticas de Convocatorias
                </h2>
                <p className="text-sm text-gray-500">
                  Modifica los indicadores y métricas clave mostradas en el hero principal de la sección.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-white border border-green-100 rounded-xl p-6 shadow-sm">
              <CallStatisticsManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* --- CONVOCATORIAS --- */}
        <AccordionItem value="convocatorias">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-xl shadow-sm">
                <Megaphone className="h-6 w-6 text-yellow-700" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-lg hover:text-yellow-700 transition-colors">
                  Administración de panel: Convocatorias
                </h2>
                <p className="text-sm text-gray-500">
                  Agrega, edita o elimina las convocatorias publicadas en el sitio web institucional.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-white border border-yellow-100 rounded-xl p-6 shadow-sm">
              <ConvocatoriasManager />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default ConvocatoriasAdmin;