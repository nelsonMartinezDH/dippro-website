"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Plus, Trash2, Edit, Save, X, CalendarIcon, Sparkles, AlertTriangle } from "lucide-react"
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
import { motion, AnimatePresence } from "framer-motion"

interface CalendarEventPrePracticasDto {
  idDto: number
  dayDto: number
  monthDto: string
  titleDto: string
  descriptionDto: string
  colorDto: string
}

interface AcademicDatePrePracticasDto {
  idDto: number
  descriptionDto: string
  dateValueDto: string
}

// CONSTANTES DE API
const apiBaseUrl = "http://localhost:5213/api"
const eventsApiUrl = `${apiBaseUrl}/CalendarEventsPrePracticas`
const datesApiUrl = `${apiBaseUrl}/AcademicDatesPrePracticas`

const colorStyles = {
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-700",
    textBold: "text-teal-800",
    button: "bg-teal-600 hover:bg-teal-700",
    badge: "bg-teal-100 text-teal-800",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    textBold: "text-blue-800",
    button: "bg-blue-600 hover:bg-blue-700",
    badge: "bg-blue-100 text-blue-800",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    textBold: "text-purple-800",
    button: "bg-purple-600 hover:bg-purple-700",
    badge: "bg-purple-100 text-purple-800",
  },
}

const CalendarPrePracticasManager: React.FC = () => {
  // ESTADOS
  const [events, setEvents] = useState<CalendarEventPrePracticasDto[]>([])
  const [dates, setDates] = useState<AcademicDatePrePracticasDto[]>([])
  const [loading, setLoading] = useState(true)

  const [newEvent, setNewEvent] = useState<Omit<CalendarEventPrePracticasDto, "idDto">>({
    dayDto: 0,
    monthDto: "",
    titleDto: "",
    descriptionDto: "",
    colorDto: "teal",
  })

  const [newAcademicDate, setNewAcademicDate] = useState<Omit<AcademicDatePrePracticasDto, "idDto">>({
    descriptionDto: "",
    dateValueDto: "",
  })

  const [editingEventId, setEditingEventId] = useState<number | null>(null)
  const [editEventData, setEditEventData] = useState<CalendarEventPrePracticasDto | null>(null)
  const [editingDateId, setEditingDateId] = useState<number | null>(null)
  const [editDateData, setEditDateData] = useState<AcademicDatePrePracticasDto | null>(null)

  const [deleteEventDialog, setDeleteEventDialog] = useState<number | null>(null)
  const [deleteDateDialog, setDeleteDateDialog] = useState<number | null>(null)

  const [dayError, setDayError] = useState(false)
  const [editDayError, setEditDayError] = useState(false)

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
    if (!newEvent.dayDto || !newEvent.monthDto || !newEvent.titleDto) return alert("Faltan datos en el evento")

    if (!newEvent.dayDto || newEvent.dayDto < 1 || newEvent.dayDto > 31) {
      setDayError(true)
      return
    }

    setDayError(false)

    try {
      const res = await fetch(eventsApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      })
      if (res.ok) {
        setNewEvent({ dayDto: 0, monthDto: "", titleDto: "", descriptionDto: "", colorDto: "teal" })
        fetchEvents()
      } else {
        alert("Error al agregar evento")
      }
    } catch (error) {
      console.error("Error en POST evento:", error)
    }
  }

  const handleDeleteEvent = async (id: number) => {
    try {
      const res = await fetch(`${eventsApiUrl}/${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchEvents()
        setDeleteEventDialog(null)
      } else {
        alert("Error al eliminar evento")
      }
    } catch (error) {
      console.error("Error en DELETE evento:", error)
    }
  }

  const handleEditEventStart = (event: CalendarEventPrePracticasDto) => {
    setEditingEventId(event.idDto)
    setEditEventData(event)
  }

  const handleEditEventSave = async () => {
    if (!editEventData || !editEventData.dayDto || !editEventData.monthDto || !editEventData.titleDto)
      return alert("Faltan datos")

    if (!editEventData.dayDto || editEventData.dayDto < 1 || editEventData.dayDto > 31) {
      setEditDayError(true)
      return
    }

    setEditDayError(false)

    try {
      const res = await fetch(`${eventsApiUrl}/${editEventData.idDto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEventData),
      })
      if (res.ok) {
        setEditingEventId(null)
        setEditEventData(null)
        fetchEvents()
      } else {
        alert("Error al actualizar evento")
      }
    } catch (error) {
      console.error("Error en PUT evento:", error)
    }
  }

  const handleAddDate = async () => {
    if (!newAcademicDate.descriptionDto || !newAcademicDate.dateValueDto) return alert("Faltan datos en la fecha")

    try {
      const res = await fetch(datesApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAcademicDate),
      })
      if (res.ok) {
        setNewAcademicDate({ descriptionDto: "", dateValueDto: "" })
        fetchDates()
      } else {
        alert("Error al agregar fecha")
      }
    } catch (error) {
      console.error("Error en POST fecha:", error)
    }
  }

  const handleDeleteDate = async (id: number) => {
    try {
      const res = await fetch(`${datesApiUrl}/${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchDates()
        setDeleteDateDialog(null)
      } else {
        alert("Error al eliminar fecha")
      }
    } catch (error) {
      console.error("Error en DELETE fecha:", error)
    }
  }

  const handleEditDateStart = (date: AcademicDatePrePracticasDto) => {
    setEditingDateId(date.idDto)
    setEditDateData(date)
  }

  const handleEditDateSave = async () => {
    if (!editDateData || !editDateData.descriptionDto || !editDateData.dateValueDto) return alert("Faltan datos")

    try {
      const res = await fetch(`${datesApiUrl}/${editDateData.idDto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDateData),
      })
      if (res.ok) {
        setEditingDateId(null)
        setEditDateData(null)
        fetchDates()
      } else {
        alert("Error al actualizar fecha")
      }
    } catch (error) {
      console.error("Error en PUT fecha:", error)
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Cargando datos del calendario...</p>
        </div>
      </div>
    )

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl shadow-lg p-6 md:p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <CalendarIcon className="h-7 w-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Gestión de Calendario</h1>
        </div>
        <p className="text-teal-50 text-sm md:text-base leading-relaxed">
          Administra los eventos y las fechas académicas importantes para la sección "Pre-Prácticas"
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* EVENTOS SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b">
              <CardTitle className="flex items-center gap-2 text-teal-800">
                <Clock className="h-5 w-5" />
                <span>Eventos del Calendario</span>
                <span className="ml-auto text-sm font-normal bg-teal-200 text-teal-800 px-3 py-1 rounded-full">
                  {events.length} eventos
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-6">
              <div className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-100 rounded-xl p-4 md:p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-teal-600" />
                  <h4 className="font-semibold text-teal-900 text-lg">Agregar Nuevo Evento</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Día</Label>
                    <Input
                      type="number"
                      placeholder="15"
                      value={newEvent.dayDto || ""}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value) || 0
                        setNewEvent({ ...newEvent, dayDto: value })
                        setDayError(value < 1 || value > 31)
                      }}
                      className={`border ${dayError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                        } rounded-md px-3 py-2 transition-colors duration-200`}
                    />
                    {dayError && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-2 py-1 mt-1">
                        Ingresa un número válido entre <strong>1</strong> y <strong>31</strong> por favor.
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Mes</Label>
                    <Input
                      type="text"
                      placeholder="MAR"
                      value={newEvent.monthDto}
                      onChange={(e) => setNewEvent({ ...newEvent, monthDto: e.target.value.toUpperCase() })}
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500 uppercase"
                      maxLength={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Título del Evento</Label>
                  <Input
                    type="text"
                    placeholder="Ej: Inicio de Inscripciones"
                    value={newEvent.titleDto}
                    onChange={(e) => setNewEvent({ ...newEvent, titleDto: e.target.value })}
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Descripción</Label>
                  <Input
                    type="text"
                    placeholder="Descripción breve del evento"
                    value={newEvent.descriptionDto}
                    onChange={(e) => setNewEvent({ ...newEvent, descriptionDto: e.target.value })}
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                  <div className="space-y-2 flex-1 w-full">
                    <Label className="text-sm font-medium text-gray-700">Color del Evento</Label>
                    <select
                      value={newEvent.colorDto}
                      onChange={(e) => setNewEvent({ ...newEvent, colorDto: e.target.value })}
                      className={`w-full p-2.5 border-2 rounded-lg font-medium transition-colors ${colorStyles[newEvent.colorDto as keyof typeof colorStyles].badge} ${colorStyles[newEvent.colorDto as keyof typeof colorStyles].border}`}
                    >
                      <option value="teal">🟢 Teal</option>
                      <option value="blue">🔵 Azul</option>
                      <option value="purple">🟣 Morado</option>
                    </select>
                  </div>
                  <Button
                    onClick={handleAddEvent}
                    className="bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                    size="lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Eventos Registrados</h4>
                {events.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No hay eventos creados</p>
                    <p className="text-gray-400 text-sm mt-1">Agrega tu primer evento arriba</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    <AnimatePresence mode="popLayout">
                      {events.map((event) => {
                        const styles = colorStyles[event.colorDto as keyof typeof colorStyles]
                        return (
                          <motion.div
                            key={event.idDto}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`flex flex-col sm:flex-row gap-3 p-4 ${styles.bg} rounded-xl border-2 ${styles.border} shadow-sm hover:shadow-md transition-all duration-200`}
                          >
                            <div
                              className={`flex-shrink-0 text-center p-3 bg-white rounded-lg border-2 ${styles.border} shadow-sm w-20 mx-auto sm:mx-0`}
                            >
                              <div className={`text-2xl font-bold ${styles.textBold}`}>{event.dayDto}</div>
                              <div className={`text-xs ${styles.text} uppercase font-semibold tracking-wider`}>
                                {event.monthDto}
                              </div>
                            </div>

                            {editingEventId === event.idDto ? (
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={editEventData?.titleDto || ""}
                                  onChange={(e) =>
                                    setEditEventData((prev) => (prev ? { ...prev, titleDto: e.target.value } : null))
                                  }
                                  placeholder="Título"
                                  className="bg-white"
                                />
                                <Input
                                  value={editEventData?.descriptionDto || ""}
                                  onChange={(e) =>
                                    setEditEventData((prev) => (prev ? { ...prev, descriptionDto: e.target.value } : null))
                                  }
                                  placeholder="Descripción"
                                  className="bg-white"
                                />
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  <Input
                                    type="number"
                                    placeholder="Ej: 15"
                                    value={editEventData?.dayDto || ""}
                                    onChange={(e) => {
                                      const value = Number.parseInt(e.target.value) || 0
                                      setEditEventData((prev) =>
                                        prev ? { ...prev, dayDto: value } : null
                                      )
                                      setEditDayError(value < 1 || value > 31)
                                    }}
                                    className={`bg-white border ${editDayError
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        : "border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                                      } rounded-md px-3 py-2 transition-colors duration-200`}
                                    min={1}
                                    max={31}
                                  />
                                  <Input
                                    value={editEventData?.monthDto || ""}
                                    onChange={(e) =>
                                      setEditEventData((prev) =>
                                        prev ? { ...prev, monthDto: e.target.value.toUpperCase() } : null,
                                      )
                                    }
                                    placeholder="Mes"
                                    className="bg-white uppercase"
                                    maxLength={3}
                                  />
                                  <select
                                    value={editEventData?.colorDto || "teal"}
                                    onChange={(e) =>
                                      setEditEventData((prev) => (prev ? { ...prev, colorDto: e.target.value } : null))
                                    }
                                    className="p-2 border rounded-lg bg-white col-span-2 sm:col-span-1"
                                  >
                                    <option value="teal">Teal</option>
                                    <option value="blue">Azul</option>
                                    <option value="purple">Morado</option>
                                  </select>
                                </div>
                              </div>
                            ) : (
                              <div className="flex-1 min-w-0">
                                <h5 className={`font-semibold ${styles.textBold} text-lg mb-1`}>{event.titleDto}</h5>
                                <p className="text-sm text-gray-600 leading-relaxed">{event.descriptionDto}</p>
                              </div>
                            )}

                            <div className="flex sm:flex-col gap-2 justify-end">
                              {editingEventId === event.idDto ? (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={handleEditEventSave}
                                    className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none"
                                  >
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setEditingEventId(null)
                                      setEditEventData(null)
                                    }}
                                    className="flex-1 sm:flex-none"
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
                                    className="hover:bg-blue-50 flex-1 sm:flex-none"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => setDeleteEventDialog(event.idDto)}
                                    className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FECHAS ACADÉMICAS SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <CalendarIcon className="h-5 w-5" />
                <span>Fechas Académicas</span>
                <span className="ml-auto text-sm font-normal bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
                  {dates.length} fechas
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-4 md:p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900 text-lg">Agregar Nueva Fecha</h4>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Descripción</Label>
                  <Input
                    type="text"
                    placeholder="Ej: Inicio de Semestre"
                    value={newAcademicDate.descriptionDto}
                    onChange={(e) => setNewAcademicDate({ ...newAcademicDate, descriptionDto: e.target.value })}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Fecha / Período</Label>
                  <Input
                    type="text"
                    placeholder="Ej: Agosto 4"
                    value={newAcademicDate.dateValueDto}
                    onChange={(e) => setNewAcademicDate({ ...newAcademicDate, dateValueDto: e.target.value })}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <Button
                  onClick={handleAddDate}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                  size="lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Fecha
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Fechas Registradas</h4>
                {dates.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No hay fechas académicas</p>
                    <p className="text-gray-400 text-sm mt-1">Agrega tu primera fecha arriba</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    <AnimatePresence mode="popLayout">
                      {dates.map((date) => (
                        <motion.div
                          key={date.idDto}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col sm:flex-row gap-3 p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          {editingDateId === date.idDto ? (
                            <div className="flex-1 space-y-2">
                              <Input
                                value={editDateData?.descriptionDto || ""}
                                onChange={(e) =>
                                  setEditDateData((prev) => (prev ? { ...prev, descriptionDto: e.target.value } : null))
                                }
                                placeholder="Descripción"
                                className="bg-white"
                              />
                              <Input
                                value={editDateData?.dateValueDto || ""}
                                onChange={(e) =>
                                  setEditDateData((prev) => (prev ? { ...prev, dateValueDto: e.target.value } : null))
                                }
                                placeholder="Valor/Período"
                                className="bg-white"
                              />
                            </div>
                          ) : (
                            <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-2">
                              <span className="text-gray-700 font-medium">{date.descriptionDto}</span>
                              <span className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg text-sm w-fit">
                                {date.dateValueDto}
                              </span>
                            </div>
                          )}

                          <div className="flex gap-2 justify-end">
                            {editingDateId === date.idDto ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={handleEditDateSave}
                                  className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none"
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingDateId(null)
                                    setEditDateData(null)
                                  }}
                                  className="flex-1 sm:flex-none"
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
                                  className="hover:bg-blue-50 flex-1 sm:flex-none"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => setDeleteDateDialog(date.idDto)}
                                  className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <AlertDialog open={deleteEventDialog !== null} onOpenChange={() => setDeleteEventDialog(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl">Confirmar Eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar este evento del calendario? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="m-0">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteEventDialog && handleDeleteEvent(deleteEventDialog)}
              className="bg-red-600 hover:bg-red-700 m-0"
            >
              Eliminar Evento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDateDialog !== null} onOpenChange={() => setDeleteDateDialog(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl">Confirmar Eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar esta fecha académica? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="m-0">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDateDialog && handleDeleteDate(deleteDateDialog)}
              className="bg-red-600 hover:bg-red-700 m-0"
            >
              Eliminar Fecha
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CalendarPrePracticasManager