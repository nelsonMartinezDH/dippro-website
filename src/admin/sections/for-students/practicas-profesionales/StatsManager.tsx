"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Briefcase, AlertCircle, TrendingUp, Users, Building2, Star, Save, CheckCircle2, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EmployabilityStat {
  id: number
  empresasAliadas: string
  empleabilidad: string
  estudiantesEnPracticas: string
  satisfaccionPromedio: string
}

const StatsManager: React.FC = () => {
  const [stats, setStats] = useState<EmployabilityStat>({
    id: 1,
    empresasAliadas: "",
    empleabilidad: "",
    estudiantesEnPracticas: "",
    satisfaccionPromedio: "",
  })
  const [originalStats, setOriginalStats] = useState<EmployabilityStat | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [saveDialog, setSaveDialog] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const apiUrl = "http://localhost:5213/api/employabilitystat"

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar las estadísticas")
        return res.json()
      })
      .then((data: EmployabilityStat) => {
        setStats(data)
        setOriginalStats(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error:", err)
        setError(err.message || "No se pudieron cargar las estadísticas")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (originalStats) {
      const changed =
        stats.empresasAliadas !== originalStats.empresasAliadas ||
        stats.empleabilidad !== originalStats.empleabilidad ||
        stats.estudiantesEnPracticas !== originalStats.estudiantesEnPracticas ||
        stats.satisfaccionPromedio !== originalStats.satisfaccionPromedio
      setHasChanges(changed)
    }
  }, [stats, originalStats])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setStats((prev) => ({
      ...prev,
      [id]: value,
    }))
    setSuccess(null)
    setError(null)
  }

  const confirmSave = () => {
    setSaveDialog(true)
  }

  const handleSave = () => {
    setSaving(true)
    setError(null)
    setSuccess(null)
    setSaveDialog(false)

    fetch(`${apiUrl}/${stats.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stats),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al guardar: ${res.statusText}`)
        }
        setSuccess("Estadísticas actualizadas exitosamente")
        setOriginalStats(stats)
        setHasChanges(false)
        setSaving(false)
        setTimeout(() => setSuccess(null), 3000)
      })
      .catch((err) => {
        console.error("Error al guardar:", err)
        setError("Error al guardar las estadísticas")
        setSaving(false)
        setTimeout(() => setError(null), 3000)
      })
  }

  if (loading && stats.empresasAliadas === "") {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      id: "empresasAliadas",
      label: "Empresas Aliadas",
      icon: Building2,
      placeholder: "Ej: 150+",
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-300",
      iconBg: "bg-blue-100",
    },
    {
      id: "empleabilidad",
      label: "Tasa de Empleabilidad",
      icon: TrendingUp,
      placeholder: "Ej: 87%",
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-300",
      iconBg: "bg-green-100",
    },
    {
      id: "estudiantesEnPracticas",
      label: "Estudiantes en Prácticas",
      icon: Users,
      placeholder: "Ej: 1,000+",
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-300",
      iconBg: "bg-purple-100",
    },
    {
      id: "satisfaccionPromedio",
      label: "Satisfacción Promedio",
      icon: Star,
      placeholder: "Ej: 4.8/5",
      color: "text-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      borderColor: "border-amber-300",
      iconBg: "bg-amber-100",
    },
  ]

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <Card className="border-l-4 border-l-blue-600 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <CardHeader className="pb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Gestión de Indicadores Estadisticos: Practicas Profesionales
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Configure las métricas clave que se mostrarán en el módulo público. Estas estadísticas ayudan a
                  demostrar el de la dependencia.
                </CardDescription>
              </div>
              {hasChanges && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700 border-2 border-amber-300 px-4 py-2 text-sm font-semibold shadow-md"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Cambios pendientes
                </Badge>
              )}
            </div>
          </CardHeader>
        </div>
      </Card>

      {success && (
        <Alert className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg animate-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="font-semibold text-green-800 text-base">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="border-2 border-red-500 bg-gradient-to-r from-red-50 to-rose-50 shadow-lg animate-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="font-semibold text-red-800 text-base">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.id}
              className="shadow-xl border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className={stat.bgColor}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${stat.iconBg} shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-7 w-7 ${stat.color}`} />
                    </div>
                    <Label htmlFor={stat.id} className="text-lg font-bold cursor-pointer text-gray-800">
                      {stat.label}
                    </Label>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <Input
                    id={stat.id}
                    type="text"
                    value={stats[stat.id as keyof EmployabilityStat]}
                    onChange={handleChange}
                    placeholder={stat.placeholder}
                    className={`h-14 text-xl font-bold border-2 ${stat.borderColor} focus:ring-4 focus:ring-offset-2 transition-all`}
                  />
                  <p className="text-xs text-gray-500 mt-2">Este valor se mostrará en el sitio público</p>
                </CardContent>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Botón Cancelar */}
        <Button
          variant="outline"
          onClick={() => {
            if (originalStats) {
              setStats(originalStats)
              setHasChanges(false)
              setSuccess(null)
              setError(null)
            }
          }}
          disabled={!hasChanges || saving}
          size="lg"
          className="w-full sm:w-auto h-14 px-10 text-lg font-bold border-2 border-gray-400 hover:bg-gray-100 transition-all"
        >
          Cancelar
        </Button>

        {/* Botón Guardar Cambios */}
        <Button
          onClick={confirmSave}
          disabled={saving || !hasChanges}
          size="lg"
          className="w-full sm:w-auto h-14 px-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
        >
          <Save className="h-5 w-5 mr-3" />
          {saving ? "Guardando cambios..." : "Guardar Cambios"}
        </Button>
      </div>

      <Dialog open={saveDialog} onOpenChange={setSaveDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Save className="h-6 w-6 text-blue-600" />
              </div>
              ¿Guardar cambios?
            </DialogTitle>
            <DialogDescription className="text-base pt-3">
              Las estadísticas actualizadas se mostrarán inmediatamente en el sitio público y serán visibles para todos
              los visitantes.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <p className="text-sm font-bold text-gray-700 mb-3">Cambios a guardar:</p>
            <div className="space-y-2">
              {originalStats && stats.empresasAliadas !== originalStats.empresasAliadas && (
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-medium">
                    Empresas Aliadas: <span className="font-bold text-blue-600">{stats.empresasAliadas}</span>
                  </p>
                </div>
              )}
              {originalStats && stats.empleabilidad !== originalStats.empleabilidad && (
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-medium">
                    Empleabilidad: <span className="font-bold text-green-600">{stats.empleabilidad}</span>
                  </p>
                </div>
              )}
              {originalStats && stats.estudiantesEnPracticas !== originalStats.estudiantesEnPracticas && (
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <Users className="h-5 w-5 text-purple-600" />
                  <p className="text-sm font-medium">
                    Estudiantes en Prácticas:{" "}
                    <span className="font-bold text-purple-600">{stats.estudiantesEnPracticas}</span>
                  </p>
                </div>
              )}
              {originalStats && stats.satisfaccionPromedio !== originalStats.satisfaccionPromedio && (
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <Star className="h-5 w-5 text-amber-600" />
                  <p className="text-sm font-medium">
                    Satisfacción Promedio:{" "}
                    <span className="font-bold text-amber-600">{stats.satisfaccionPromedio}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="gap-3 sm:gap-0 pt-4">
            <Button
              variant="outline"
              onClick={() => setSaveDialog(false)}
              className="h-12 px-6 text-base font-semibold"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Confirmar y Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StatsManager