"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Lightbulb, TrendingUp, Building2, Users, Save, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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

interface CallStatisticsData {
  id: number
  convocatoriasActivas: string
  empresasAliadas: string
  estudiantesEnPractica: string
}

const CallStatisticsManager: React.FC = () => {
  const [stats, setStats] = useState<CallStatisticsData>({
    id: 1,
    convocatoriasActivas: "",
    empresasAliadas: "",
    estudiantesEnPractica: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const apiUrl = "http://localhost:5213/api/CallStatistics"

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Fallo al cargar estadísticas de convocatorias.")
        return res.json()
      })
      .then((data: CallStatisticsData) => {
        setStats(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(`Error al cargar: ${err.message}`)
        setLoading(false)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setStats((prev) => ({ ...prev, [id]: value }))
    setSuccess(null)
    setError(null)
  }

  const handleSaveClick = () => {
    setShowSaveDialog(true)
  }

  const handleConfirmSave = () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    setShowSaveDialog(false)

    fetch(`${apiUrl}/${stats.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stats),
    })
      .then((res) => {
        if (res.status === 204) {
          setSuccess("Estadísticas de convocatorias actualizadas con éxito.")
        } else if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`)
        }
      })
      .catch((err) => {
        setError(`Error al guardar: ${err.message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading && !stats.convocatoriasActivas) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600 font-medium">Cargando estadísticas...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-xl"
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="relative flex items-center gap-4">
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">Estadísticas de Convocatorias</h1>
              <p className="mt-1 text-blue-100">Actualiza las métricas clave del sistema</p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="font-semibold">Éxito</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="font-semibold">Error de Conexión</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gray-700 mb-6">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-medium">
                    Actualiza las cantidades de las métricas clave que se muestran en el sitio web
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="convocatoriasActivas"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      Convocatorias Activas
                    </Label>
                    <Input
                      id="convocatoriasActivas"
                      type="text"
                      value={stats.convocatoriasActivas}
                      onChange={handleChange}
                      placeholder="Ej: 15+"
                      className="h-11 border-2 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500">Número de convocatorias disponibles</p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="empresasAliadas"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Building2 className="h-4 w-4 text-indigo-600" />
                      Empresas Aliadas
                    </Label>
                    <Input
                      id="empresasAliadas"
                      type="text"
                      value={stats.empresasAliadas}
                      onChange={handleChange}
                      placeholder="Ej: 300+"
                      className="h-11 border-2 focus:border-indigo-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500">Total de empresas asociadas</p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="estudiantesEnPractica"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Users className="h-4 w-4 text-purple-600" />
                      Estudiantes en Práctica
                    </Label>
                    <Input
                      id="estudiantesEnPractica"
                      type="text"
                      value={stats.estudiantesEnPractica}
                      onChange={handleChange}
                      placeholder="Ej: 50+"
                      className="h-11 border-2 focus:border-purple-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500">Estudiantes actualmente en práctica</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleSaveClick}
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Guardando cambios...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Save className="h-5 w-5 text-blue-600" />
                Confirmar Actualización
              </AlertDialogTitle>

              {/* ✅ SOLO TEXTO DENTRO DEL DESCRIPTION */}
              <AlertDialogDescription>
                ¿Estás seguro de que deseas actualizar las estadísticas?
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* ✅ BLOQUES SEPARADOS FUERA DEL DESCRIPTION */}
            <div className="mt-4 space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Convocatorias Activas:</span>
                <span className="text-blue-600 font-semibold">{stats.convocatoriasActivas}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Empresas Aliadas:</span>
                <span className="text-indigo-600 font-semibold">{stats.empresasAliadas}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Estudiantes en Práctica:</span>
                <span className="text-purple-600 font-semibold">{stats.estudiantesEnPractica}</span>
              </div>
            </div>

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  )
}

export default CallStatisticsManager