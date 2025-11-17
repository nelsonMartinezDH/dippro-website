"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Save,
  Trash2,
  Pencil,
  XCircle,
  CheckCircle,
  FileText,
  Video,
  Download,
  Sparkles,
  FolderOpen,
  AlertTriangle,
} from "lucide-react"
import { Label } from "@/components/ui/label"
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

interface Resource {
  idDto: number
  titleDto: string
  descriptionDto: string
  resourceTypeDto: string
  fileUrlDto?: string
  thumbnailUrlDto?: string
  durationDto?: string
  categoryDto?: string
  fileSizeDto?: number
}

const PrePracticasResourcesManager: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [form, setForm] = useState({
    titleDto: "",
    descriptionDto: "",
    resourceTypeDto: "reglamento",
    fileUrlDto: "",
    thumbnailUrlDto: "",
    durationDto: "",
    categoryDto: "",
    fileSizeDto: 0,
  })
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [editId, setEditId] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{ id: number; title: string } | null>(null)

  const fetchResources = async () => {
    const res = await fetch(`${apiBaseUrl}/api/PrePracticasSupportResource`)
    if (!res.ok) throw new Error("Error al traer recursos")
    const data = await res.json()
    setResources(data)
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const getYouTubeId = (url: string): string | null => {
    if (!url) return null
    const match =
      url.match(/[?&]v=([^&]+)/) ||
      url.match(/youtu\.be\/([^?&]+)/) ||
      url.match(/youtube\.com\/shorts\/([^?&]+)/) ||
      url.match(/embed\/([^?&]+)/)
    return match ? match[1] : null
  }

  const normalizeYouTubeUrl = (url: string): string => {
    const id = getYouTubeId(url)
    return id ? `https://www.youtube.com/embed/${id}` : url
  }

  const getThumbnailUrl = (url: string): string => {
    const id = getYouTubeId(url)
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ""
  }

  const getCategoryByType = (type: string): string => {
    switch (type) {
      case "reglamento":
        return "Normativa Vigente"
      case "formato":
        return "Formatos Oficiales"
      case "video":
        return "Video Tutorial"
      default:
        return "General"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.titleDto) return alert("Debe escribir un título.")
    if (form.resourceTypeDto !== "video" && !file && !editId)
      return alert("Debe seleccionar un archivo para este tipo de recurso.")
    if (form.resourceTypeDto === "video" && !videoUrl) return alert("Debe ingresar el enlace del video.")

    const formData = new FormData()
    const category = getCategoryByType(form.resourceTypeDto)

    formData.append("title", form.titleDto)
    formData.append("description", form.descriptionDto || "")
    formData.append("resourceType", form.resourceTypeDto)
    formData.append("category", category)
    formData.append("duration", form.durationDto || "")

    if (form.resourceTypeDto === "video") {
      const normalizedUrl = normalizeYouTubeUrl(videoUrl)
      const thumbUrl = getThumbnailUrl(videoUrl)
      formData.append("videoUrl", normalizedUrl)
      formData.append("thumbnailUrl", thumbUrl)
    } else if (file) {
      formData.append("file", file)
    }

    const method = editId ? "PUT" : "POST"
    const url = editId
      ? `${apiBaseUrl}/api/PrePracticasSupportResource/${editId}`
      : `${apiBaseUrl}/api/PrePracticasSupportResource`

    const res = await fetch(url, { method, body: formData })

    if (res.ok) {
      await fetchResources()
      setForm({
        titleDto: "",
        descriptionDto: "",
        resourceTypeDto: "reglamento",
        fileUrlDto: "",
        thumbnailUrlDto: "",
        durationDto: "",
        categoryDto: "",
        fileSizeDto: 0,
      })
      setVideoUrl("")
      setFile(null)
      setEditId(null)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) fileInput.value = ""

      setMessage(editId ? "✅ Recurso actualizado correctamente" : "✅ Recurso agregado correctamente")
      setTimeout(() => setMessage(null), 2500)
    } else {
      alert("Error al guardar el recurso.")
    }
  }

  const handleEdit = (item: Resource) => {
    setForm({
      titleDto: item.titleDto,
      descriptionDto: item.descriptionDto,
      resourceTypeDto: item.resourceTypeDto,
      fileUrlDto: item.fileUrlDto || "",
      thumbnailUrlDto: item.thumbnailUrlDto || "",
      durationDto: item.durationDto || "",
      categoryDto: item.categoryDto || "",
      fileSizeDto: item.fileSizeDto || 0,
    })
    setVideoUrl(item.resourceTypeDto === "video" ? item.fileUrlDto || "" : "")
    setEditId(item.idDto)

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ""

    setFile(null)
  }

  const handleDelete = async (id: number) => {
    await fetch(`${apiBaseUrl}/api/PrePracticasSupportResource/${id}`, { method: "DELETE" })
    fetchResources()
    setDeleteDialog(null)
  }

  const handleCancel = () => {
    setEditId(null)
    setForm({
      titleDto: "",
      descriptionDto: "",
      resourceTypeDto: "reglamento",
      fileUrlDto: "",
      thumbnailUrlDto: "",
      durationDto: "",
      categoryDto: "",
      fileSizeDto: 0,
    })
    setVideoUrl("")
    setFile(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <FolderOpen className="h-7 w-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Material de Apoyo y Normativa</h1>
        </div>
        <p className="text-purple-50 text-sm md:text-base leading-relaxed">
          Gestiona documentos, videos y formatos para estudiantes de Pre-Prácticas
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
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-800">{editId ? "Editar Recurso" : "Agregar Nuevo Recurso"}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Tipo de Recurso</Label>
            <Select value={form.resourceTypeDto} onValueChange={(value) => setForm({ ...form, resourceTypeDto: value })}>
              <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reglamento">📘 Reglamento de Pre-Prácticas</SelectItem>
                <SelectItem value="video">🎥 Video Informativo</SelectItem>
                <SelectItem value="formato">📂 Formatos Requeridos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="text-sm font-semibold text-gray-700">Título</Label>
            <Input
              placeholder="Ej: Proceso de Pre-Prácticas"
              value={form.titleDto}
              onChange={(e) => setForm({ ...form, titleDto: e.target.value })}
              className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {form.resourceTypeDto !== "video" && (
            <div className="space-y-2 lg:col-span-3">
              <Label className="text-sm font-semibold text-gray-700">Archivo</Label>
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>
          )}
        </div>

        {form.resourceTypeDto === "video" && (
          <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 rounded-xl p-4 md:p-6 space-y-4">
            <h3 className="font-semibold text-purple-900 flex items-center gap-2">
              <Video className="h-5 w-5" />
              Configuración de Video
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-semibold text-gray-700">Enlace de YouTube</Label>
                <Input
                  placeholder="https://www.youtube.com/watch?v=... o https://youtu.be/..."
                  value={videoUrl}
                  onChange={(e) => {
                    const newUrl = e.target.value
                    setVideoUrl(newUrl)
                    setForm({
                      ...form,
                      thumbnailUrlDto: getThumbnailUrl(newUrl),
                    })
                  }}
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Duración</Label>
                <Input
                  placeholder="Ej: 15 min"
                  value={form.durationDto || ""}
                  onChange={(e) => setForm({ ...form, durationDto: e.target.value })}
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Descripción</Label>
                <Textarea
                  placeholder="Breve descripción del recurso"
                  value={form.descriptionDto}
                  onChange={(e) => setForm({ ...form, descriptionDto: e.target.value })}
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                  rows={3}
                />
              </div>

              {form.thumbnailUrlDto && (
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Vista Previa</Label>
                  <div className="relative rounded-lg overflow-hidden border-2 border-purple-200 shadow-md">
                    <img
                      src={form.thumbnailUrlDto || "/placeholder.svg"}
                      alt="Miniatura del video"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3">
                        <Video className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          {editId && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="sm:w-auto hover:bg-gray-100 bg-transparent"
            >
              <XCircle className="h-4 w-4 mr-2" /> Cancelar
            </Button>
          )}
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all sm:ml-auto"
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" /> {editId ? "Actualizar Recurso" : "Guardar Recurso"}
          </Button>
        </div>
      </form>

      <div className="bg-white border-0 rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Recursos Existentes
          </h3>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
            {resources.length} recursos
          </span>
        </div>

        {resources.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium text-lg">No hay recursos registrados</p>
            <p className="text-gray-400 text-sm mt-2">Agrega tu primer recurso usando el formulario arriba</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {resources.map((r) => (
              <div
                key={r.idDto}
                className="group flex flex-col sm:flex-row gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex-shrink-0">
                  {r.resourceTypeDto === "video" ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-sm">
                      <Video className="h-8 w-8 text-green-700" />
                    </div>
                  ) : r.resourceTypeDto === "formato" ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm">
                      <Download className="h-8 w-8 text-blue-700" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-sm">
                      <FileText className="h-8 w-8 text-purple-700" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-700 transition-colors">
                    {r.titleDto}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium capitalize">
                      {r.resourceTypeDto}
                    </span>
                    {r.categoryDto && (
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-medium">
                        {r.categoryDto}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(r)}
                    className="hover:bg-blue-50 hover:border-blue-300 flex-1 sm:flex-none"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setDeleteDialog({ id: r.idDto, title: r.titleDto })}
                    className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
              <span className="font-semibold text-gray-900">"{deleteDialog?.title}"</span>? Esta acción no se puede
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
    </div>
  )
}

export default PrePracticasResourcesManager
