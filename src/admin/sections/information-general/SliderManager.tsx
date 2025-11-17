"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, UploadCloud, Save, CheckCircle2, AlertTriangle, Plus, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

interface SlideDto {
  id: number;
  title?: string;
  imageUrl: string;
}

interface SlideUpdateDto {
  id: number;
  title?: string;
  file?: File | null;
}

const SliderManager: React.FC = () => {
  const [sliders, setSliders] = useState<SlideDto[]>([])
  const [editingSlide, setEditingSlide] = useState<SlideDto | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editNewFile, setEditNewFile] = useState<File | null>(null)
  const [previewEdit, setPreviewEdit] = useState<string | null>(null)

  const [newFile, setNewFile] = useState<File | null>(null)
  const [previewNew, setPreviewNew] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const [loading, setLoading] = useState(false)
  const [selectedToDelete, setSelectedToDelete] = useState<SlideDto | null>(null)
  const [confirmAdd, setConfirmAdd] = useState(false)
  const [confirmEdit, setConfirmEdit] = useState(false)
  const [successDialog, setSuccessDialog] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  })

  const apiUrl = "http://localhost:5213/api/slider"
  const baseServerUrl = "http://localhost:5213"

  const getFullImageUrl = (path: string) => (path.startsWith("http") ? path : `${baseServerUrl}${path}`)

  // Cargar sliders
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data: SlideDto[]) => setSliders(data))
      .catch(() => toast.error("Error al cargar las imágenes"))
  }, [])

  const handleAdd = async () => {
    if (!newFile) {
      toast.warning("Selecciona una imagen antes de subir.")
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append("File", newFile)
    if (newTitle) formData.append("Title", newTitle);

    try {
      const res = await fetch(`${apiUrl}/upload`, { 
        method: "POST", 
        body: formData 
      })

      if (!res.ok) throw new Error()

      const newSlide: SlideDto = await res.json()
      setSliders((prev) => [...prev, newSlide])
      setNewFile(null)
      setNewTitle("")
      setPreviewNew(null)
      setOpenAddDialog(false)
      setConfirmAdd(false)
      setSuccessDialog({ open: true, message: "Imagen agregada exitosamente." })
    } catch {
      toast.error("Error al agregar slider.")
    } finally {
      setLoading(false)
    }
  }

  // Eliminar imagen
  const confirmDelete = async () => {
    if (!selectedToDelete) return

    try {
      await fetch(`${apiUrl}/${selectedToDelete.id}`, { method: "DELETE" })
      setSliders((prev) => prev.filter((s) => s.id !== selectedToDelete.id))
      setSelectedToDelete(null)
      setSuccessDialog({ open: true, message: "Imagen eliminada correctamente." })
    } catch {
      toast.error("Error al eliminar imagen")
    }
  }

  const handleEditSave = async () => {
    if (!editingSlide) return
    setLoading(true)

    try {
      if (editNewFile) {
        const formData = new FormData()
        formData.append("File", editNewFile)
        await fetch(`${apiUrl}/update-file/${editingSlide.id}`, {
          method: "PUT",
          body: formData,
        })
      }

      const updatedData: SlideUpdateDto = {
        id: editingSlide.id,
        title: editTitle,
      };

      const res = await fetch(`${apiUrl}/${editingSlide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      if (!res.ok) throw new Error();

      const final: SlideDto = await res.json()

      setSliders((prev) => 
        prev.map((s) => (s.id === editingSlide.id ? final : s)))
      setEditingSlide(null)
      setEditTitle("")
      setEditNewFile(null)
      setPreviewEdit(null)
      setConfirmEdit(false)

      setSuccessDialog({ open: true, message: "Cambios guardados exitosamente." })
    } catch {
      toast.error("Error al actualizar la imagen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white pb-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <ImageIcon className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Gestor de Slider</h2>
                <p className="text-cyan-100 text-sm mt-1">Administra las imágenes del carrusel principal</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-lg transition-all cursor-pointer h-72">
                <div className="p-4 bg-cyan-100 rounded-full mb-3">
                  <Plus className="h-8 w-8 text-cyan-600" />
                </div>
                <p className="font-semibold text-cyan-600 text-lg">Añadir Imagen</p>
                <p className="text-gray-500 text-sm mt-1">Subir nueva imagen al slider</p>
              </Card>
            </motion.div>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Agregar Nueva Imagen</DialogTitle>
              <DialogDescription>Sube una nueva imagen para incluirla en el slider principal.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="newFile">Seleccionar Imagen</Label>
                <Input
                  id="newFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null
                    setNewFile(file)
                    if (file) setPreviewNew(URL.createObjectURL(file))
                  }}
                  className="cursor-pointer"
                />
                {previewNew && (
                  <div className="mt-3 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={previewNew || "/placeholder.svg"}
                      alt="Previsualización"
                      className="w-full h-56 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newTitle">Título (opcional)</Label>
                <Input
                  id="newTitle"
                  type="text"
                  placeholder="Ejemplo: Banner institucional"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => setOpenAddDialog(false)} className="border-gray-300">
                Cancelar
              </Button>
              <Button onClick={() => setConfirmAdd(true)} disabled={!newFile} className="bg-cyan-600 hover:bg-cyan-700">
                <UploadCloud className="h-4 w-4 mr-2" />
                Subir Imagen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {sliders.length === 0
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-full h-72 rounded-xl" />)
          : sliders.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-gray-200 rounded-xl overflow-hidden group">
                  <CardHeader className="p-0 relative overflow-hidden">
                    <div className="relative h-56 bg-gray-100">
                      <img
                        src={getFullImageUrl(slide.imageUrl) || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-semibold text-gray-900 text-base truncate">{slide.title || "Sin título"}</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingSlide(slide)
                          setEditTitle(slide.title || "")
                          setPreviewEdit(getFullImageUrl(slide.imageUrl))
                        }}
                        className="flex-1 border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setSelectedToDelete(slide)}
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      <AlertDialog open={confirmAdd} onOpenChange={setConfirmAdd}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <UploadCloud className="h-6 w-6 text-cyan-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold">Confirmar Subida</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas agregar esta imagen al slider? Se mostrará en el carrusel principal del sitio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setConfirmAdd(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAdd} disabled={loading} className="bg-cyan-600 hover:bg-cyan-700">
              {loading ? "Subiendo..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!selectedToDelete}
        onOpenChange={(open) => {
          if (!open) setSelectedToDelete(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold text-red-600">Confirmar Eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar esta imagen del slider? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setSelectedToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={!!editingSlide}
        onOpenChange={(open) => {
          if (!open) {
            setEditingSlide(null)
            setConfirmEdit(false)
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Editar Imagen del Slider</DialogTitle>
            <DialogDescription>Actualiza el título o reemplaza la imagen actual</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {previewEdit && (
              <div className="rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={previewEdit || "/placeholder.svg"}
                  alt="Previsualización"
                  className="w-full h-56 object-cover"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="editTitle">Título</Label>
              <Input id="editTitle" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editFile">Nueva Imagen (opcional)</Label>
              <Input
                id="editFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null
                  setEditNewFile(file)
                  if (file) setPreviewEdit(URL.createObjectURL(file))
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setEditingSlide(null)} className="border-gray-300">
              Cancelar
            </Button>
            <Button onClick={() => setConfirmEdit(true)} className="bg-cyan-600 hover:bg-cyan-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmEdit} onOpenChange={setConfirmEdit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Edit className="h-6 w-6 text-cyan-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold">Confirmar Cambios</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas guardar los cambios realizados a esta imagen del slider?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setConfirmEdit(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleEditSave} disabled={loading} className="bg-cyan-600 hover:bg-cyan-700">
              {loading ? "Guardando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={successDialog.open} onOpenChange={() => setSuccessDialog({ open: false, message: "" })}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-emerald-100 rounded-full">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </div>
              <DialogTitle className="text-xl font-semibold text-emerald-600">Acción Completada</DialogTitle>
            </div>
          </DialogHeader>
          <p className="text-center text-gray-700 py-2">{successDialog.message}</p>
          <DialogFooter className="flex justify-center sm:justify-center">
            <Button
              onClick={() => setSuccessDialog({ open: false, message: "" })}
              className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
            >
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SliderManager