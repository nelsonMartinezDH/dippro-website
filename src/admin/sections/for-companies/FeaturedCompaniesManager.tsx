"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Star, Trash2, Edit, Save, X, AlertTriangle, CheckCircle, Award } from "lucide-react"
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

interface FeaturedTopCompanyDto {
  id: number
  periodNameDto: string
  companyNameDto: string
  logoUrlDto?: string
  highlightReasonDto: string
  internsCountDto: number
  satisfactionPercentageDto: number
  yearsAlliedDto: number
}

interface FeaturedCompanyDto {
  id: number
  periodNameDto: string
  companyNameDto: string
  logoUrlDto?: string
}

const apiTopUrl = "http://localhost:5213/api/FeaturedTopCompany"
const apiCompanyUrl = "http://localhost:5213/api/FeaturedCompany"
const baseServerUrl = "http://localhost:5213"

const FeaturedCompaniesManager: React.FC = () => {
  const [topCompany, setTopCompany] = useState<FeaturedTopCompanyDto | null>(null)
  const [featuredCompanies, setFeaturedCompanies] = useState<FeaturedCompanyDto[]>([])
  const [fileTop, setFileTop] = useState<File | null>(null)
  const [loadingTop, setLoadingTop] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const [formTop, setFormTop] = useState({
    periodNameDto: "",
    companyNameDto: "",
    highlightReasonDto: "",
    internsCountDto: "",
    satisfactionPercentageDto: "",
    yearsAlliedDto: "",
  })

  const [formCompany, setFormCompany] = useState({ periodNameDto: "", companyNameDto: "" })
  const [fileCompany, setFileCompany] = useState<File | null>(null)
  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null)
  const [editCompanyName, setEditCompanyName] = useState("")
  const [editPeriodName, setEditPeriodName] = useState("")
  const [editFile, setEditFile] = useState<File | null>(null)

  // Dialog states
  const [deleteCompanyDialogOpen, setDeleteCompanyDialogOpen] = useState(false)
  const [pendingDeleteCompanyId, setPendingDeleteCompanyId] = useState<number | null>(null)
  const [pendingDeleteCompanyName, setPendingDeleteCompanyName] = useState("")

  const getFullImageUrl = (path?: string) => (path && !path.startsWith("http") ? `${baseServerUrl}${path}` : path || "")

  useEffect(() => {
    fetch(apiTopUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const top = data[0]
          setTopCompany(top)
          setFormTop({
            periodNameDto: top.periodNameDto,
            companyNameDto: top.companyNameDto,
            highlightReasonDto: top.highlightReasonDto,
            internsCountDto: top.internsCountDto.toString(),
            satisfactionPercentageDto: top.satisfactionPercentageDto.toString(),
            yearsAlliedDto: top.yearsAlliedDto.toString(),
          })
        }
      })
      .catch((err) => console.error("Error al cargar empresa top:", err))

    fetch(apiCompanyUrl)
      .then((res) => res.json())
      .then((data) => setFeaturedCompanies(data))
      .catch((err) => console.error("Error al cargar empresas destacadas:", err))
  }, [])

  const handleSaveTopCompany = async () => {
    setLoadingTop(true)
    const formData = new FormData()
    Object.entries(formTop).forEach(([key, value]) => formData.append(key.replace("Dto", ""), value.toString()))
    if (fileTop) formData.append("File", fileTop)

    const method = topCompany ? "PUT" : "POST"
    const url = topCompany ? `${apiTopUrl}/update/${topCompany.id}` : `${apiTopUrl}/upload`

    try {
      const res = await fetch(url, { method, body: formData })
      if (!res.ok) throw new Error("Error al guardar empresa top")

      const updated = topCompany ? { ...topCompany, ...formTop } : await res.json()
      setTopCompany(updated)
      setMessage("✅ Empresa Top guardada/actualizada correctamente")
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      console.error(err)
      alert("❌ Error al guardar la empresa top")
    } finally {
      setLoadingTop(false)
    }
  }

  const handleAddCompany = async () => {
    if (featuredCompanies.length >= 5) {
      alert("Solo se permiten 5 empresas aliadas destacadas por periodo.")
      return
    }

    const formData = new FormData()
    formData.append("PeriodName", formCompany.periodNameDto)
    formData.append("CompanyName", formCompany.companyNameDto)
    if (fileCompany) formData.append("File", fileCompany)

    try {
      const res = await fetch(`${apiCompanyUrl}/upload`, {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Error al agregar empresa aliada")
      const newCompany = await res.json()
      setFeaturedCompanies((prev) => [...prev, newCompany])
      setFormCompany({ periodNameDto: "", companyNameDto: "" })
      setFileCompany(null)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) fileInput.value = ""

      setMessage("✅ Empresa aliada agregada correctamente")
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      console.error(err)
      alert("❌ Error al agregar empresa aliada")
    }
  }

  const handleEditCompany = async (id: number) => {
    const formData = new FormData()
    formData.append("PeriodName", editPeriodName)
    formData.append("CompanyName", editCompanyName)
    if (editFile) formData.append("File", editFile)

    try {
      const res = await fetch(`${apiCompanyUrl}/update/${id}`, {
        method: "PUT",
        body: formData,
      })
      if (!res.ok) throw new Error("Error al actualizar empresa aliada")
      setFeaturedCompanies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, companyNameDto: editCompanyName, periodNameDto: editPeriodName } : c)),
      )
      setEditingCompanyId(null)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) fileInput.value = ""

      setMessage("✅ Empresa aliada actualizada")
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      console.error(err)
      alert("❌ Error al actualizar empresa aliada")
    }
  }

  const handleDeleteCompanyClick = (id: number, name: string) => {
    setPendingDeleteCompanyId(id)
    setPendingDeleteCompanyName(name)
    setDeleteCompanyDialogOpen(true)
  }

  const handleDeleteCompanyConfirm = async () => {
    if (!pendingDeleteCompanyId) return

    try {
      const res = await fetch(`${apiCompanyUrl}/${pendingDeleteCompanyId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Error al eliminar empresa aliada")
      setFeaturedCompanies((prev) => prev.filter((c) => c.id !== pendingDeleteCompanyId))
      setMessage("🗑️ Empresa aliada eliminada")
      setTimeout(() => setMessage(null), 2500)
    } catch (err) {
      console.error(err)
      alert("❌ Error al eliminar empresa aliada")
    }

    setDeleteCompanyDialogOpen(false)
    setPendingDeleteCompanyId(null)
    setPendingDeleteCompanyName("")
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white pb-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Award className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Empresas Aliadas Destacadas</h2>
                <p className="text-yellow-100 text-sm mt-1">
                  Administra el top de empresas aliadas destacadas de cada semestre
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 border rounded-lg flex items-center gap-3 shadow-sm ${message.includes("✅")
              ? "bg-green-50 border-green-200 text-green-700"
              : message.includes("🗑️")
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-gray-50 border-gray-300 text-gray-700"
              }`}
          >
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Empresa Aliada del Semestre</h3>
          </div>

          <Card className="shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Periodo</Label>
                  <Input
                    placeholder="Periodo (Ej: Periodo I 2025)"
                    value={formTop.periodNameDto}
                    onChange={(e) => setFormTop({ ...formTop, periodNameDto: e.target.value })}
                    className="border-2 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Nombre de la Empresa</Label>
                  <Input
                    placeholder="Nombre de la Empresa"
                    value={formTop.companyNameDto}
                    onChange={(e) => setFormTop({ ...formTop, companyNameDto: e.target.value })}
                    className="border-2 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">N° de practicantes</Label>
                  <Input
                    placeholder="N° de practicantes"
                    type="number"
                    value={formTop.internsCountDto}
                    onChange={(e) => setFormTop({ ...formTop, internsCountDto: e.target.value })}
                    className="border-2 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">% de satisfacción</Label>
                  <Input
                    placeholder="% de satisfacción"
                    type="number"
                    value={formTop.satisfactionPercentageDto}
                    onChange={(e) => setFormTop({ ...formTop, satisfactionPercentageDto: e.target.value })}
                    className="border-2 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Años aliados</Label>
                  <Input
                    placeholder="Años aliados"
                    type="number"
                    value={formTop.yearsAlliedDto}
                    onChange={(e) => setFormTop({ ...formTop, yearsAlliedDto: e.target.value })}
                    className="border-2 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Razón de reconocimiento</Label>
                  <Input
                    placeholder="Razón de reconocimiento"
                    value={formTop.highlightReasonDto}
                    onChange={(e) => setFormTop({ ...formTop, highlightReasonDto: e.target.value })}
                    className="border-2 h-11"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Logo de la Empresa</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFileTop(e.target.files?.[0] || null)}
                    className="border-2 cursor-pointer"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white shadow-md h-11"
                onClick={handleSaveTopCompany}
                disabled={loadingTop}
              >
                {loadingTop ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {topCompany ? "Actualizar Empresa Top" : "Guardar Empresa Top"}
                  </>
                )}
              </Button>

              {topCompany && (
                <motion.div
                  className="p-6 border-2 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-full mb-3">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h4 className="font-bold text-yellow-900 text-2xl">{topCompany.companyNameDto}</h4>
                    <p className="text-sm text-gray-600 mt-1 font-medium">{topCompany.periodNameDto}</p>
                    {topCompany.logoUrlDto && (
                      <div className="flex justify-center my-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white">
                          <img
                            src={getFullImageUrl(topCompany.logoUrlDto) || "/placeholder.svg"}
                            alt={topCompany.companyNameDto}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <span className="font-bold text-blue-600 text-2xl block">{topCompany.internsCountDto}</span>
                        <p className="text-gray-600 text-sm mt-1">Practicantes</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <span className="font-bold text-green-600 text-2xl block">
                          {topCompany.satisfactionPercentageDto}%
                        </span>
                        <p className="text-gray-600 text-sm mt-1">Satisfacción</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <span className="font-bold text-purple-600 text-2xl block">{topCompany.yearsAlliedDto}</span>
                        <p className="text-gray-600 text-sm mt-1">Años Aliados</p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 italic text-sm leading-relaxed">"{topCompany.highlightReasonDto}"</p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Building2 className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Otras Empresas Aliadas Destacadas</h3>
            <span className="text-sm text-gray-500 font-medium">({featuredCompanies.length}/4)</span>
          </div>

          <Card className="shadow-lg border-2 border-orange-200 hover:shadow-xl transition-all mb-6">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Periodo</Label>
                  <Input
                    placeholder="Periodo (Ej: Periodo I 2025)"
                    value={formCompany.periodNameDto}
                    onChange={(e) => setFormCompany({ ...formCompany, periodNameDto: e.target.value })}
                    className="border-2 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Nombre de la Empresa</Label>
                  <Input
                    placeholder="Nombre de la Empresa"
                    value={formCompany.companyNameDto}
                    onChange={(e) => setFormCompany({ ...formCompany, companyNameDto: e.target.value })}
                    className="border-2 h-11"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Logo de la Empresa</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFileCompany(e.target.files?.[0] || null)}
                    className="border-2 cursor-pointer"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-md h-11"
                onClick={handleAddCompany}
                disabled={featuredCompanies.length >= 5}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Agregar Empresa Aliada
              </Button>
            </CardContent>
          </Card>

          {featuredCompanies.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No hay empresas aliadas destacadas</p>
                <p className="text-gray-400 text-sm mt-1">Comienza agregando la primera empresa</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {featuredCompanies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="shadow-lg hover:shadow-xl transition-all border-2 border-orange-100 h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        {editingCompanyId === company.id ? (
                          <div className="space-y-3">
                            <Input
                              value={editPeriodName}
                              onChange={(e) => setEditPeriodName(e.target.value)}
                              placeholder="Periodo"
                              className="border-2 h-10"
                            />
                            <Input
                              value={editCompanyName}
                              onChange={(e) => setEditCompanyName(e.target.value)}
                              placeholder="Nombre Empresa"
                              className="border-2 h-10"
                            />
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                              className="border-2 cursor-pointer"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEditCompany(company.id)}
                                className="flex-1 bg-green-500 hover:bg-green-600"
                              >
                                <Save className="h-4 w-4 mr-1" /> Guardar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingCompanyId(null)}
                                className="flex-1 border-2"
                              >
                                <X className="h-4 w-4 mr-1" /> Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-center">
                              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center overflow-hidden border-2 border-orange-200 shadow-sm">
                                {company.logoUrlDto ? (
                                  <img
                                    src={getFullImageUrl(company.logoUrlDto) || "/placeholder.svg"}
                                    alt={company.companyNameDto}
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <Building2 className="h-8 w-8 text-orange-400" />
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-base">{company.companyNameDto}</h4>
                              <p className="text-sm text-gray-500 mt-1">{company.periodNameDto}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingCompanyId(company.id)
                                  setEditCompanyName(company.companyNameDto)
                                  setEditPeriodName(company.periodNameDto)
                                }}
                                className="flex-1 border-2 hover:bg-gray-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteCompanyClick(company.id, company.companyNameDto)}
                                className="flex-1 border-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.section>
      </div>

      <AlertDialog open={deleteCompanyDialogOpen} onOpenChange={setDeleteCompanyDialogOpen}>
        <AlertDialogContent className="border-2">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl">Confirmar eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar la empresa{" "}
              <span className="font-semibold text-gray-900">"{pendingDeleteCompanyName}"</span>? Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel className="border-2">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCompanyConfirm} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default FeaturedCompaniesManager