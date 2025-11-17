"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Save, Trash2, Edit, X, Briefcase, Plus, AlertTriangle } from "lucide-react"
import * as Icons from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const apiBaseUrl = "http://localhost:5213"

interface VinculationModality {
  id: number
  title: string
  duration: string
  description: string
  requirements: string
  color: string
  iconName: string
  fullDescription: string
  filePath: string
}

const VinculationModalityManager: React.FC = () => {
  const [modalities, setModalities] = useState<VinculationModality[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newForm, setNewForm] = useState({
    title: "",
    duration: "",
    description: "",
    requirements: "",
    color: "blue",
    iconName: "FileText",
    fullDescription: "",
  })
  const [newFile, setNewFile] = useState<File | null>(null)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<VinculationModality | null>(null)
  const [editFile, setEditFile] = useState<File | null>(null)

  const [successMessage, setSuccessMessage] = useState<{ text: string; type: "success" | "delete" } | null>(null)

  const [selectedToDelete, setSelectedToDelete] = useState<{ id: number; title: string } | null>(null)

  useEffect(() => {
    fetchModalities()
  }, [])

  const fetchModalities = async () => {
    setLoading(true)
    const res = await fetch(`${apiBaseUrl}/api/ProfessionalPracticeModality`)
    const data = await res.json()
    setModalities(data)
    setLoading(false)
  }

  const handleAddModality = async () => {
    if (!newForm.title || !newForm.description) {
      alert("Por favor, completa Título y Descripción.")
      return
    }

    const formData = new FormData()
    for (const [key, value] of Object.entries(newForm)) {
      formData.append(key, value)
    }
    if (newFile) formData.append("file", newFile)

    try {
      const res = await fetch(`${apiBaseUrl}/api/ProfessionalPracticeModality`, { method: "POST", body: formData })
      if (res.ok) {
        setNewForm({
          title: "",
          duration: "",
          description: "",
          requirements: "",
          color: "blue",
          iconName: "FileText",
          fullDescription: "",
        })
        setNewFile(null);
        (document.getElementById("new-modality-file") as HTMLInputElement).value = ""
        fetchModalities()

        setSuccessMessage({ text: "✅ Modalidad creada con éxito.", type: "success" })
        setTimeout(() => setSuccessMessage(null), 2500)
      }
    } catch (err) {
      console.error("Error al agregar modalidad:", err)
      setError("Error al agregar la modalidad.")
    }
  }

  const handleEditStart = (item: VinculationModality) => {
    setEditingId(item.id)
    setEditForm(item)
    setEditFile(null)
  }

  const handleEditSave = async (id: number) => {
    if (!editForm) return

    const formData = new FormData()
    formData.append("title", editForm.title)
    formData.append("duration", editForm.duration)
    formData.append("description", editForm.description)
    formData.append("requirements", editForm.requirements)
    formData.append("color", editForm.color)
    formData.append("iconName", editForm.iconName)
    formData.append("fullDescription", editForm.fullDescription)
    if (editFile) formData.append("file", editFile)

    try {
      const res = await fetch(`${apiBaseUrl}/api/ProfessionalPracticeModality/${id}`, { method: "PUT", body: formData })
      if (res.ok) {
        setEditingId(null)
        setEditForm(null)
        setEditFile(null)
        fetchModalities()

        setSuccessMessage({ text: "✅ Modalidad actualizada correctamente.", type: "success" })
        setTimeout(() => setSuccessMessage(null), 2500)

      }
    } catch (err) {
      console.error("Error al editar modalidad:", err)
      setError("Error al editar la modalidad.")
    }
  }

  const handleDelete = async (id: number) => {

    try {
      const res = await fetch(`${apiBaseUrl}/api/ProfessionalPracticeModality/${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchModalities()

        setSuccessMessage({ text: "🗑️ Modalidad eliminada correctamente.", type: "delete" })
        setTimeout(() => setSuccessMessage(null), 2500)

      }
    } catch (err) {
      console.error("Error al eliminar modalidad:", err)
      setError("Error al eliminar la modalidad.")
    }
  }

  const confirmDelete = async () => {
    if (!selectedToDelete) return
    await handleDelete(selectedToDelete.id)
    setSelectedToDelete(null)
  }


  const availableColors = [
    { name: "blue", hex: "#2563eb", label: "Azul" },
    { name: "green", hex: "#16a34a", label: "Verde" },
    { name: "purple", hex: "#9333ea", label: "Morado" },
    { name: "orange", hex: "#f97316", label: "Naranja" },
    { name: "red", hex: "#ef4444", label: "Rojo" },
    { name: "indigo", hex: "#4f46e5", label: "Índigo" },
  ]

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

  if (loading) {
    return <div className="text-center p-8 text-lg">Cargando modalidades...</div>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Briefcase className="h-7 w-7 text-teal-600" />
          </div>
          Gestor de Modalidades de Vinculación
        </h2>
        <p className="text-gray-600 ml-14">
          Administra las diferentes modalidades de vinculación para prácticas profesionales.
        </p>
      </div>

      {error && <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      {successMessage && (
        <div
          className={`flex items-center gap-2 p-3 rounded-md shadow-sm animate-in fade-in slide-in-from-top duration-300 mb-5 ${successMessage.type === "delete"
            ? "bg-red-100 border border-red-400 text-red-800"
            : "bg-green-100 border border-green-400 text-green-800"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${successMessage.type === "delete" ? "text-red-600" : "text-green-600"
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {successMessage.type === "delete" ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            )}
          </svg>
          <span className="font-medium">{successMessage.text}</span>
        </div>
      )}

      <div className="border-l-4 border-l-teal-500 rounded-lg p-6 shadow-xl bg-teal-50 mb-8">
        <h3 className="text-xl font-semibold mb-5 text-teal-700 flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Añadir Nueva Modalidad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Título de la modalidad"
            value={newForm.title}
            onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Duración (Ej: 3-6 meses)"
            value={newForm.duration}
            onChange={(e) => setNewForm({ ...newForm, duration: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Requisitos principales"
            value={newForm.requirements}
            onChange={(e) => setNewForm({ ...newForm, requirements: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Descripción corta"
            value={newForm.description}
            onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <textarea
          placeholder="Descripción completa de la modalidad..."
          value={newForm.fullDescription}
          onChange={(e) => setNewForm({ ...newForm, fullDescription: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-md mt-4 h-24 resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <select
              value={newForm.color}
              onChange={(e) => setNewForm({ ...newForm, color: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {availableColors.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ícono</label>
            <div className="flex items-center gap-3">
              <select
                value={newForm.iconName}
                onChange={(e) => setNewForm({ ...newForm, iconName: e.target.value })}
                className="flex-1 border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {availableIcons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
              {(() => {
                const IconPreview = (Icons as any)[newForm.iconName] || Icons.FileText
                return (
                  <div className="p-2 bg-teal-50 border border-teal-200 rounded-md">
                    <IconPreview className="h-6 w-6 text-teal-600" />
                  </div>
                )
              })()}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Documento (PDF, DOCX)</label>
            <input
              type="file"
              id="new-modality-file"
              onChange={(e) => setNewFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleAddModality}
          className="w-full mt-6 px-4 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-semibold transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newForm.title || !newForm.description}
        >
          Guardar Modalidad
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Modalidades Registradas</h3>
        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
          {modalities.length} {modalities.length === 1 ? "modalidad" : "modalidades"}
        </span>
      </div>

      <div className="space-y-4">
        {modalities.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No hay modalidades registradas</p>
            <p className="text-gray-400 text-sm mt-1">Agrega tu primera modalidad usando el formulario de arriba</p>
          </div>
        ) : (
          modalities.map((item) => {
            const Icon = (Icons as any)[item.iconName] || Icons.FileText
            const colorClass = availableColors.find((c) => c.name === item.color)?.hex || "#2563eb"

            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-150 flex items-start gap-4 bg-white"
              >
                <div className="flex-shrink-0 p-3 rounded-lg shadow-sm" style={{ backgroundColor: `${colorClass}15` }}>
                  <Icon className="h-7 w-7" style={{ color: colorClass }} />
                </div>

                <div className="flex-grow min-w-0">
                  {editingId === item.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editForm?.title || ""}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, title: e.target.value } : null)}
                          placeholder="Título"
                          className="w-full border border-gray-300 p-2 rounded-md font-semibold text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={editForm?.duration || ""}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, duration: e.target.value } : null)}
                          placeholder="Duración"
                          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editForm?.requirements || ""}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, requirements: e.target.value } : null)}
                          placeholder="Requisitos"
                          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={editForm?.description || ""}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, description: e.target.value } : null)}
                          placeholder="Descripción corta"
                          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>

                      <textarea
                        value={editForm?.fullDescription || ""}
                        onChange={(e) =>
                          setEditForm(editForm ? { ...editForm, fullDescription: e.target.value } : null)
                        }
                        placeholder="Descripción completa"
                        className="w-full border border-gray-300 p-2 rounded-md text-sm h-20 resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />

                      <div className="grid grid-cols-3 gap-3">
                        <select
                          value={editForm?.color || "blue"}
                          onChange={(e) => setEditForm(editForm ? { ...editForm, color: e.target.value } : null)}
                          className="w-full border border-gray-300 p-2 rounded-md text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          {availableColors.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.label}
                            </option>
                          ))}
                        </select>

                        <div className="flex items-center gap-2">
                          <select
                            value={editForm?.iconName || "FileText"}
                            onChange={(e) => setEditForm(editForm ? { ...editForm, iconName: e.target.value } : null)}
                            className="flex-1 border border-gray-300 p-2 rounded-md text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          >
                            {availableIcons.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                          {editForm && (() => {
                            const IconPreview = (Icons as any)[editForm.iconName] || Icons.FileText
                            return (
                              <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                                <IconPreview className="h-5 w-5 text-teal-600" />
                              </div>
                            )
                          })()}
                        </div>

                        <input
                          type="file"
                          onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                          className="text-xs w-full border border-gray-300 p-2 rounded-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <span className="font-semibold">Duración:</span> {item.duration}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="flex items-center gap-1">
                          <span className="font-semibold">Requisitos:</span> {item.requirements}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">{item.description}</p>
                      {item.fullDescription && (
                        <p className="text-xs text-gray-600 leading-relaxed mt-2 p-2 bg-gray-50 rounded border-l-2 border-gray-300">
                          {item.fullDescription}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <span className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-medium">
                          Color: {item.color}
                        </span>
                        <span className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-medium">
                          Ícono: {item.iconName}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 flex gap-2 self-start">
                  {editingId === item.id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(item.id)}
                        className="p-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-150 shadow-sm hover:shadow-md"
                        title="Guardar"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2.5 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition duration-150 shadow-sm hover:shadow-md"
                        title="Cancelar"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditStart(item)}
                        className="p-2.5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-150 shadow-sm hover:shadow-md"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSelectedToDelete({ id: item.id, title: item.title })}
                        className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-150 shadow-sm hover:shadow-md"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

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
              <AlertDialogTitle className="text-xl font-semibold text-red-600">
                Confirmar Eliminación
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar la modalidad{" "}
              <span className="font-semibold text-gray-900">
                “{selectedToDelete?.title}”
              </span>
              ? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setSelectedToDelete(null)}>
              Cancelar
            </AlertDialogCancel>
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

export default VinculationModalityManager