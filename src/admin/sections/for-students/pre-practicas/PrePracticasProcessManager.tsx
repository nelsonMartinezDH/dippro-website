"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as Icons from "lucide-react"
import { Save, Trash2, Pencil, XCircle, Upload, CheckCircle, Sparkles, ListOrdered, AlertTriangle } from "lucide-react"
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

interface ResourceDto {
  idDto: number
  stepNumberDto: number
  titleDto: string
  iconNameDto: string
  fileUrlDto: string
}

const PrePracticasProcessManager: React.FC = () => {
  const [resources, setResources] = useState<ResourceDto[]>([])
  const [form, setForm] = useState<Omit<ResourceDto, "idDto" | "fileUrlDto">>({
    stepNumberDto: 1,
    titleDto: "",
    iconNameDto: "FileText",
  })
  const [file, setFile] = useState<File | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [iconListVisible, setIconListVisible] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{ id: number; title: string } | null>(null)

  const fetchResources = async () => {
    const res = await fetch(`${apiBaseUrl}/api/PrePracticasResource`)
    const data = await res.json()
    setResources(data)
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.titleDto) return alert("Debe escribir un título.")
    if (!editId && !file) return alert("Debe seleccionar un archivo.")

    const formData = new FormData()
    formData.append("stepNumber", form.stepNumberDto.toString())
    formData.append("title", form.titleDto)
    formData.append("iconName", form.iconNameDto)
    if (file) formData.append("file", file)
    else if (editId) formData.append("file", new Blob())

    const method = editId ? "PUT" : "POST"
    const url = editId ? `${apiBaseUrl}/api/PrePracticasResource/${editId}` : `${apiBaseUrl}/api/PrePracticasResource`

    const res = await fetch(url, { method, body: formData })
    if (res.ok) {
      fetchResources()
      setForm({ stepNumberDto: 1, titleDto: "", iconNameDto: "FileText" })
      setFile(null)
      setEditId(null)
      setIconListVisible(false)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) fileInput.value = ""

      setMessage(editId ? "✅ Recurso actualizado" : "✅ Recurso agregado")
      setTimeout(() => setMessage(null), 2500)
    }
  }

  const handleEdit = (item: ResourceDto) => {
    setForm({
      stepNumberDto: item.stepNumberDto,
      titleDto: item.titleDto,
      iconNameDto: item.iconNameDto,
    })
    setFile(null)
    setEditId(item.idDto)

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleDelete = async (id: number) => {
    await fetch(`${apiBaseUrl}/api/PrePracticasResource/${id}`, { method: "DELETE" })
    fetchResources()
    setDeleteDialog(null)
  }

  const IconPreview = (Icons as any)[form.iconNameDto] || Icons.FileText

  const availableIcons: (keyof typeof Icons)[] = [
    "FileText",
    "Download",
    "Video",
    "Mail",
    "Users",
    "Target",
    "CheckCircle",
    "BookOpen",
    "ClipboardList",
    "FileCheck",
    "FolderOpen",
    "Send",
    "Calendar",
    "Award",
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <ListOrdered className="h-7 w-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Gestor de Recursos de Pre-Prácticas</h1>
        </div>
        <p className="text-blue-50 text-sm md:text-base leading-relaxed">
          Administra los pasos y recursos del proceso de Pre-Prácticas
        </p>
      </div>

      {message && (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl text-green-800 shadow-md animate-in slide-in-from-top duration-300">
          <CheckCircle className="h-6 w-6 flex-shrink-0" />
          <span className="font-medium">{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border-0 rounded-xl shadow-lg p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">{editId ? "Editar Recurso" : "Agregar Nuevo Recurso"}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Número de Paso</Label>
            <select
              value={form.stepNumberDto}
              onChange={(e) => setForm({ ...form, stepNumberDto: Number(e.target.value) })}
              className="w-full border-2 border-blue-200 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  Paso {n}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <Label className="text-sm font-semibold text-gray-700">Título del Recurso</Label>
            <Input
              placeholder="Ej: Solicitud de Pre-Prácticas"
              value={form.titleDto}
              onChange={(e) => setForm({ ...form, titleDto: e.target.value })}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2 lg:col-span-1">
            <Label className="text-sm font-semibold text-gray-700">Archivo</Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-4 md:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <Label className="text-base font-semibold text-gray-800">Seleccionar Ícono</Label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Nombre del ícono (Ej: FileText)"
              value={form.iconNameDto}
              onChange={(e) => setForm({ ...form, iconNameDto: e.target.value })}
              className="flex-1 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setIconListVisible(!iconListVisible)}
              className="hover:bg-blue-50 border-blue-200 sm:w-auto"
            >
              <Upload className="h-4 w-4 mr-2" />
              {iconListVisible ? "Ocultar" : "Ver Íconos"}
            </Button>
            <div className="flex items-center justify-center w-14 h-14 bg-white border-2 border-blue-200 rounded-lg shadow-sm">
              <IconPreview className="h-7 w-7 text-blue-600" />
            </div>
          </div>

          {iconListVisible && (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 p-4 border-2 border-blue-200 rounded-xl bg-white">
              {availableIcons.map((icon) => {
                const IconComp = (Icons as any)[icon]
                return (
                  <button
                    key={icon}
                    type="button"
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:scale-105 ${form.iconNameDto === icon
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    onClick={() => {
                      setForm({ ...form, iconNameDto: icon })
                      setIconListVisible(false)
                    }}
                  >
                    <IconComp className="h-6 w-6 text-blue-600" />
                    <p className="text-[10px] text-center text-gray-600 font-medium leading-tight">{icon}</p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          {editId && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditId(null)
                setForm({ stepNumberDto: 1, titleDto: "", iconNameDto: "FileText" })
                setFile(null)
              }}
              className="sm:w-auto hover:bg-gray-100"
            >
              <XCircle className="h-4 w-4 mr-2" /> Cancelar
            </Button>
          )}
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all sm:ml-auto"
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" /> {editId ? "Actualizar" : "Guardar Recurso"}
          </Button>
        </div>
      </form>

      <div className="bg-white border-0 rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <ListOrdered className="h-5 w-5 text-blue-600" />
            Recursos Existentes
          </h3>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {resources.length} recursos
          </span>
        </div>

        {resources.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <ListOrdered className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium text-lg">No hay recursos registrados</p>
            <p className="text-gray-400 text-sm mt-2">Agrega tu primer recurso usando el formulario arriba</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resources.map((r) => {
              const Icon = (Icons as any)[r.iconNameDto] || Icons.FileText
              return (
                <div
                  key={r.idDto}
                  className="group flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-blue-50/30"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-blue-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-700 transition-colors">
                        {r.titleDto}
                      </h4>
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Paso {r.stepNumberDto}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(r)}
                      className="hover:bg-blue-50 hover:border-blue-300 flex-1 sm:flex-none"
                    >
                      <Pencil className="h-4 w-4 sm:mr-0 md:mr-2" />
                      <span className="sm:hidden md:inline">Editar</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setDeleteDialog({ id: r.idDto, title: r.titleDto })}
                      className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none"
                    >
                      <Trash2 className="h-4 w-4 sm:mr-0 md:mr-2" />
                      <span className="sm:hidden md:inline">Eliminar</span>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {deleteDialog !== null && (
        <AlertDialog open={deleteDialog !== null} onOpenChange={() => setDeleteDialog(null)}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <AlertDialogTitle className="text-xl">Confirmar Eliminación</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base leading-relaxed">
                ¿Estás seguro de que deseas eliminar el recurso{" "}
                <span className="font-semibold text-gray-900">"{deleteDialog.title}"</span>? Esta acción no se puede
                deshacer y el archivo asociado será eliminado permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="m-0">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteDialog && handleDelete(deleteDialog.id)}
                className="bg-red-600 hover:bg-red-700 m-0"
              >
                Eliminar Recurso
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

export default PrePracticasProcessManager