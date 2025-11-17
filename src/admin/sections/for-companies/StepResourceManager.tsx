"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  FileSpreadsheet,
  Image,
  Video,
  Music,
  FolderArchive,
  ExternalLink,
  FileType,
  Plus,
  Edit,
  Trash,
  Building2,
  Megaphone,
  Users,
  ClipboardCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Dialog components (shadcn/ui)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface StepResource {
  id?: number;
  stepNumber: number;
  title: string;
  buttonLabel: string;
  iconName: string;
  fileUrl?: string;
}

const apiBaseUrl = "http://localhost:5213";

const stepData: Record<
  number,
  { title: string; icon: React.ElementType; color: string }
> = {
  1: { title: "Registro de la Empresa", icon: Building2, color: "blue" },
  2: { title: "Publicación de la Convocatoria", icon: Megaphone, color: "amber" },
  3: { title: "Selección de Candidatos", icon: Users, color: "green" },
  4: { title: "Formalización del Convenio", icon: ClipboardCheck, color: "purple" },
};

const availableIcons = [
  { name: "FileText", label: "Documento", icon: FileText },
  { name: "FileSpreadsheet", label: "Excel / Datos", icon: FileSpreadsheet },
  { name: "Image", label: "Imagen", icon: Image },
  { name: "Video", label: "Video", icon: Video },
  { name: "Music", label: "Audio / Podcast", icon: Music },
  { name: "FolderArchive", label: "ZIP / Carpeta", icon: FolderArchive },
  { name: "ExternalLink", label: "Enlace", icon: ExternalLink },
  { name: "FileType", label: "Word / Documento", icon: FileType },
];

const StepResourceManager: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [resources, setResources] = useState<StepResource[]>([]);
  const [formData, setFormData] = useState<StepResource>({
    stepNumber: 1,
    title: "",
    buttonLabel: "",
    iconName: "FileText",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // UX states
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formPulse, setFormPulse] = useState(false);

  // Dialog states
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditConfirmDialog, setShowEditConfirmDialog] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchResources(activeStep);
    // keep form stepNumber in sync with active tab
    setFormData((prev) => ({ ...prev, stepNumber: activeStep }));
  }, [activeStep]);

  const fetchResources = async (step: number) => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/StepResource?stepNumber=${step}`);
      if (res.ok) {
        const data = await res.json();
        setResources(data);
      } else {
        setResources([]);
      }
    } catch (err) {
      console.error("Error fetching resources", err);
      setResources([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value } as StepResource);
  };

  // Small spinner for buttons
  const SmallSpinner = ({ size = 16 }: { size?: number }) => (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="0" />
    </svg>
  );

  // Submit -> if editing, show confirm dialog; otherwise save
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isEditing) {
      setShowEditConfirmDialog(true);
      return;
    }
    await saveFormData();
  };

  const saveFormData = async () => {
    if (!formData.title || !formData.buttonLabel) {
      alert("Por favor completa el título y el título del botón.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("StepNumber", activeStep.toString());
      payload.append("Title", formData.title);
      payload.append("ButtonLabel", formData.buttonLabel);
      payload.append("IconName", formData.iconName);
      if (file) payload.append("File", file);

      const endpoint = isEditing
        ? `${apiBaseUrl}/api/StepResource/update/${formData.id}`
        : `${apiBaseUrl}/api/StepResource/upload`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, { method, body: payload });
      if (res.ok) {
        await fetchResources(activeStep);
        resetForm();
        // small pulse to indicate success
        setFormPulse(true);
        setTimeout(() => setFormPulse(false), 700);
      } else {
        alert("Error al guardar el recurso.");
      }
    } catch (err) {
      console.error("Error saving resource", err);
      alert("Error al guardar el recurso.");
    } finally {
      setSubmitting(false);
      setShowEditConfirmDialog(false);
    }
  };

  const handleEdit = (resource: StepResource) => {
    setFormData(resource);
    setIsEditing(true);
    setFile(null);
    // scroll to top so preview and form are visible
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      stepNumber: activeStep,
      title: "",
      buttonLabel: "",
      iconName: "FileText",
    });
    setFile(null);
    setIsEditing(false);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ""
  };

  // Delete flow with dialog
  const handleDeleteClick = (id?: number) => {
    if (!id) return;
    setPendingDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    setDeletingId(pendingDeleteId);
    try {
      const res = await fetch(`${apiBaseUrl}/api/StepResource/${pendingDeleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchResources(activeStep);
      } else {
        alert("Error al eliminar el recurso.");
      }
    } catch (err) {
      console.error("Error deleting resource", err);
      alert("Error al eliminar el recurso.");
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
      setShowDeleteDialog(false);
    }
  };

  // Helper to get icon component from availableIcons
  const getIconComponent = (name?: string) => {
    return availableIcons.find((i) => i.name === name)?.icon || FileText;
  };

  return (
    <Card className="border-l-4 border-l-indigo-500 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-700">
          <FileText className="h-6 w-6 text-indigo-600" />
          Gestión de Recursos por Paso
        </CardTitle>
        <p className="text-gray-600">
          Administra los recursos disponibles para cada uno de los pasos de la guía de solicitud de practicantes.
        </p>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="1" onValueChange={(val) => setActiveStep(Number(val))}>
          <TabsList className="grid grid-cols-4 gap-2 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <TabsTrigger key={step} value={step.toString()}>
                Paso {step}
              </TabsTrigger>
            ))}
          </TabsList>

          {[1, 2, 3, 4].map((step) => {
            const StepIcon = stepData[step].icon;
            const color = stepData[step].color;

            return (
              <TabsContent key={step} value={step.toString()}>
                <div
                  className={`mb-6 p-4 rounded-md flex items-center gap-3 border-l-4 ${
                    step === 1
                      ? "bg-blue-50 border-blue-500"
                      : step === 2
                        ? "bg-amber-50 border-amber-500"
                        : step === 3
                          ? "bg-green-50 border-green-500"
                          : "bg-purple-50 border-purple-500"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step === 1
                        ? "bg-blue-500"
                        : step === 2
                          ? "bg-amber-500"
                          : step === 3
                            ? "bg-green-500"
                            : "bg-purple-500"
                    }`}
                  >
                    <StepIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg ${
                        step === 1
                          ? "text-blue-800"
                          : step === 2
                            ? "text-amber-800"
                            : step === 3
                              ? "text-green-800"
                              : "text-purple-800"
                      }`}
                    >
                      Paso {step}: {stepData[step].title}
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                      Recursos y materiales asociados a este paso.
                    </p>
                  </div>
                </div>

                {/* Layout: Form (left) + Preview (right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Form */}
                  <motion.form
                    onSubmit={handleSubmit}
                    className={`col-span-2 p-4 border rounded-lg bg-white space-y-4 transition-all ${formPulse ? "ring-2 ring-indigo-200" : ""}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="font-semibold mb-2 text-gray-700">
                      {isEditing ? "Editar Recurso" : "Agregar Nuevo Recurso"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Título del Recurso</Label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Ej: Manual de Registro"
                        />
                      </div>
                      <div>
                        <Label>Título del Botón</Label>
                        <Input
                          name="buttonLabel"
                          value={formData.buttonLabel}
                          onChange={handleInputChange}
                          placeholder="Ej: Descargar PDF"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label>Ícono</Label>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {availableIcons.map((item) => {
                            const Icon = item.icon;
                            const selected = formData.iconName === item.name;
                            return (
                              <button
                                key={item.name}
                                type="button"
                                className={`border rounded-md p-2 flex flex-col items-center text-xs transition-colors ${
                                  selected ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-400"
                                }`}
                                onClick={() => setFormData({ ...formData, iconName: item.name })}
                              >
                                <Icon className={`h-5 w-5 mb-1 ${selected ? "text-indigo-600" : "text-gray-500"}`} />
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <Label>Archivo</Label>
                        <Input
                          type="file"
                          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        />
                        {formData.fileUrl && (
                          <a href={`${apiBaseUrl}${formData.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm mt-2 block">
                            Ver archivo actual
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button onClick={(e) => handleSubmit(e)} className="bg-indigo-600 hover:bg-indigo-700" disabled={submitting}>
                        {submitting ? <SmallSpinner /> : <>{isEditing ? "Actualizar" : "Guardar"}</>}
                      </Button>
                      {isEditing && (
                        <Button onClick={resetForm} variant="outline" className="text-gray-700">
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </motion.form>

                  {/* Right: Sticky preview */}
                  <div className="col-span-1">
                    <div className="sticky top-28">
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                        <div className="rounded-xl p-4 shadow-lg border bg-gradient-to-b from-white to-indigo-50/30">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-md bg-indigo-50">
                              {React.createElement(getIconComponent(formData.iconName), { className: "h-6 w-6 text-indigo-600" })}
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Vista previa</div>
                              <div className="font-semibold text-gray-800">{formData.title || "Título del recurso"}</div>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-gray-600">
                            <div><strong>Botón:</strong> {formData.buttonLabel || "—"}</div>
                            <div className="mt-2"><strong>Paso:</strong> {activeStep}</div>
                          </div>

                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" onClick={resetForm} size="sm">Limpiar</Button>
                            <Button onClick={(e) => handleSubmit(e)} size="sm" className="bg-indigo-600 hover:bg-indigo-700">{isEditing ? "Guardar cambios" : "Guardar"}</Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Lista de recursos */}
                <h4 className="font-semibold mb-3 text-gray-700 mt-6">Recursos registrados en este paso</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources.length > 0 ? (
                    resources.map((r) => {
                      const Icon = getIconComponent(r.iconName);
                      return (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="p-4 border rounded-lg bg-white shadow-sm flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="h-5 w-5 text-indigo-600" />
                              <h5 className="font-semibold text-gray-800">{r.title}</h5>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Botón: {r.buttonLabel}</p>
                            {r.fileUrl ? (
                              <a href={`${apiBaseUrl}${r.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-indigo-500 text-sm">Ver archivo</a>
                            ) : (
                              <div className="text-sm text-gray-400">Sin archivo</div>
                            )}
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(r)} className="flex-1">
                              <Edit className="h-4 w-4 mr-1" /> Editar
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(r.id)} className="flex-1">
                              {deletingId === r.id ? <SmallSpinner /> : <Trash className="h-4 w-4 mr-1" />} Eliminar
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 italic">No hay recursos registrados.</p>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>

      {/* Delete confirm dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">¿Eliminar recurso?</DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              Esta acción no se puede deshacer. Se eliminará el recurso seleccionado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={confirmDelete}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit confirm dialog */}
      <Dialog open={showEditConfirmDialog} onOpenChange={setShowEditConfirmDialog}>
        <DialogContent className="sm:max-w-md border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">Confirmar actualización</DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              ¿Deseas guardar los cambios realizados en este recurso?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowEditConfirmDialog(false)}>Cancelar</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={saveFormData}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StepResourceManager;