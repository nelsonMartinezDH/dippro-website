import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "¿Qué son exactamente las pre-prácticas y por qué son obligatorias?",
    answer:
      "Las pre-prácticas son un programa de formación virtual desarrollado con Coomeva que prepara a los estudiantes para el mundo laboral. Son obligatorias porque proporcionan competencias esenciales como habilidades blandas, ética profesional y preparación para entrevistas.",
  },
  {
    question: "¿Cómo me inscribo en las pre-prácticas y cuándo puedo hacerlo?",
    answer:
      "Debes inscribirte a través del módulo estudiantil durante las fechas del cronograma académico. La inscripción es gratuita y se realiza totalmente online.",
  },
  {
    question: "¿Qué requisitos debo cumplir para poder tomar las pre-prácticas?",
    answer:
      "Debes haber completado al menos el 60% de los créditos, estar matriculado, no tener materias críticas y contar con disponibilidad para asistir a las sesiones virtuales.",
  },
  {
    question: "¿Las pre-prácticas son completamente virtuales? ¿Qué plataforma utilizan?",
    answer:
      "Sí, son 100% virtuales y se desarrollan en plataformas digitales en alianza con Coomeva. Recibirás instrucciones y enlaces por correo electrónico.",
  },
  {
    question: "¿Cuánto tiempo duran y qué horarios manejan?",
    answer:
      "La duración es de 4 semanas. Los horarios son flexibles y generalmente se realizan en las tardes o fines de semana.",
  },
  {
    question: "¿Qué pasa si no puedo asistir a alguna sesión virtual?",
    answer:
      "Las sesiones quedan grabadas. Se requiere al menos el 80% de asistencia, pero existen opciones de recuperación en casos excepcionales.",
  },
  {
    question: "¿Recibo certificado al completar las pre-prácticas?",
    answer:
      "Sí, un certificado conjunto de la Universidad del Magdalena y Coomeva. Es indispensable para inscribirse a las prácticas profesionales.",
  },
  {
    question: "¿Las pre-prácticas tienen algún costo adicional?",
    answer:
      "No, son totalmente gratuitas gracias al convenio institucional con Coomeva.",
  },
];

const FaqComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 py-2">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        Preguntas Frecuentes - Pre-Prácticas
      </h2>

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border border-teal-200 rounded-xl bg-white shadow-sm overflow-hidden"
          >
            <button
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-teal-50 transition"
            >
              <span className="font-medium text-teal-800">{faq.question}</span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-teal-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-teal-600" />
              )}
            </button>

            {isOpen && (
              <div className="px-4 pb-4 text-gray-700 leading-relaxed animate-in fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-xl">
        <p className="text-sm text-teal-700 mb-2">
          ¿Tienes otra duda? Nuestro equipo está listo para ayudarte.
        </p>

        <div className="flex gap-2">
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            Enviar correo
          </Button>
          <Button size="sm" variant="outline">
            Llamar ahora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaqComponent;