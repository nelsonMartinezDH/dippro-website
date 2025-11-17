"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Plus, Trash2, Edit, Save, X, CalendarIcon, AlertTriangle, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
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

interface CalendarEvent {
  id: number
  day: number
  month: string
  title: string
  description: string
  color: string
}

interface AcademicDate {
  id: number
  description: string
  dateValue: string
}

const apiBaseUrl = "http://localhost:5213/api"
const eventsApiUrl = `${apiBaseUrl}/CalendarEvents`
const datesApiUrl = `${apiBaseUrl}/AcademicDates`

const CalendarManager: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [dates, setDates] = useState<AcademicDate[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)

  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, "id">>({
    day: 0,
    month: "",
    title: "",
    description: "",
    color: "teal",
  })

  const [newAcademicDate, setNewAcademicDate] = useState<Omit<AcademicDate, "id">>({
    description: "",
    dateValue: "",
  })

  const [editingEventId, setEditingEventId] = useState<number | null>(null)
  const [editEventData, setEditEventData] = useState<CalendarEvent | null>(null)
  const [editingDateId, setEditingDateId] = useState<number | null>(null)
  const [editDateData, setEditDateData] = useState<AcademicDate | null>(null)

  // Dialog states
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false)
  const [deleteDateDialogOpen, setDeleteDateDialogOpen] = useState(false)
  const [pendingDeleteEventId, setPendingDeleteEventId] = useState<number | null>(null)
  const [pendingDeleteDateId, setPendingDeleteDateId] = useState<number | null>(null)
  const [pendingDeleteEventTitle, setPendingDeleteEventTitle] = useState("")
  const [pendingDeleteDateDesc, setPendingDeleteDateDesc] = useState("")

  const fetchEvents = async () => {
    try {
      const res = await fetch(eventsApiUrl)
      const data = await res.json()
      setEvents(data)
    } catch (error) {
      console.error("Error al cargar eventos:", error)
    }
  }

  const fetchDates = async () => {
    try {
      const res = await fetch(datesApiUrl)
      const data = await res.json()
      setDates(data)
    } catch (error) {
      console.error("Error al cargar fechas:", error)
    }
  }

  useEffect(() => {
    Promise.all([fetchEvents(), fetchDates()]).finally(() => setLoading(false))
  }, [])

  const handleAddEvent = async () => {
    if (!newEvent.day || !newEvent.month || !newEvent.title) {
      alert("Faltan datos en el evento")
      return
    }

    try {
      const res = await fetch(eventsApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      })
      if (res.ok) {
        setNewEvent({ day: 0, month: "", title: "", description: "", color: "teal" })
        fetchEvents()
        setMessage("✅ Evento agregado correctamente.")
        setTimeout(() => setMessage(null), 3000)
      } else {
        alert("Error al agregar evento")
      }
    } catch (error) {
      console.error("Error en POST evento:", error)
    }
  }

  const handleDeleteEventClick = (id: number, title: string) => {
    setPendingDeleteEventId(id)
    setPendingDeleteEventTitle(title)
    setDeleteEventDialogOpen(true)
  }

  const handleDeleteEventConfirm = async () => {
    if (!pendingDeleteEventId) return

    try {
      const res = await fetch(`${eventsApiUrl}/${pendingDeleteEventId}`, { method: "DELETE" })
      if (res.ok) {
        fetchEvents()
        setMessage("🗑️ Evento eliminado correctamente.")
        setTimeout(() => setMessage(null), 2500)
      } else {
        alert("Error al eliminar evento")
      }
    } catch (error) {
      console.error("Error en DELETE evento:", error)
    }

    setDeleteEventDialogOpen(false)
    setPendingDeleteEventId(null)
    setPendingDeleteEventTitle("")
  }

  const handleEditEventStart = (event: CalendarEvent) => {
    setEditingEventId(event.id)
    setEditEventData(event)
  }

  const handleEditEventSave = async () => {
    if (!editEventData || !editEventData.day || !editEventData.month || !editEventData.title) {
      alert("Faltan datos")
      return
    }

    try {
      const res = await fetch(`${eventsApiUrl}/${editEventData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEventData),
      })
      if (res.ok) {
        setEditingEventId(null)
        setEditEventData(null)
        fetchEvents()
        setMessage("✅ Evento actualizado correctamente.")
        setTimeout(() => setMessage(null), 3000)
      } else {
        alert("Error al actualizar evento")
      }
    } catch (error) {
      console.error("Error en PUT evento:", error)
    }
  }

  const handleAddDate = async () => {
    if (!newAcademicDate.description || !newAcademicDate.dateValue) {
      alert("Faltan datos en la fecha")
      return
    }

    try {
      const res = await fetch(datesApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAcademicDate),
      })
      if (res.ok) {
        setNewAcademicDate({ description: "", dateValue: "" })
        fetchDates()
        setMessage("✅ Fecha académica agregada correctamente.")
        setTimeout(() => setMessage(null), 3000)
      } else {
        alert("Error al agregar fecha")
      }
    } catch (error) {
      console.error("Error en POST fecha:", error)
    }
  }

  const handleDeleteDateClick = (id: number, description: string) => {
    setPendingDeleteDateId(id)
    setPendingDeleteDateDesc(description)
    setDeleteDateDialogOpen(true)
  }

  const handleDeleteDateConfirm = async () => {
    if (!pendingDeleteDateId) return

    try {
      const res = await fetch(`${datesApiUrl}/${pendingDeleteDateId}`, { method: "DELETE" })
      if (res.ok) {
        fetchDates()
        setMessage("🗑️ Fecha académica eliminada correctamente.")
        setTimeout(() => setMessage(null), 2500)
      } else {
        alert("Error al eliminar fecha")
      }
    } catch (error) {
      console.error("Error en DELETE fecha:", error)
    }

    setDeleteDateDialogOpen(false)
    setPendingDeleteDateId(null)
    setPendingDeleteDateDesc("")
  }

  const handleEditDateStart = (date: AcademicDate) => {
    setEditingDateId(date.id)
    setEditDateData(date)
  }

  const handleEditDateSave = async () => {
    if (!editDateData || !editDateData.description || !editDateData.dateValue) {
      alert("Faltan datos")
      return
    }

    try {
      const res = await fetch(`${datesApiUrl}/${editDateData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDateData),
      })
      if (res.ok) {
        setEditingDateId(null)
        setEditDateData(null)
        fetchDates()
        setMessage("✅ Fecha académica actualizada correctamente.")
        setTimeout(() => setMessage(null), 3000)
      } else {
        alert("Error al actualizar fecha")
      }
    } catch (error) {
      console.error("Error en PUT fecha:", error)
    }
  }

  const colorClasses = {
    teal: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-600",
      button: "bg-teal-600 hover:bg-teal-700",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
    },
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Cargando datos del calendario...</p>
        </div>
      </div>
    )

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white pb-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <CalendarIcon className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Gestión de Calendario</h2>
                <p className="text-teal-100 text-sm mt-1">Administra eventos y fechas académicas importantes</p>
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
            className={`p-4 border rounded-lg flex items-center gap-3 shadow-sm ${
              message.includes("✅")
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Events section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Eventos del Calendario</h3>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="shadow-lg border-2 border-teal-100 hover:shadow-xl transition-all">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-semibold text-teal-800 text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Agregar Nuevo Evento
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  <Input
                    type="number"
                    placeholder="Día"
                    value={newEvent.day || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, day: Number.parseInt(e.target.value) || 0 })}
                    className="col-span-1 border-2 h-11"
                  />
                  <Input
                    type="text"
                    placeholder="Mes"
                    value={newEvent.month}
                    onChange={(e) => setNewEvent({ ...newEvent, month: e.target.value.toUpperCase() })}
                    className="col-span-1 border-2 h-11"
                    maxLength={3}
                  />
                  <Input
                    type="text"
                    placeholder="Título"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="col-span-2 border-2 h-11"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Descripción corta"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="border-2 h-11"
                />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Label className="font-medium text-sm">Color:</Label>
                    <select
                      value={newEvent.color}
                      onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                      className={`p-2 border-2 rounded-md ${colorClasses[newEvent.color as keyof typeof colorClasses]?.bg} ${colorClasses[newEvent.color as keyof typeof colorClasses]?.text} font-medium h-11`}
                    >
                      <option value="teal">Teal</option>
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                    </select>
                  </div>
                  <Button onClick={handleAddEvent} className="bg-teal-600 hover:bg-teal-700 shadow-md w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Evento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events list */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Lista de Eventos ({events.length})
            </h4>
            {events.length === 0 ? (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No hay eventos creados</p>
                  <p className="text-gray-400 text-sm mt-1">Comienza agregando tu primer evento</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {events.map((event, index) => {
                    const colors = colorClasses[event.color as keyof typeof colorClasses] || colorClasses.teal
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <Card className={`shadow-md hover:shadow-lg transition-all border-2 ${colors.border}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="text-center p-3 bg-white rounded-lg shadow-sm min-w-[70px] border-2 border-gray-100">
                                <div className={`text-2xl font-bold ${colors.text}`}>{event.day}</div>
                                <div className={`text-xs ${colors.text} uppercase font-semibold mt-1`}>
                                  {event.month}
                                </div>
                              </div>

                              {editingEventId === event.id ? (
                                <div className="flex-1 space-y-2">
                                  <Input
                                    value={editEventData?.title || ""}
                                    onChange={(e) =>
                                      setEditEventData((prev) => (prev ? { ...prev, title: e.target.value } : null))
                                    }
                                    placeholder="Título"
                                    className="border-2 h-10"
                                  />
                                  <Input
                                    value={editEventData?.description || ""}
                                    onChange={(e) =>
                                      setEditEventData((prev) =>
                                        prev ? { ...prev, description: e.target.value } : null,
                                      )
                                    }
                                    placeholder="Descripción"
                                    className="border-2 h-10"
                                  />
                                  <div className="flex gap-2">
                                    <Input
                                      type="number"
                                      value={editEventData?.day || ""}
                                      onChange={(e) =>
                                        setEditEventData((prev) =>
                                          prev ? { ...prev, day: Number.parseInt(e.target.value) || 0 } : null,
                                        )
                                      }
                                      placeholder="Día"
                                      className="border-2 h-10"
                                    />
                                    <Input
                                      value={editEventData?.month || ""}
                                      onChange={(e) =>
                                        setEditEventData((prev) =>
                                          prev ? { ...prev, month: e.target.value.toUpperCase() } : null,
                                        )
                                      }
                                      placeholder="Mes"
                                      maxLength={3}
                                      className="border-2 h-10"
                                    />
                                    <select
                                      value={editEventData?.color || "teal"}
                                      onChange={(e) =>
                                        setEditEventData((prev) => (prev ? { ...prev, color: e.target.value } : null))
                                      }
                                      className="p-2 border-2 rounded-md flex-1 h-10"
                                    >
                                      <option value="teal">Teal</option>
                                      <option value="blue">Blue</option>
                                      <option value="purple">Purple</option>
                                    </select>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-900 text-base">{event.title}</h5>
                                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{event.description}</p>
                                </div>
                              )}

                              <div className="flex-shrink-0 flex gap-2">
                                {editingEventId === event.id ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={handleEditEventSave}
                                      className="bg-green-500 hover:bg-green-600"
                                    >
                                      <Save className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setEditingEventId(null)}
                                      className="border-2"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleEditEventStart(event)}
                                      className="border-2 hover:bg-gray-50"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleDeleteEventClick(event.id, event.title)}
                                      className="border-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Academic dates section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Fechas Académicas</h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="shadow-lg border-2 border-blue-100 hover:shadow-xl transition-all">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-semibold text-blue-800 text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Agregar Nueva Fecha
                </h4>
                <Input
                  type="text"
                  placeholder="Descripción (Ej: Inicio de Semestre)"
                  value={newAcademicDate.description}
                  onChange={(e) => setNewAcademicDate({ ...newAcademicDate, description: e.target.value })}
                  className="border-2 h-11"
                />
                <Input
                  type="text"
                  placeholder="Valor/Período (Ej: Agosto 4)"
                  value={newAcademicDate.dateValue}
                  onChange={(e) => setNewAcademicDate({ ...newAcademicDate, dateValue: e.target.value })}
                  className="border-2 h-11"
                />
                <Button onClick={handleAddDate} className="w-full bg-blue-600 hover:bg-blue-700 shadow-md h-11">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Fecha Académica
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dates list */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Lista de Fechas ({dates.length})
            </h4>
            {dates.length === 0 ? (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No hay fechas académicas</p>
                  <p className="text-gray-400 text-sm mt-1">Comienza agregando la primera fecha</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {dates.map((date, index) => (
                    <motion.div
                      key={date.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Card className="shadow-md hover:shadow-lg transition-all border-2 border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center gap-4">
                            {editingDateId === date.id ? (
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={editDateData?.description || ""}
                                  onChange={(e) =>
                                    setEditDateData((prev) => (prev ? { ...prev, description: e.target.value } : null))
                                  }
                                  placeholder="Descripción"
                                  className="border-2 h-10"
                                />
                                <Input
                                  value={editDateData?.dateValue || ""}
                                  onChange={(e) =>
                                    setEditDateData((prev) => (prev ? { ...prev, dateValue: e.target.value } : null))
                                  }
                                  placeholder="Valor/Período"
                                  className="border-2 h-10"
                                />
                              </div>
                            ) : (
                              <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <span className="font-medium text-gray-900">{date.description}</span>
                                <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full text-sm border border-blue-200">
                                  {date.dateValue}
                                </span>
                              </div>
                            )}

                            <div className="flex-shrink-0 flex gap-2">
                              {editingDateId === date.id ? (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={handleEditDateSave}
                                    className="bg-green-500 hover:bg-green-600"
                                  >
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingDateId(null)}
                                    className="border-2"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditDateStart(date)}
                                    className="border-2 hover:bg-gray-50"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeleteDateClick(date.id, date.description)}
                                    className="border-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete event dialog */}
      <AlertDialog open={deleteEventDialogOpen} onOpenChange={setDeleteEventDialogOpen}>
        <AlertDialogContent className="border-2">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl">Confirmar eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar el evento{" "}
              <span className="font-semibold text-gray-900">"{pendingDeleteEventTitle}"</span>? Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel className="border-2">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEventConfirm} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete date dialog */}
      <AlertDialog open={deleteDateDialogOpen} onOpenChange={setDeleteDateDialogOpen}>
        <AlertDialogContent className="border-2">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl">Confirmar eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar la fecha académica{" "}
              <span className="font-semibold text-gray-900">"{pendingDeleteDateDesc}"</span>? Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel className="border-2">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDateConfirm} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CalendarManager