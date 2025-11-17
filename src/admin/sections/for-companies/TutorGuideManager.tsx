"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, Plus, Save, Users, BookOpen, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
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

const apiBaseUrl = "http://localhost:5213"

interface TutorGuideResourceDto {
  idDto: number
  titleDto: string
  iconNameDto: string
  filePathDto: string
  columnNumberDto: number
}

const TutorGuideManager: React.FC = () => {
  const [resources, setResources] = useState<TutorGuideResourceDto[]>([])
  const [selectedColumnDto, setSelectedColumnDto] = useState<number>(1)
  const [titleDto, setTitleDto] = useState("")
  const [iconNameDto, setIconNameDto] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [editIdDto, setEditIdDto] = useState<number | null>(null)
  const [iconListVisible, setIconListVisible] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pendingDeleteIdDto, setPendingDeleteIdDto] = useState<number | null>(null)
  const [pendingDeleteTitleDto, setPendingDeleteTitleDto] = useState("")

  const columnsDto = [
    { idDto: 1, titleDto: "Herramientas Pedagógicas" },
    { idDto: 2, titleDto: "Seguimiento y Evaluación" },
  ]

  useEffect(() => {
    fetchResources()
  }, [selectedColumnDto])

  const fetchResources = async () => {
    const res = await fetch(`${apiBaseUrl}/api/TutorGuide?columnNumberDto=${selectedColumnDto}`)
    const data = await res.json()
    setResources(data)
  }

  const resetForm = () => {
    setTitleDto("")
    setIconNameDto("")
    setFile(null)
    setEditIdDto(null)
    setIconListVisible(false)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!titleDto || !iconNameDto || (!file && !editIdDto)) {
      alert("Por favor completa todos los campos requeridos.")
      return
    }

    const formData = new FormData()
    formData.append("titleDto", titleDto)
    formData.append("iconNameDto", iconNameDto)
    formData.append("columnNumberDto", selectedColumnDto.toString())
    if (file) formData.append("file", file)

    const method = editIdDto ? "PUT" : "POST"
    const url = editIdDto ? `${apiBaseUrl}/api/TutorGuide/${editIdDto}` : `${apiBaseUrl}/api/TutorGuide`

    const res = await fetch(url, { method, body: formData })

    if (res.ok) {
      resetForm()
      fetchResources()
      setMessage(editIdDto ? "✅ Recurso actualizado correctamente." : "✅ Recurso guardado con éxito.")
      setTimeout(() => setMessage(null), 3000)
    } else {
      alert("Error al guardar el recurso.")
    }
  }

  const handleDeleteClick = (idDto: number, titleDto: string) => {
    setPendingDeleteIdDto(idDto)
    setPendingDeleteTitleDto(titleDto)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!pendingDeleteIdDto) return

    const res = await fetch(`${apiBaseUrl}/api/TutorGuide/${pendingDeleteIdDto}`, { method: "DELETE" })
    if (res.ok) {
      fetchResources()
      setMessage("🗑️ Recurso eliminado correctamente.")
      setTimeout(() => setMessage(null), 2500)
    }

    setDeleteDialogOpen(false)
    setPendingDeleteIdDto(null)
    setPendingDeleteTitleDto("")
  }

  const handleEdit = (item: TutorGuideResourceDto) => {
    setTitleDto(item.titleDto)
    setIconNameDto(item.iconNameDto)
    setSelectedColumnDto(item.columnNumberDto)
    setEditIdDto(item.idDto)
    setFile(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancelEdit = () => {
    resetForm()
    setMessage("❎ Edición cancelada.")
    setTimeout(() => setMessage(null), 2000)
  }

  const availableIconsDto = ["FileText", "Video", "CheckCircle", "Users", "Clock", "BookOpen", "Folder", "Download"]

  const IconPreview = iconNameDto && (Icons as any)[iconNameDto] ? (Icons as any)[iconNameDto] : Icons.FileText

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-8 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestor de Recursos — Guía para Tutores Empresariales</h1>
              <p className="text-white/90">
                Administre los documentos y materiales de apoyo para los tutores empresariales.
              </p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl flex items-center gap-3 shadow-lg ${message.includes("✅")
                ? "bg-green-50 border-2 border-green-200 text-green-700"
                : message.includes("🗑️")
                  ? "bg-red-50 border-2 border-red-200 text-red-700"
                  : "bg-gray-50 border-2 border-gray-300 text-gray-700"
                }`}
            >
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {columnsDto.map((col) => (
            <motion.div key={col.idDto} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={selectedColumnDto === col.idDto ? "default" : "outline"}
                onClick={() => setSelectedColumnDto(col.idDto)}
                className={`w-full h-auto py-6 text-lg font-semibold rounded-xl shadow-md transition-all ${selectedColumnDto === col.idDto
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white border-0"
                  : "text-orange-700 border-2 border-orange-500 hover:bg-orange-50 bg-white"
                  }`}
              >
                {col.titleDto}
              </Button>
            </motion.div>
          ))}
        </div>

        <Card className="bg-orange-50 border-2 border-orange-500 shadow-lg rounded-2xl">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="p-4 rounded-xl bg-orange-600 shadow-md">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-orange-800 text-xl">
                {selectedColumnDto === 1 ? "Columna 1: Herramientas Pedagógicas" : "Columna 2: Seguimiento y Evaluación"}
              </h3>
              <p className="text-gray-600 text-sm mt-1">Recursos y materiales disponibles en esta categoría.</p>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-gray-200"
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2">
              <div className="p-2 rounded-lg bg-orange-100">
                <Plus className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl">{editIdDto ? "Editar Recurso" : "Agregar Nuevo Recurso"}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Título del recurso</label>
                <Input
                  placeholder="Título del recurso"
                  value={titleDto}
                  onChange={(e) => setTitleDto(e.target.value)}
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ícono</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nombre del ícono (ej: FileText)"
                    value={iconNameDto}
                    onChange={(e) => setIconNameDto(e.target.value)}
                    className="border-2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIconListVisible(!iconListVisible)}
                    className="border-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Archivo</label>
                <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border-2" />

                {editIdDto && !file && (
                  <div className="text-sm text-gray-600 border-2 rounded-md p-3 bg-gray-50 flex items-center justify-between">
                    <span>
                      📎 Archivo actual:{" "}
                      <a
                        href={`${apiBaseUrl}${resources.find((r) => r.idDto === editIdDto)?.filePathDto}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-700 underline font-medium"
                      >
                        Ver archivo
                      </a>
                    </span>
                    <span className="italic text-gray-500">No se reemplazará</span>
                  </div>
                )}

                {file && (
                  <div className="text-sm text-orange-700 italic font-medium">
                    Nuevo archivo seleccionado: {file.name}
                  </div>
                )}
              </div>
            </div>

            {/* Icon list */}
            <AnimatePresence>
              {iconListVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-4 md:grid-cols-8 gap-3 p-4 border-2 rounded-lg bg-gray-50"
                >
                  {availableIconsDto.map((iconDto) => {
                    const IconComp = (Icons as any)[iconDto]
                    return (
                      <motion.div
                        key={iconDto}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer flex flex-col items-center p-3 rounded-lg border-2 transition-all ${iconNameDto === iconDto ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:bg-white"
                          }`}
                        onClick={() => {
                          setIconNameDto(iconDto)
                          setIconListVisible(false)
                        }}
                      >
                        <IconComp className="h-6 w-6 text-orange-600" />
                        <span className="text-xs mt-1 text-gray-600">{iconDto}</span>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-6 border-t-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100">
                  <IconPreview className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{iconNameDto || "Sin ícono seleccionado"}</span>
              </div>

              <div className="flex gap-3">
                {editIdDto && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 flex items-center gap-2 hover:bg-gray-50 bg-transparent"
                    onClick={handleCancelEdit}
                  >
                    <XCircle className="h-4 w-4" />
                    Cancelar
                  </Button>
                )}

                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Save className="h-4 w-4" />
                  {editIdDto ? "Actualizar Recurso" : "Guardar Recurso"}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Resources list */}
        <Card className="shadow-xl border-2 border-gray-200 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2">
            <CardTitle className="text-gray-800 flex items-center justify-between text-xl">
              <span className="font-bold">Recursos Registrados</span>
              <span className="text-base font-semibold text-orange-700 bg-orange-50 px-4 py-2 rounded-full">
                {resources.length} recurso{resources.length !== 1 ? "s" : ""}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-6">
            {resources.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex p-6 rounded-full bg-orange-50 mb-4">
                  <BookOpen className="h-16 w-16 text-orange-600" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No hay recursos registrados.</p>
                <p className="text-gray-400 text-sm mt-2">Agrega tu primer recurso usando el formulario de arriba.</p>
              </div>
            ) : (
              <AnimatePresence>
                {resources.map((item, index) => {
                  const Icon = (Icons as any)[item.iconNameDto] || Icons.FileText
                  return (
                    <motion.div
                      key={item.idDto}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="flex justify-between items-center border-2 border-orange-500 rounded-xl p-5 bg-orange-50 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-orange-600 shadow-md">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">{item.titleDto}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                          className="border-2 hover:bg-white hover:shadow-md transition-all"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 text-red-600 hover:text-red-700 hover:bg-red-50 hover:shadow-md transition-all bg-transparent"
                          onClick={() => handleDeleteClick(item.idDto, item.titleDto)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            )}
          </CardContent>
        </Card>

        {/* Delete confirmation dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="border-2 rounded-2xl">
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-red-100">
                  <AlertTriangle className="h-7 w-7 text-red-600" />
                </div>
                <AlertDialogTitle className="text-2xl font-bold">Confirmar eliminación</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base text-gray-600 leading-relaxed">
                ¿Estás seguro de que deseas eliminar el recurso{" "}
                <span className="font-bold text-gray-900">"{pendingDeleteTitleDto}"</span>? Esta acción no se puede
                deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-2 hover:bg-gray-50">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default TutorGuideManager