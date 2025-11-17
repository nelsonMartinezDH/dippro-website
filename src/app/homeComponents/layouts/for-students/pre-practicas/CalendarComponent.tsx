"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock} from "lucide-react";
import React, {useEffect, useState} from "react";

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

const eventsApiUrl = `http://localhost:5213/api/CalendarEventsPrePracticas`;
const datesApiUrl = `http://localhost:5213/api/AcademicDatesPrePracticas`;

const CalendarComponent = () => {
    const [events, setEvents] = useState<CalendarEventPrePracticasDto[]>([]);
    const [dates, setDates] = useState<AcademicDatePrePracticasDto[]>([]);
    const [loadingCalendar, setLoadingCalendar] = useState(true);

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                const eventsRes = await fetch(eventsApiUrl);
                const eventsData: CalendarEventPrePracticasDto[] = eventsRes.ok ? await eventsRes.json() : [];
                setEvents(eventsData);

                const datesRes = await fetch(datesApiUrl);
                const datesData: AcademicDatePrePracticasDto[] = datesRes.ok ? await datesRes.json() : [];
                setDates(datesData);

            } catch (error) {
                console.error("Error al cargar datos del calendario para la vista pública:", error);
            } finally {
                setLoadingCalendar(false);
            }
        };

        fetchCalendarData();
    }, []);

    return (
        <Card className="border-l-4 border-l-teal-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-teal-600"/>
                    Calendario para Pre-Prácticas
                </CardTitle>
                <p className="text-gray-600">Fechas clave y eventos para estudiantes que se preparan para iniciar sus prácticas profesionales</p>
            </CardHeader>
            <CardContent>
                {loadingCalendar ? (
                    <div className="text-center p-4 text-gray-500">Cargando calendario...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-teal-700 mb-3">Próximos Eventos</h4>
                            <div className="space-y-3">
                                {events.length === 0 ? (
                                    <p className="text-gray-500">No hay eventos próximos para mostrar.</p>
                                ) : (
                                    events.map((event) => (
                                        <div key={event.idDto} className={`flex items-center gap-3 p-3 bg-${event.colorDto}-50 rounded-lg`}>
                                            <div className="text-center flex-shrink-0">
                                                <div className={`text-lg font-bold text-${event.colorDto}-600`}>{event.dayDto}</div>
                                                <div className={`text-xs text-${event.colorDto}-600 uppercase`}>{event.monthDto}</div>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold">{event.titleDto}</h5>
                                                <p className="text-sm text-gray-600">{event.descriptionDto}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-teal-700 mb-3">Fechas Académicas Importantes</h4>
                            <div className="space-y-2 text-sm">
                                {dates.length === 0 ? (
                                    <p className="text-gray-500">No hay fechas académicas importantes para mostrar.</p>
                                ) : (
                                    dates.map((date) => (
                                        <div key={date.idDto} className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span>{date.descriptionDto}</span>
                                            <span className="font-semibold">{date.dateValueDto}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CalendarComponent;