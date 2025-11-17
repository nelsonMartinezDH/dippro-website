"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Save, Trash2, Edit, X, FileText, Video, PlayCircle, Plus, Upload, AlertTriangle } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const apiBaseUrl = "http://localhost:5213"

interface VideoResource {
  id: number
  title: string
  description?: string
  fileUrl: string
  thumbnailUrl?: string
  duration?: string
}

interface DocumentResource {
  id: number
  title: string
  description?: string
  resourceType: string
  fileUrl?: string
  category?: string
}

const GedopracCardManager: React.FC = () => {
  const [videos, setVideos] = useState<VideoResource[]>([])
  const [documents, setDocuments] = useState<DocumentResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newVideo, setNewVideo] = useState({ title: "", fileUrl: "", description: "", duration: "" })

  const [editingVideoId, setEditingVideoId] = useState<number | null>(null)
  const [editVideoData, setEditVideoData] = useState<VideoResource | null>(null)

  const [newDoc, setNewDoc] = useState({
    title: "",
    description: "",
    resourceType: "documento",
    category: "Documentos",
  })
  const [newDocFile, setNewDocFile] = useState<File | null>(null)

  const [editingDocId, setEditingDocId] = useState<number | null>(null)
  const [editDocData, setEditDocData] = useState<DocumentResource | null>(null)
  const [editDocFile, setEditDocFile] = useState<File | null>(null)

  const [selectedToDelete, setSelectedToDelete] = useState<{ type: "video" | "doc"; id: number; title: string } | null>(null)

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/PracticasVideoResource`)
      if (res.ok) {
        const data = await res.json()
        setVideos(data)
      }
    } catch (error) {
      console.error("Error al cargar videos:", error)
    }
  }

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/PracticasDocumentResource`)
      if (res.ok) {
        const data = await res.json()
        const normalized = data.map((d: any) => ({
          ...d,
          fileUrl: d.fileUrl?.startsWith("http") ? d.fileUrl : `${apiBaseUrl}${d.fileUrl}`,
        }))
        setDocuments(normalized)
      }
    } catch (error) {
      console.error("Error al cargar documentos:", error)
    }
  }

  useEffect(() => {
    Promise.all([fetchVideos(), fetchDocuments()]).finally(() => setLoading(false))
  }, [])

  const handleAddVideo = async () => {
    if (!newVideo.title || !newVideo.fileUrl) {
      alert("Debe completar título y enlace de YouTube")
      return
    }

    const formData = new FormData()
    formData.append("title", newVideo.title)
    formData.append("fileUrl", newVideo.fileUrl)
    formData.append("description", newVideo.description || "")
    formData.append("duration", newVideo.duration || "")

    try {
      const res = await fetch(`${apiBaseUrl}/api/PracticasVideoResource`, {
        method: "POST",
        body: formData,
      })
      if (res.ok) {
        setNewVideo({ title: "", fileUrl: "", description: "", duration: "" })
        fetchVideos()
      }
    } catch (error) {
      console.error("Error al agregar video:", error)
      setError("Error al agregar video.")
    }
  }

  const handleEditVideoStart = (video: VideoResource) => {
    setEditingVideoId(video.id)
    setEditVideoData(video)
  }

  const handleEditVideoSave = async () => {
    if (!editVideoData || !editVideoData.title || !editVideoData.fileUrl) {
      alert("Faltan datos")
      return
    }

    const formData = new FormData()
    formData.append("title", editVideoData.title)
    formData.append("fileUrl", editVideoData.fileUrl)
    formData.append("description", editVideoData.description || "")
    formData.append("duration", editVideoData.duration || "")

    try {
      const res = await fetch(`${apiBaseUrl}/api/PracticasVideoResource/${editVideoData.id}`, {
        method: "PUT",
        body: formData,
      })
      if (res.ok) {
        setEditingVideoId(null)
        setEditVideoData(null)
        fetchVideos()
      }
    } catch (error) {
      console.error("Error al actualizar video:", error)
      setError("Error al actualizar video.")
    }
  }

  const handleDeleteVideo = async (id: number, title: string) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el video "${title}"?`)) {
      return
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/PracticasVideoResource/${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchVideos()
      }
    } catch (error) {
      console.error("Error al eliminar video:", error)
      setError("Error al eliminar video.")
    }
  }

  const handleAddDoc = async () => {
    if (!newDoc.title) {
      alert("Debe escribir un título para el documento")
      return
    }
    if (!newDocFile) {
      alert("Seleccione un archivo para subir")
      return
    }

    const formData = new FormData()
    formData.append("title", newDoc.title)
    formData.append("description", newDoc.description || "")
    formData.append("resourceType", newDoc.resourceType)
    formData.append("category", newDoc.category || "")
    formData.append("file", newDocFile)

    try {
      const res = await fetch(`${apiBaseUrl}/api/PracticasDocumentResource`, {
        method: "POST",
        body: formData,
      })
      if (res.ok) {
        setNewDoc({ title: "", description: "", resourceType: "documento", category: "Documentos" })
        setNewDocFile(null)
          ; (document.getElementById("new-doc-file") as HTMLInputElement).value = ""
        fetchDocuments()
      }
    } catch (error) {
      console.error("Error al agregar documento:", error)
      setError("Error al agregar documento.")
    }
  }

  const handleEditDocStart = (doc: DocumentResource) => {
    setEditingDocId(doc.id)
    setEditDocData(doc)
    setEditDocFile(null)
  }

  const handleEditDocSave = async () => {
    if (!editDocData || !editDocData.title) {
      alert("Faltan datos")
      return
    }

    const formData = new FormData()
    formData.append("title", editDocData.title)
    formData.append("description", editDocData.description || "")
    formData.append("resourceType", editDocData.resourceType)
    formData.append("category", editDocData.category || "")
    if (editDocFile) formData.append("file", editDocFile)

    try {
      const res = await fetch(`${apiBaseUrl}/api/PracticasDocumentResource/${editDocData.id}`, {
        method: "PUT",
        body: formData,
      })
      if (res.ok) {
        setEditingDocId(null)
        setEditDocData(null)
        setEditDocFile(null)
        fetchDocuments()
      }
    } catch (error) {
      console.error("Error al actualizar documento:", error)
      setError("Error al actualizar documento.")
    }
  }

  const handleDeleteDoc = async (id: number, title: string) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el documento "${title}"?`)) {
      return
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/PracticasDocumentResource/${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchDocuments()
      }
    } catch (error) {
      console.error("Error al eliminar documento:", error)
      setError("Error al eliminar documento.")
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedToDelete) return
    const { type, id } = selectedToDelete

    try {
      const endpoint =
        type === "video"
          ? `${apiBaseUrl}/api/PracticasVideoResource/${id}`
          : `${apiBaseUrl}/api/PracticasDocumentResource/${id}`

      const res = await fetch(endpoint, { method: "DELETE" })
      if (res.ok) {
        type === "video" ? fetchVideos() : fetchDocuments()
        setSelectedToDelete(null)
      }
    } catch (error) {
      console.error("Error al eliminar recurso:", error)
      setError("Error al eliminar recurso.")
    }
  }


  if (loading) return <div className="text-center p-8 text-lg">Cargando recursos...</div>

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-7 w-7 text-blue-600" />
          </div>
          Gestión de Videos y Documentos
        </h2>
        <p className="text-gray-600 ml-14">
          Administra los recursos educativos para el uso de la plataforma GEDOPRAC.
        </p>
      </div>

      {error && <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-blue-100 rounded">
              <Video className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-700">Videos de YouTube</h3>
          </div>

          <div className="border-l-4 border-l-blue-500 rounded-lg p-6 shadow-xl bg-blue-50 mb-6">
            <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Agregar Nuevo Video
            </h4>
            <input
              type="text"
              placeholder="Título del video"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Enlace de YouTube"
              value={newVideo.fileUrl}
              onChange={(e) => setNewVideo({ ...newVideo, fileUrl: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Duración (Ej: 12:34)"
                value={newVideo.duration}
                onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Descripción"
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleAddVideo}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newVideo.title || !newVideo.fileUrl}
            >
              Agregar Video
            </button>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">Lista de Videos</h4>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {videos.length}
            </span>
          </div>

          <div className="space-y-3">
            {videos.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <Video className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">No hay videos creados</p>
                <p className="text-gray-400 text-sm mt-1">Agrega tu primer video usando el formulario de arriba</p>
              </div>
            ) : (
              videos.map((video) => (
                <div
                  key={video.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-150 flex items-start gap-4 bg-white"
                >
                  <div className="flex-shrink-0 p-2.5 bg-blue-100 rounded-lg">
                    <PlayCircle className="h-6 w-6 text-blue-600" />
                  </div>

                  <div className="flex-grow min-w-0">
                    {editingVideoId === video.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editVideoData?.title || ""}
                          onChange={(e) =>
                            setEditVideoData((prev) => (prev ? { ...prev, title: e.target.value } : null))
                          }
                          placeholder="Título"
                          className="w-full border border-gray-300 p-2 rounded-md font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={editVideoData?.fileUrl || ""}
                          onChange={(e) =>
                            setEditVideoData((prev) => (prev ? { ...prev, fileUrl: e.target.value } : null))
                          }
                          placeholder="URL"
                          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={editVideoData?.duration || ""}
                            onChange={(e) =>
                              setEditVideoData((prev) => (prev ? { ...prev, duration: e.target.value } : null))
                            }
                            placeholder="Duración"
                            className="w-full border border-gray-300 p-2 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={editVideoData?.description || ""}
                            onChange={(e) =>
                              setEditVideoData((prev) => (prev ? { ...prev, description: e.target.value } : null))
                            }
                            placeholder="Descripción"
                            className="w-full border border-gray-300 p-2 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">{video.title}</h5>
                        <p className="text-sm text-gray-600">
                          {video.duration && <span className="font-medium">{video.duration}</span>}
                          {video.duration && video.description && <span className="mx-1">•</span>}
                          {video.description && <span>{video.description}</span>}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0 flex gap-2 self-start">
                    {editingVideoId === video.id ? (
                      <>
                        <button
                          onClick={handleEditVideoSave}
                          className="p-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-150 shadow-sm hover:shadow-md"
                          title="Guardar"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingVideoId(null)}
                          className="p-2.5 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition duration-150 shadow-sm hover:shadow-md"
                          title="Cancelar"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditVideoStart(video)}
                          className="p-2.5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-150 shadow-sm hover:shadow-md"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setSelectedToDelete({ type: "video", id: video.id, title: video.title })}
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
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-gray-200 rounded">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-700">Documentos</h3>
          </div>

          <div className="border-l-4 border-l-gray-500 rounded-lg p-6 shadow-xl bg-gray-50 mb-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Agregar Nuevo Documento
            </h4>
            <input
              type="text"
              placeholder="Título del documento"
              value={newDoc.title}
              onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select
                value={newDoc.resourceType}
                onChange={(e) => setNewDoc({ ...newDoc, resourceType: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="documento">Documento</option>
                <option value="manual">Manual</option>
              </select>
              <select
                value={newDoc.category}
                onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="Manuales de usuario">Manuales de usuario</option>
                <option value="Documentos">Documentos</option>
              </select>
            </div>
            <input
              type="file"
              id="new-doc-file"
              onChange={(e) => setNewDocFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <textarea
              placeholder="Descripción"
              value={newDoc.description}
              onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-md mb-3 h-20 resize-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <button
              onClick={handleAddDoc}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 font-semibold transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newDoc.title || !newDocFile}
            >
              Agregar Documento
            </button>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">Lista de Documentos</h4>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
              {documents.length}
            </span>
          </div>

          <div className="space-y-3">
            {documents.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">No hay documentos creados</p>
                <p className="text-gray-400 text-sm mt-1">Agrega tu primer documento usando el formulario de arriba</p>
              </div>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-150 flex items-start gap-4 bg-white"
                >
                  <div className="flex-shrink-0 p-2.5 bg-gray-200 rounded-lg">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>

                  <div className="flex-grow min-w-0">
                    {editingDocId === doc.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editDocData?.title || ""}
                          onChange={(e) => setEditDocData((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                          placeholder="Título"
                          className="w-full border border-gray-300 p-2 rounded-md font-semibold text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={editDocData?.resourceType || "documento"}
                            onChange={(e) =>
                              setEditDocData((prev) => (prev ? { ...prev, resourceType: e.target.value } : null))
                            }
                            className="w-full border border-gray-300 p-2 rounded-md text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          >
                            <option value="documento">Documento</option>
                            <option value="manual">Manual</option>
                          </select>
                          <select
                            value={editDocData?.category || "Documentos"}
                            onChange={(e) =>
                              setEditDocData((prev) => (prev ? { ...prev, category: e.target.value } : null))
                            }
                            className="w-full border border-gray-300 p-2 rounded-md text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          >
                            <option value="Manuales de usuario">Manuales de usuario</option>
                            <option value="Documentos">Documentos</option>
                          </select>
                        </div>
                        <input
                          type="file"
                          onChange={(e) => setEditDocFile(e.target.files?.[0] || null)}
                          className="text-xs w-full border border-gray-300 p-2 rounded-md"
                        />
                        <textarea
                          value={editDocData?.description || ""}
                          onChange={(e) =>
                            setEditDocData((prev) => (prev ? { ...prev, description: e.target.value } : null))
                          }
                          placeholder="Descripción"
                          className="w-full border border-gray-300 p-2 rounded-md text-xs h-16 resize-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">{doc.title}</h5>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{doc.resourceType}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.category}</span>
                        </p>
                        {doc.description && (
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{doc.description}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0 flex gap-2 self-start">
                    {editingDocId === doc.id ? (
                      <>
                        <button
                          onClick={handleEditDocSave}
                          className="p-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-150 shadow-sm hover:shadow-md"
                          title="Guardar"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingDocId(null)}
                          className="p-2.5 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition duration-150 shadow-sm hover:shadow-md"
                          title="Cancelar"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditDocStart(doc)}
                          className="p-2.5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-150 shadow-sm hover:shadow-md"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setSelectedToDelete({ type: "doc", id: doc.id, title: doc.title })}
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
        </div>
      </div>

      <AlertDialog open={!!selectedToDelete} onOpenChange={(open) => !open && setSelectedToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold text-red-600">Confirmar Eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar el recurso{" "}
              <strong>{selectedToDelete?.title}</strong>? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setSelectedToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

export default GedopracCardManager