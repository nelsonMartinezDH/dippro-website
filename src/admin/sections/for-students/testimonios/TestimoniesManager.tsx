"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Loader2,
  Trash2,
  Edit3,
  CheckCircle2,
  Plus,
  Video,
  ImageIcon,
  Building2,
  User,
  X,
  Save,
  AlertCircle,
  MapPin,
  Clock,
  Mail,
  Linkedin,
  Globe,
  Award,
  MessageSquare,
  Lightbulb,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const API_URL = "http://localhost:5213/api"

// YouTube helper functions
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

interface StudentTestimony {
  id: number
  name: string
  program: string
  company: string
  location?: string
  duration?: string
  shortText?: string
  fullText?: string
  achievements?: string
  recommendations?: string
  linkedinUrl?: string
  email?: string
  companyWebsite?: string
  profileImageUrl?: string
  videoUrl?: string
  videoThumbnailUrl?: string
  galleryImages?: string
}

export default function TestimoniesManager() {
  const [testimonies, setTestimonies] = useState<StudentTestimony[]>([])
  const [form, setForm] = useState<Partial<StudentTestimony>>({})
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [editingTestimony, setEditingTestimony] = useState<StudentTestimony | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null)
  const [cancelDialog, setCancelDialog] = useState(false)

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/StudentTestimony`)
      if (res.ok) {
        const data = await res.json()
        setTestimonies(data)
      }
    } catch (err) {
      console.error("Error al cargar los testimonios:", err)
      setError("Error al cargar los testimonios")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm({})
    setProfileImage(null)
    setGalleryImages([])
    setVideoUrl("")
    setEditingTestimony(null)
    setSuccess(null)
    setError(null)

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleCancelClick = () => {
    if (editingTestimony || Object.keys(form).length > 0) {
      setCancelDialog(true)
    } else {
      resetForm()
    }
  }

  const confirmCancel = () => {
    resetForm()
    setCancelDialog(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    try {
      const formData = new FormData()

      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value as string)
        }
      })

      if (videoUrl) {
        const normalized = normalizeYouTubeUrl(videoUrl)
        const thumbnail = getThumbnailUrl(videoUrl)

        formData.delete("videoUrl")
        formData.delete("videoThumbnailUrl")

        formData.append("videoUrl", normalized)
        formData.append("videoThumbnailUrl", thumbnail)
      }

      if (profileImage) {
        formData.append("profileImage", profileImage)
      }

      if (galleryImages.length > 0) {
        galleryImages.forEach((img) => formData.append("galleryImages", img))
      }

      const method = editingTestimony ? "PUT" : "POST"
      const url = editingTestimony
        ? `${API_URL}/StudentTestimony/${editingTestimony.id}`
        : `${API_URL}/StudentTestimony`

      const response = await fetch(url, {
        method,
        body: formData,
      })

      if (response.ok) {
        setSuccess(editingTestimony ? "Testimonio actualizado exitosamente" : "Testimonio creado exitosamente")
        fetchData()
        resetForm()
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError("Error al guardar el testimonio")
        setTimeout(() => setError(null), 3000)
      }
    } catch (error) {
      console.error("Error en el envío:", error)
      setError("Error al guardar el testimonio")
      setTimeout(() => setError(null), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (t: StudentTestimony) => {
    setEditingTestimony(t)
    setForm(t)
    setVideoUrl(t.videoUrl || "")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const confirmDelete = (id: number) => {
    setDeleteDialog(id)
  }

  const handleDelete = async () => {
    if (deleteDialog === null) return

    try {
      const res = await fetch(`${API_URL}/StudentTestimony/${deleteDialog}`, { method: "DELETE" })
      if (res.ok) {
        setSuccess("Testimonio eliminado exitosamente")
        fetchData()
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError("Error al eliminar el testimonio")
        setTimeout(() => setError(null), 3000)
      }
    } catch (error) {
      console.error("Error al eliminar:", error)
      setError("Error al eliminar el testimonio")
      setTimeout(() => setError(null), 3000)
    } finally {
      setDeleteDialog(null)
    }
  }

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <Card className="border-l-4 border-l-blue-600 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <CardHeader className="pb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Gestión de Testimonios de Estudiantes
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Administre los testimonios de estudiantes que se mostrarán en el sitio público. Cada testimonio ayuda
                  a inspirar a futuros practicantes.
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white shadow-md">
                {testimonies.length} {testimonies.length === 1 ? "testimonio" : "testimonios"}
              </Badge>
            </div>
          </CardHeader>
        </div>
      </Card>

      {/* Success/Error Messages */}
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

      {/* Form */}
      <Card className="shadow-2xl border-2 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-gray-50">
          <CardHeader className="border-b-2 border-gray-200">
            <CardTitle className="text-2xl flex items-center gap-3">
              {editingTestimony ? (
                <>
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Edit3 className="h-6 w-6 text-amber-600" />
                  </div>
                  <span className="text-amber-700">Editar Testimonio</span>
                </>
              ) : (
                <>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Plus className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-blue-700">Nuevo Testimonio</span>
                </>
              )}
            </CardTitle>
            <CardDescription className="text-base">
              {editingTestimony
                ? "Modifique los campos necesarios y guarde los cambios"
                : "Complete el formulario para agregar un nuevo testimonio de estudiante"}
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl text-blue-900">Información Básica</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 shadow-inner">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                    Nombre completo <span className="text-red-500 text-lg">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ej. Juan Pérez García"
                    value={form.name || ""}
                    onChange={handleChange}
                    required
                    className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                    Programa académico <span className="text-red-500 text-lg">*</span>
                  </Label>
                  <Input
                    id="program"
                    name="program"
                    placeholder="Ej. Ingeniería de Sistemas"
                    value={form.program || ""}
                    onChange={handleChange}
                    required
                    className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Empresa o institución <span className="text-red-500 text-lg">*</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Ej. Google Colombia"
                    value={form.company || ""}
                    onChange={handleChange}
                    required
                    className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Ubicación
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Ej. Bogotá, Colombia"
                    value={form.location || ""}
                    onChange={handleChange}
                    className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="duration" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Duración de la práctica
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="Ej. 6 meses (Enero - Junio 2024)"
                    value={form.duration || ""}
                    onChange={handleChange}
                    className="h-12 text-base border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Mail className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-xl text-teal-900">Información de Contacto</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl border-2 border-teal-200 shadow-inner">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                    <Mail className="h-5 w-5 text-teal-600" />
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={form.email || ""}
                    onChange={handleChange}
                    className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="linkedinUrl"
                    className="flex items-center gap-2 text-base font-semibold text-gray-700"
                  >
                    <Linkedin className="h-5 w-5 text-teal-600" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/in/usuario"
                    value={form.linkedinUrl || ""}
                    onChange={handleChange}
                    className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="companyWebsite"
                    className="flex items-center gap-2 text-base font-semibold text-gray-700"
                  >
                    <Globe className="h-5 w-5 text-teal-600" />
                    Sitio web de la empresa
                  </Label>
                  <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    placeholder="https://empresa.com"
                    value={form.companyWebsite || ""}
                    onChange={handleChange}
                    className="h-12 text-base border-2 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  />
                </div>
              </div>
            </div>

            {/* Testimony Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl text-purple-900">Contenido del Testimonio</h3>
              </div>
              <div className="space-y-6 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 shadow-inner">
                <div className="space-y-2">
                  <Label htmlFor="shortText" className="text-base font-semibold text-gray-700">
                    Resumen breve
                  </Label>
                  <Input
                    id="shortText"
                    name="shortText"
                    placeholder="Una frase que resuma la experiencia (máx. 100 caracteres)"
                    value={form.shortText || ""}
                    onChange={handleChange}
                    className="h-12 text-base border-2 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullText" className="text-base font-semibold text-gray-700">
                    Descripción completa
                  </Label>
                  <Textarea
                    id="fullText"
                    name="fullText"
                    placeholder="Describe tu experiencia completa, aprendizajes y aportes a la empresa..."
                    value={form.fullText || ""}
                    onChange={handleChange}
                    rows={5}
                    className="resize-none text-base border-2 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="achievements"
                    className="flex items-center gap-2 text-base font-semibold text-gray-700"
                  >
                    <Award className="h-5 w-5 text-purple-600" />
                    Logros alcanzados
                  </Label>
                  <Textarea
                    id="achievements"
                    name="achievements"
                    placeholder="Menciona los principales logros obtenidos durante la práctica (separados por comas)"
                    value={form.achievements || ""}
                    onChange={handleChange}
                    rows={3}
                    className="resize-none text-base border-2 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="recommendations"
                    className="flex items-center gap-2 text-base font-semibold text-gray-700"
                  >
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                    Recomendaciones
                  </Label>
                  <Textarea
                    id="recommendations"
                    name="recommendations"
                    placeholder="¿Qué recomendarías a futuros practicantes? Comparte tus consejos..."
                    value={form.recommendations || ""}
                    onChange={handleChange}
                    rows={3}
                    className="resize-none text-base border-2 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              </div>
            </div>

            {/* Media Files */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <ImageIcon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-xl text-amber-900">Archivos Multimedia</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 shadow-inner">
                <div className="space-y-2">
                  <Label htmlFor="videoUrl" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                    <Video className="h-5 w-5 text-amber-600" />
                    Video de YouTube
                  </Label>
                  <Input
                    id="videoUrl"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="h-12 text-base border-2 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                  <p className="text-xs text-gray-500">Pegue el enlace completo del video</p>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="profileImage"
                    className="flex items-center gap-2 text-base font-semibold text-gray-700"
                  >
                    <User className="h-5 w-5 text-amber-600" />
                    Imagen de perfil
                  </Label>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                    className="h-12 text-base border-2 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                  <p className="text-xs text-gray-500">Foto del estudiante (JPG, PNG)</p>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="galleryImages"
                    className="flex items-center gap-2 text-base font-semibold text-gray-700"
                  >
                    <ImageIcon className="h-5 w-5 text-amber-600" />
                    Galería de imágenes
                  </Label>
                  <Input
                    id="galleryImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setGalleryImages(Array.from(e.target.files || []))}
                    className="h-12 text-base border-2 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                  <p className="text-xs text-gray-500">Múltiples imágenes de la experiencia</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelClick}
                disabled={loading}
                className="h-12 px-6 text-base font-semibold hover:bg-gray-100 bg-transparent"
              >
                <X className="h-5 w-5 mr-2" />
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-8 text-base font-semibold sm:min-w-[240px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    {editingTestimony ? "Actualizar Testimonio" : "Guardar Testimonio"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Testimonies List */}
      <Card className="shadow-2xl border-2">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">Testimonios Registrados</CardTitle>
              <CardDescription className="text-base">
                Lista de todos los testimonios publicados en el sitio
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="text-lg px-5 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-bold shadow-md"
            >
              {testimonies.length} {testimonies.length === 1 ? "testimonio" : "testimonios"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          {testimonies.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
                <User className="h-20 w-20 text-gray-400" />
              </div>
              <p className="text-gray-600 text-xl font-semibold mb-3">No hay testimonios registrados</p>
              <p className="text-gray-500 text-base max-w-md mx-auto">
                Comience agregando el primer testimonio usando el formulario anterior para inspirar a futuros
                estudiantes
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonies.map((t) => (
                <Card
                  key={t.id}
                  className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-300 overflow-hidden group bg-white"
                >
                  <CardContent className="p-0">
                    {/* Image */}
                    {t.profileImageUrl ? (
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                        <img
                          src={`${API_URL.replace("/api", "")}${t.profileImageUrl}`}
                          alt={t.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center">
                        <User className="h-24 w-24 text-white/70" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="font-bold text-xl leading-tight mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                          {t.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">{t.program}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <Building2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="font-semibold text-blue-900">{t.company}</span>
                      </div>

                      {t.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{t.location}</span>
                        </div>
                      )}

                      {t.duration && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{t.duration}</span>
                        </div>
                      )}

                      {t.videoThumbnailUrl && (
                        <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 group/video cursor-pointer">
                          <img
                            src={t.videoThumbnailUrl || "/placeholder.svg"}
                            alt="Video thumbnail"
                            className="w-full group-hover/video:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover/video:bg-black/40 flex items-center justify-center transition-colors">
                            <div className="p-4 bg-red-600 rounded-full shadow-xl group-hover/video:scale-110 transition-transform">
                              <Video className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-3 border-t-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(t)}
                          className="flex-1 h-11 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 font-semibold transition-all"
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => confirmDelete(t.id)}
                          className="flex-1 h-11 hover:bg-red-50 hover:text-red-700 hover:border-red-400 font-semibold transition-all"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog !== null} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-red-600 text-xl">
              <AlertCircle className="h-6 w-6" />
              ¿Eliminar testimonio?
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Esta acción no se puede deshacer. El testimonio será eliminado permanentemente del sistema y ya no se
              mostrará en el sitio público.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-0 pt-4">
            <Button variant="outline" onClick={() => setDeleteDialog(null)} className="h-11 px-6">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="h-11 px-6">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">¿Cancelar edición?</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Los cambios no guardados se perderán. ¿Está seguro de que desea cancelar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-0 pt-4">
            <Button variant="outline" onClick={() => setCancelDialog(false)} className="h-11 px-6">
              Continuar editando
            </Button>
            <Button variant="secondary" onClick={confirmCancel} className="h-11 px-6">
              Sí, cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}