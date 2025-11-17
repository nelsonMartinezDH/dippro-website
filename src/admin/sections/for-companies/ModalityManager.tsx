"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Plus, Save, Trash2, Edit, X, CheckCircle, AlertTriangle, Layers } from "lucide-react"
import * as Icons from "lucide-react"
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
import { Label } from "@/components/ui/label"

const apiBaseUrl = "http://localhost:5213"

interface ModalityDto {
  idDto: number
  titleDto: string
  durationDto: string
  descriptionDto: string
  requirementsDto: string
  colorDto: string
  iconNameDto: string
  fullDescriptionDto: string
  filePathDto: string
}

const ModalityManager: React.FC = () => {
  const [modalities, setModalities] = useState<ModalityDto[]>([])
  const [form, setForm] = useState<Omit<ModalityDto, "idDto" | "filePathDto">>({
    titleDto: "",
    durationDto: "",
    descriptionDto: "",
    requirementsDto: "",
    colorDto: "blue",
    iconNameDto: "FileText",
    fullDescriptionDto: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [iconListVisible, setIconListVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const [pendingDeleteTitle, setPendingDeleteTitle] = useState("")

  useEffect(() => {
    fetchModalities()
  }, [])

  const fetchModalities = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/Modality`)
      const data = await res.json()
      setModalities(data)
    } catch (err) {
      console.error("Error fetching modalities", err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      titleDto: "",
      durationDto: "",
      descriptionDto: "",
      requirementsDto: "",
      colorDto: "blue",
      iconNameDto: "FileText",
      fullDescriptionDto: "",
    })
    setFile(null)
    setEditId(null)
    setIconListVisible(false)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.titleDto || !form.descriptionDto) {
      alert("Por favor completa todos los campos requeridos.")
      return
    }

    setSubmitting(true)
    try {
      const formData = new FormData()
      for (const [key, value] of Object.entries(form)) {
        formData.append(key, value)
      }
      if (file) formData.append("file", file)

      const method = editId ? "PUT" : "POST"
      const url = editId ? `${apiBaseUrl}/api/Modality/${editId}` : `${apiBaseUrl}/api/Modality`

      const res = await fetch(url, { method, body: formData })
      if (res.ok) {
        await fetchModalities()
        resetForm()
        setMessage(editId ? "✅ Modalidad actualizada correctamente." : "✅ Modalidad registrada con éxito.")
        setTimeout(() => setMessage(null), 3000)
      } else {
        alert("Error al guardar la modalidad.")
      }
    } catch (err) {
      console.error(err)
      alert("Error al guardar la modalidad.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteClick = (id: number, title: string) => {
    setPendingDeleteId(id)
    setPendingDeleteTitle(title)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!pendingDeleteId) return

    try {
      const res = await fetch(`${apiBaseUrl}/api/Modality/${pendingDeleteId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        await fetchModalities()
        setMessage("🗑️ Modalidad eliminada correctamente.")
        setTimeout(() => setMessage(null), 2500)
      } else {
        alert("Error al eliminar la modalidad.")
      }
    } catch (err) {
      console.error(err)
      alert("Error al eliminar la modalidad.")
    } finally {
      setDeleteDialogOpen(false)
      setPendingDeleteId(null)
      setPendingDeleteTitle("")
    }
  }

  const handleEdit = (item: ModalityDto) => {
    setForm({
      titleDto: item.titleDto,
      durationDto: item.durationDto,
      descriptionDto: item.descriptionDto,
      requirementsDto: item.requirementsDto,
      colorDto: item.colorDto,
      iconNameDto: item.iconNameDto,
      fullDescriptionDto: item.fullDescriptionDto,
    })
    setFile(null)
    setEditId(item.idDto)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancelEdit = () => {
    resetForm()
    setMessage("❎ Edición cancelada.")
    setTimeout(() => setMessage(null), 2000)
  }

  const availableColors = [
    { name: "blue", hex: "#2563eb", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    { name: "green", hex: "#16a34a", bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
    { name: "purple", hex: "#9333ea", bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
    { name: "orange", hex: "#f97316", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
    { name: "red", hex: "#ef4444", bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
    { name: "indigo", hex: "#4f46e5", bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
  ]

  const colorMap: Record<string, any> = availableColors.reduce(
    (acc, c) => {
      acc[c.name] = c
      return acc
    },
    {} as Record<string, any>,
  )

  const availableIcons = [
    "FileText",
    "GraduationCap",
    "FileCheck",
    "Briefcase",
    "Globe",
    "BookOpen",
    "Users",
    "ClipboardList",
  ]

  const IconPreview = form.iconNameDto && (Icons as any)[form.iconNameDto] ? (Icons as any)[form.iconNameDto] : Icons.FileText

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Cargando modalidades...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white pb-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Layers className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Gestor de Modalidades</h2>
                <p className="text-indigo-100 text-sm mt-1">Administra las modalidades de vinculación disponibles</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Success message */}
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

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow-lg border-2 border-indigo-100 hover:shadow-xl transition-all">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-indigo-800 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editId ? "Editar Modalidad" : "Agregar Nueva Modalidad"}
              </h3>
              {editId && (
                <Button type="button" variant="outline" onClick={handleCancelEdit} className="border-2 bg-transparent">
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form inputs */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Título de la modalidad</Label>
                    <Input
                      placeholder="Ej: Prácticas Profesionales"
                      value={form.titleDto}
                      onChange={(e) => setForm({ ...form, titleDto: e.target.value })}
                      className="border-2 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Duración</Label>
                    <Input
                      placeholder="Ej: 3-6 meses"
                      value={form.durationDto}
                      onChange={(e) => setForm({ ...form, durationDto: e.target.value })}
                      className="border-2 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Requisitos principales</Label>
                    <Input
                      placeholder="Ej: 70% de créditos aprobados"
                      value={form.requirementsDto}
                      onChange={(e) => setForm({ ...form, requirementsDto: e.target.value })}
                      className="border-2 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Descripción corta</Label>
                    <Input
                      placeholder="Breve descripción"
                      value={form.descriptionDto}
                      onChange={(e) => setForm({ ...form, descriptionDto: e.target.value })}
                      className="border-2 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Descripción completa</Label>
                  <Textarea
                    placeholder="Descripción detallada de la modalidad..."
                    value={form.fullDescriptionDto}
                    onChange={(e) => setForm({ ...form, fullDescriptionDto: e.target.value })}
                    className="min-h-[100px] resize-none border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Documento adjunto</Label>
                  <Input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="border-2 cursor-pointer"
                  />
                  {editId && modalities.find((m) => m.idDto === editId)?.filePathDto && (
                    <p className="text-sm text-gray-600">
                      Archivo actual:{" "}
                      <a
                        href={`${apiBaseUrl}${modalities.find((m) => m.idDto === editId)?.filePathDto}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 underline hover:text-indigo-700"
                      >
                        Ver archivo
                      </a>
                    </p>
                  )}
                </div>

                {/* Color selector */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Color representativo</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setForm({ ...form, colorDto: color.name })}
                        className={`p-3 rounded-lg border-2 transition-all ${form.colorDto === color.name
                          ? `${color.border} ${color.bg} ring-2 ring-offset-2 ring-${color.name}-400`
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="w-full h-8 rounded" style={{ backgroundColor: color.hex }} />
                        <p className="text-xs mt-1 capitalize font-medium">{color.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon selector */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Ícono representativo</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ej: FileText"
                      value={form.iconNameDto}
                      onChange={(e) => setForm({ ...form, iconNameDto: e.target.value })}
                      className="border-2 h-11"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIconListVisible(!iconListVisible)}
                      className="border-2"
                    >
                      {iconListVisible ? "Cerrar" : "Ver íconos"}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {iconListVisible && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-4 sm:grid-cols-8 gap-3 p-4 border-2 rounded-lg bg-gray-50"
                      >
                        {availableIcons.map((icon) => {
                          const IconComp = (Icons as any)[icon]
                          const selected = form.iconNameDto === icon
                          return (
                            <motion.button
                              key={icon}
                              type="button"
                              onClick={() => {
                                setForm({ ...form, iconNameDto: icon })
                                setIconListVisible(false)
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${selected ? "border-indigo-300 bg-indigo-50" : "border-gray-200 hover:bg-white"
                                }`}
                            >
                              <IconComp className="h-6 w-6 text-indigo-600" />
                              <span className="text-xs mt-1 text-gray-600 truncate w-full text-center">{icon}</span>
                            </motion.button>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Preview */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="shadow-lg border-2 border-gray-200">
                      <CardContent className="p-6 space-y-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Vista Previa</p>
                          <div
                            className={`inline-flex p-4 rounded-xl mb-3 ${colorMap[form.colorDto]?.bg || "bg-blue-50"}`}
                          >
                            <IconPreview
                              className="h-8 w-8"
                              style={{ color: colorMap[form.colorDto]?.hex || "#2563eb" }}
                            />
                          </div>
                          <h4 className="font-bold text-gray-900 text-lg">{form.titleDto || "Título de modalidad"}</h4>
                          <p className="text-sm text-gray-600 mt-2">{form.descriptionDto || "Descripción corta"}</p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duración:</span>
                            <span className="font-medium text-gray-900">{form.durationDto || "—"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Requisitos:</span>
                            <span className="font-medium text-gray-900 text-right">{form.requirementsDto || "—"}</span>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 h-11"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              {editId ? "Actualizar" : "Guardar"}
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.form>

      {/* Modalities list */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Modalidades Registradas
          </h3>
          <span className="text-sm text-gray-500 font-medium">
            ({modalities.length} modalidades)
          </span>
        </div>

        {modalities.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
            <CardContent className="text-center py-12">
              <Layers className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                No hay modalidades registradas
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Comienza agregando la primera modalidad
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {modalities.map((item, index) => {
                const Icon = (Icons as any)[item.iconNameDto] || Icons.FileText;
                const colorInfo = colorMap[item.colorDto] || colorMap.blue;

                return (
                  <motion.div
                    key={item.idDto}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card
                      className={`relative overflow-hidden border ${colorInfo.border} rounded-2xl shadow-sm hover:shadow-md transition-all duration-200`}
                    >
                      <CardContent className="p-5 flex flex-col justify-between h-full">
                        <div className="flex items-start gap-4">
                          {/* Icono */}
                          <div
                            className={`p-3 rounded-xl ${colorInfo.bg} flex items-center justify-center`}
                          >
                            <Icon
                              className="h-6 w-6"
                              style={{ color: colorInfo.hex }}
                            />
                          </div>

                          {/* Información principal */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-base leading-snug">
                              {item.titleDto}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
                              {item.descriptionDto}
                            </p>

                            <div className="flex mt-3">
                              <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                                {item.durationDto}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botones de acción - parte inferior derecha */}
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleEdit(item)}
                            className="h-8 w-8 border-gray-200 hover:bg-gray-100 transition-all"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              handleDeleteClick(item.idDto, item.titleDto)
                            }
                            className="h-8 w-8 border-gray-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-2">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl">Confirmar eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar la modalidad{" "}
              <span className="font-semibold text-gray-900">"{pendingDeleteTitle}"</span>? Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel className="border-2">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ModalityManager