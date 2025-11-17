"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart3, Users, FolderOpen, Image, BarChart2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// 🔹 Importa los componentes de gestión
import ConvocatoriasManager from "@/admin/sections/convocatorias/ConvocatoriasManager";
import TeamManager from "@/admin/sections/information-general/TeamManager";
import StatisticsManager from "@/admin/sections/information-general/StatisticsManager";
import StatsManager from "@/admin/sections/for-students/practicas-profesionales/StatsManager";
import CallStatisticsManager from "@/admin/sections/convocatorias/CallStatisticsManager";
import SliderManager from "@/admin/sections/information-general/SliderManager";
import CallHeroImageManager from "@/admin/sections/convocatorias/CallHeroImageManager";

const API_BASE = "http://localhost:5213/api";

const Dashboard: React.FC = () => {
  const [convocatoriasCount, setConvocatoriasCount] = useState<number>(0);
  const [teamCount, setTeamCount] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  // 🔹 Obtener convocatorias activas
  useEffect(() => {
    const fetchConvocatorias = async () => {
      try {
        const res = await fetch(`${API_BASE}/convocatorias`);
        if (!res.ok) throw new Error("Error al obtener convocatorias");
        const data = await res.json();
        const activas = data.filter((c: any) => c.status?.toLowerCase() === "activa").length;
        setConvocatoriasCount(activas);
      } catch (err) {
        console.error("Error al cargar convocatorias:", err);
      }
    };
    fetchConvocatorias();
  }, []);

  // 🔹 Obtener miembros del equipo
  useEffect(() => {
    const fetchTeamCount = async () => {
      try {
        const res = await fetch(`${API_BASE}/team`);
        if (!res.ok) throw new Error("Error al obtener miembros del equipo");
        const data = await res.json();
        setTeamCount(data.length);
      } catch {
        setTeamCount(0);
      }
    };
    fetchTeamCount();
  }, []);

  const statCards = [
    {
      title: "Convocatorias Activas",
      value: convocatoriasCount.toString(),
      subtitle: "Actualmente publicadas",
      color: "from-blue-500 to-blue-400",
      icon: <FolderOpen className="h-5 w-5 text-blue-800" />,
    },
    {
      title: "Miembros del Equipo",
      value: teamCount !== null ? teamCount.toString() : "—",
      subtitle: "Activos actualmente",
      color: "from-yellow-400 to-yellow-300",
      icon: <Users className="h-5 w-5 text-yellow-800" />,
    },
    {
      title: "Estadísticas",
      value: "3",
      subtitle: "Paneles disponibles",
      color: "from-green-500 to-green-400",
      icon: <BarChart3 className="h-5 w-5 text-green-800" />,
    },
    {
      title: "Recursos Visuales",
      value: "2",
      subtitle: "Hero y Slider",
      color: "from-purple-500 to-purple-400",
      icon: <Image className="h-5 w-5 text-purple-800" />,
    },
  ];

  const quickActions = [
    { title: "Gestionar Convocatorias", subtitle: "Controla las publicaciones activas", icon: <FolderOpen className="h-5 w-5 text-blue-600" />, color: "hover:bg-blue-50", dialog: "convocatorias" },
    { title: "Gestionar Equipo", subtitle: "Edita miembros del equipo institucional", icon: <Users className="h-5 w-5 text-yellow-500" />, color: "hover:bg-yellow-50", dialog: "equipo" },
    { title: "Estadísticas Generales", subtitle: "Actualiza indicadores institucionales", icon: <BarChart2 className="h-5 w-5 text-green-600" />, color: "hover:bg-green-50", dialog: "estadisticas" },
    { title: "Recursos Visuales", subtitle: "Gestiona sliders e imágenes de portada", icon: <Image className="h-5 w-5 text-purple-600" />, color: "hover:bg-purple-50", dialog: "recursos" },
  ];

  const renderDialogContent = () => {
    const frame = (children: React.ReactNode, color: string) => (
      <div className={`border ${color} bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg`}>{children}</div>
    );

    switch (openDialog) {
      case "convocatorias":
        return frame(<ConvocatoriasManager />, "border-blue-200");
      case "equipo":
        return frame(<TeamManager />, "border-yellow-200");
      case "estadisticas":
        return (
          <div className="space-y-6">
            {frame(<StatisticsManager />, "border-green-200")}
            {frame(<StatsManager />, "border-green-200")}
            {frame(<CallStatisticsManager />, "border-green-200")}
          </div>
        );
      case "recursos":
        return (
          <div className="space-y-6">
            {frame(<SliderManager />, "border-purple-200")}
            {frame(<CallHeroImageManager />, "border-purple-200")}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-10">
        {/* --- ENCABEZADO --- */}
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 text-white">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ duration: 1 }} className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/geometry.png')] opacity-10" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-bold tracking-tight drop-shadow-sm">Panel Administrativo</CardTitle>
            <p className="text-blue-100 text-sm mt-1">Universidad del Magdalena — Dirección de Prácticas Profesionales</p>
          </CardHeader>
        </Card>

        {/* --- ESTADÍSTICAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="group border border-gray-100 hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-gray-700 text-sm font-semibold">{card.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${card.color} bg-opacity-20`}>{card.icon}</div>
                </CardHeader>
                <CardContent>
                  <motion.p initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 + index * 0.1 }} className="text-3xl font-extrabold text-gray-900">
                    {card.value}
                  </motion.p>
                  <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* --- ACCIONES RÁPIDAS --- */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-1">Acciones Rápidas</h2>
          <p className="text-sm text-gray-500 mb-6">Accede a las herramientas principales del panel administrativo.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quickActions.map((action, index) => (
              <motion.div key={action.title} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }}>
                <Card onClick={() => setOpenDialog(action.dialog)} className={`cursor-pointer border border-gray-100 group shadow-sm transition-all ${action.color}`}>
                  <CardContent className="flex items-center justify-between py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-white shadow-inner">{action.icon}</div>
                      <div>
                        <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition">{action.title}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{action.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* --- DIALOG PRINCIPAL --- */}
      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-6xl bg-gray-50 p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[85vh] border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              {openDialog === "convocatorias" && "Gestión de Convocatorias"}
              {openDialog === "equipo" && "Gestión del Equipo"}
              {openDialog === "estadisticas" && "Panel de Estadísticas"}
              {openDialog === "recursos" && "Gestión de Recursos Visuales"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6 space-y-6">{renderDialogContent()}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;