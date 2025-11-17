"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  getSteps,
  createStep,
  updateStep,
  deleteStep,
  type PracticasStep,
} from "@/services/sections/for-students/practicas-profesionales/step-by-step-component/practicasStepService"
import { ListOrdered, Save, Trash2, Edit, X, Plus, AlertTriangle } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const StepByStepManager: React.FC = () => {
  const [steps, setSteps] = useState<PracticasStep[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newForm, setNewForm] = useState<PracticasStep>({
    stepNumber: 0,
    title: "",
    subtitle: "",
    description: "",
    tips: "",
    color: "blue",
    actions: "",
  })
  const [newImageFile, setNewImageFile] = useState<File | null>(null)

  const [editingStepId, setEditingStepId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<PracticasStep | null>(null)
  const [editImageFile, setEditImageFile] = useState<File | null>(null)

  const [selectedToDelete, setSelectedToDelete] = useState<PracticasStep | null>(null)

  const loadSteps = async () => {
    setLoading(true)
    const data = await getSteps()
    setSteps(data.sort((a, b) => a.stepNumber - b.stepNumber))
    setLoading(false)
  }

  useEffect(() => {
    loadSteps()
  }, [])

  const handleAddStep = async () => {
    if (!newForm.title || !newForm.subtitle || !newForm.description) {
      alert("Por favor, completa Título, Subtítulo y Descripción.")
      return
    }

    const formData = new FormData()
    formData.append("stepNumber", newForm.stepNumber.toString())
    formData.append("title", newForm.title)
    formData.append("subtitle", newForm.subtitle)
    formData.append("description", newForm.description)
    formData.append("tips", newForm.tips)
    formData.append("color", newForm.color)
    formData.append("actions", newForm.actions)
    if (newImageFile) formData.append("image", newImageFile)

    try {
      await createStep(formData)
      setNewForm({
        stepNumber: 0,
        title: "",
        subtitle: "",
        description: "",
        tips: "",
        color: "blue",
        actions: "",
      })
      setNewImageFile(null)
        ; (document.getElementById("new-step-image") as HTMLInputElement).value = ""
      loadSteps()
    } catch (err) {
      console.error("Error al agregar paso:", err)
      setError("Error al agregar el paso.")
    }
  }

  const handleEditStart = (step: PracticasStep) => {
    setEditingStepId(step.id || null)
    setEditForm(step)
    setEditImageFile(null)
  }

  const handleEditSave = async (id: number) => {
    if (!editForm) return

    const formData = new FormData()
    formData.append("stepNumber", editForm.stepNumber.toString())
    formData.append("title", editForm.title)
    formData.append("subtitle", editForm.subtitle)
    formData.append("description", editForm.description)
    formData.append("tips", editForm.tips)
    formData.append("color", editForm.color)
    formData.append("actions", editForm.actions)
    if (editImageFile) formData.append("image", editImageFile)

    try {
      await updateStep(id, formData)
      setEditingStepId(null)
      setEditForm(null)
      setEditImageFile(null)
      loadSteps()
    } catch (err) {
      console.error("Error al editar paso:", err)
      setError("Error al editar el paso.")
    }
  }

  const handleDelete = (step: PracticasStep) => {
    setSelectedToDelete(step)
  }

  const confirmDelete = async () => {
    if (!selectedToDelete) return
    try {
      await deleteStep(selectedToDelete.id!)
      setSelectedToDelete(null)
      loadSteps()
    } catch (err) {
      console.error("Error al eliminar paso:", err)
      setError("Error al eliminar el paso.")
    }
  }

  const colorOptions = [
    { value: "blue", label: "Azul" },
    { value: "green", label: "Verde" },
    { value: "orange", label: "Naranja" },
    { value: "purple", label: "Morado" },
    { value: "teal", label: "Turquesa" },
    { value: "indigo", label: "Índigo" },
  ]

  if (loading) {
    return <div className="text-center p-8 text-lg">Cargando pasos...</div>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ListOrdered className="h-7 w-7 text-blue-600" />
          </div>
          Gestión de Pasos del Proceso
        </h2>
        <p className="text-gray-600 ml-14">
          Administra los pasos del proceso de prácticas profesionales para estudiantes.
        </p>
      </div>

      {error && <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <div className="border-l-4 border-l-blue-500 rounded-lg p-6 shadow-xl bg-blue-50 mb-8">
        <h3 className="text-xl font-semibold mb-5 text-blue-700 flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Añadir Nuevo Paso
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Número de paso"
            value={newForm.stepNumber || ""}
            onChange={(e) => setNewForm({ ...newForm, stepNumber: Number.parseInt(e.target.value) || 0 })}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
          <input
            type="text"
            placeholder="Título"
            value={newForm.title}
            onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Subtítulo"
            value={newForm.subtitle}
            onChange={(e) => setNewForm({ ...newForm, subtitle: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <textarea
          placeholder="Descripción del paso"
          value={newForm.description}
          onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-md mt-4 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <textarea
          placeholder="Consejos y recomendaciones (opcional)"
          value={newForm.tips}
          onChange={(e) => setNewForm({ ...newForm, tips: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-md mt-4 h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="text"
          placeholder="Acciones clave (separadas por comas)"
          value={newForm.actions}
          onChange={(e) => setNewForm({ ...newForm, actions: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-md mt-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color principal</label>
            <select
              value={newForm.color}
              onChange={(e) => setNewForm({ ...newForm, color: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {colorOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del paso</label>
            <input
              type="file"
              id="new-step-image"
              accept="image/*"
              onChange={(e) => setNewImageFile(e.target.files ? e.target.files[0] : null)}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleAddStep}
          className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newForm.title || !newForm.subtitle || !newForm.description}
        >
          Guardar Paso
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Pasos Registrados</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {steps.length} {steps.length === 1 ? "paso" : "pasos"}
        </span>
      </div>

      <div className="space-y-4">
        {steps.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <ListOrdered className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No hay pasos registrados</p>
            <p className="text-gray-400 text-sm mt-1">Agrega tu primer paso usando el formulario de arriba</p>
          </div>
        ) : (
          steps.map((step) => (
            <div
              key={step.id}
              className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-150 flex items-start gap-4 bg-white"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                {step.stepNumber}
              </div>

              <div className="flex-grow min-w-0">
                {editingStepId === step.id ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="number"
                        value={editForm?.stepNumber || ""}
                        onChange={(e) =>
                          setEditForm(
                            editForm ? { ...editForm, stepNumber: Number.parseInt(e.target.value) || 0 } : null,
                          )
                        }
                        placeholder="Número"
                        className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={editForm?.title || ""}
                        onChange={(e) => setEditForm(editForm ? { ...editForm, title: e.target.value } : null)}
                        placeholder="Título"
                        className="w-full border border-gray-300 p-2 rounded-md font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={editForm?.subtitle || ""}
                        onChange={(e) => setEditForm(editForm ? { ...editForm, subtitle: e.target.value } : null)}
                        placeholder="Subtítulo"
                        className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <textarea
                      value={editForm?.description || ""}
                      onChange={(e) => setEditForm(editForm ? { ...editForm, description: e.target.value } : null)}
                      placeholder="Descripción"
                      className="w-full border border-gray-300 p-2 rounded-md text-sm h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <textarea
                      value={editForm?.tips || ""}
                      onChange={(e) => setEditForm(editForm ? { ...editForm, tips: e.target.value } : null)}
                      placeholder="Consejos"
                      className="w-full border border-gray-300 p-2 rounded-md text-sm h-16 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <input
                      type="text"
                      value={editForm?.actions || ""}
                      onChange={(e) => setEditForm(editForm ? { ...editForm, actions: e.target.value } : null)}
                      placeholder="Acciones"
                      className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={editForm?.color || "blue"}
                        onChange={(e) => setEditForm(editForm ? { ...editForm, color: e.target.value } : null)}
                        className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {colorOptions.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditImageFile(e.target.files ? e.target.files[0] : null)}
                        className="text-sm w-full border border-gray-300 p-2 rounded-md"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-blue-600 font-semibold mb-2">{step.subtitle}</p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">{step.description}</p>
                    {step.tips && (
                      <div className="flex items-start gap-2 mt-2 p-2 bg-yellow-50 border-l-2 border-yellow-400 rounded">
                        <span className="text-yellow-600 text-sm">💡</span>
                        <p className="text-xs text-gray-700 italic">{step.tips}</p>
                      </div>
                    )}
                    {step.actions && (
                      <p className="text-xs text-gray-600 mt-2">
                        <span className="font-semibold">Acciones:</span> {step.actions}
                      </p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <span className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-medium">
                        Color: {step.color}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 flex gap-2 self-start">
                {editingStepId === step.id ? (
                  <>
                    <button
                      onClick={() => step.id && handleEditSave(step.id)}
                      className="p-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-150 shadow-sm hover:shadow-md"
                      title="Guardar"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingStepId(null)}
                      className="p-2.5 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition duration-150 shadow-sm hover:shadow-md"
                      title="Cancelar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditStart(step)}
                      className="p-2.5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-150 shadow-sm hover:shadow-md"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(step)}
                      className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-150 shadow-sm hover:shadow-md"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
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
              ¿Estás seguro de que deseas eliminar el paso{" "}
              <span className="font-semibold text-gray-900">
                "{selectedToDelete?.title}"
              </span>
              ? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setSelectedToDelete(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar Paso
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default StepByStepManager