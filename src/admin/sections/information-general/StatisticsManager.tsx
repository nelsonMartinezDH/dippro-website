"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Save, TrendingUp, Building2, GraduationCap, Briefcase } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { motion } from "framer-motion"

interface StatisticsDto {
  idDto: number
  empresasAliadasDto: string
  tasaExitoDto: string
  estudiantesAnioDto: string
  vinculacionLaboralDto: string
}

const apiUrl = "http://localhost:5213/api/statistics"

const StatisticsManager: React.FC = () => {
  const [stats, setStats] = useState<StatisticsDto>({
    idDto: 1,
    empresasAliadasDto: "",
    tasaExitoDto: "",
    estudiantesAnioDto: "",
    vinculacionLaboralDto: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [openConfirm, setOpenConfirm] = useState(false)

  // Cargar datos iniciales
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar las estadísticas.")
        return res.json()
      })
      .then((data: StatisticsDto) => {
        setStats(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error:", err)
        setError("No se pudieron cargar los datos. Intenta nuevamente.")
        setLoading(false)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setStats((prev) => ({ ...prev, [id]: value }))
    setError(null)
    setSuccess(null)
  }

  const handleSave = () => {
    setLoading(true)
    setOpenConfirm(false)
    setError(null)
    setSuccess(null)

    fetch(`${apiUrl}/${stats.idDto}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stats),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar los datos.")
        setSuccess("Estadísticas actualizadas con éxito.")
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error:", err)
        setError("No se pudo guardar la información.")
        setLoading(false)
      })
  }

  if (loading && stats.empresasAliadasDto === "") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <Card className="shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 text-white pb-8 pt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold">Gestión de Indicadores Estadisticos: Información General</CardTitle>
              <p className="text-green-100 text-sm mt-1">Actualiza los indicadores institucionales de desempeño</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <AlertTitle className="font-semibold">Operación Exitosa</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle className="font-semibold">Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="empresasAliadasDto" className="flex items-center gap-2 text-gray-700 font-medium">
                <Building2 className="h-4 w-4 text-sky-500" />
                Empresas Aliadas
              </Label>
              <Input
                id="empresasAliadasDto"
                type="text"
                value={stats.empresasAliadasDto}
                onChange={handleChange}
                placeholder="Ej: 700+"
                className="h-11 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tasaExitoDto" className="flex items-center gap-2 text-gray-700 font-medium">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                Tasa de Éxito
              </Label>
              <Input
                id="tasaExitoDto"
                type="text"
                value={stats.tasaExitoDto}
                onChange={handleChange}
                placeholder="Ej: 95%"
                className="h-11 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estudiantesAnioDto" className="flex items-center gap-2 text-gray-700 font-medium">
                <GraduationCap className="h-4 w-4 text-violet-500" />
                Estudiantes por Año
              </Label>
              <Input
                id="estudiantesAnioDto"
                type="text"
                value={stats.estudiantesAnioDto}
                onChange={handleChange}
                placeholder="Ej: 1,200+"
                className="h-11 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vinculacionLaboralDto" className="flex items-center gap-2 text-gray-700 font-medium">
                <Briefcase className="h-4 w-4 text-rose-500" />
                Vinculación Laboral
              </Label>
              <Input
                id="vinculacionLaboralDto"
                type="text"
                value={stats.vinculacionLaboralDto}
                onChange={handleChange}
                placeholder="Ej: 86%"
                className="h-11 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => setOpenConfirm(true)}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-lime-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              <Save className="mr-2 h-5 w-5" />
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-indigo-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                Confirmar Actualización
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600 text-base leading-relaxed">
              ¿Estás seguro de que deseas actualizar las estadísticas? Esta acción reemplazará los valores actuales con
              la nueva información.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel className="border-gray-300 hover:bg-gray-100">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}

export default StatisticsManager
