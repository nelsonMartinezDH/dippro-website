"use client";

import React, { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

interface CallHeroImageData {
  id: number;
  imageUrl: string;
}

const CallHeroImageManager: React.FC = () => {
  const [imageRecord, setImageRecord] = useState<CallHeroImageData | null>(null);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openReplace, setOpenReplace] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const apiUrl = "http://localhost:5213/api/CallHeroImage";
  const baseServerUrl = "http://localhost:5213";
  const IMAGE_ID = 1;

  const getFullImageUrl = (path: string) =>
    !path ? null : path.startsWith("http") ? path : `${baseServerUrl}${path}`;

  const fetchImage = async () => {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Error al cargar la imagen");
      const data = await res.json();
      setImageRecord(data);
    } catch {
      setErrorMessage("No se pudo cargar la imagen actual.");
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const showMessage = (msg: string, isSuccess = true) => {
    if (isSuccess) setSuccessMessage(msg);
    else setErrorMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 3500);
  };

  const handleUpload = async () => {
    if (!newFile) {
      showMessage("Por favor, seleccione una imagen primero.", false);
      return;
    }

    setLoading(true);
    setOverlayLoading(true);
    const formData = new FormData();
    formData.append("file", newFile);

    try {
      const res = await fetch(`${apiUrl}/update/${IMAGE_ID}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();

      const data = await res.json();
      setImageRecord((prev) => (prev ? { ...prev, imageUrl: data.imageUrl } : data));
      showMessage("✅ Imagen reemplazada exitosamente.");
      setPreview(null);
      setNewFile(null);
      setOpenReplace(false);
      fetchImage();
    } catch {
      showMessage("❌ Error al subir la imagen.", false);
    } finally {
      setLoading(false);
      setOverlayLoading(false);
    }
  };

  const handleDelete = async () => {
    setOverlayLoading(true);
    try {
      const res = await fetch(`${apiUrl}/delete/${IMAGE_ID}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error();

      setImageRecord((prev) => (prev ? { ...prev, imageUrl: "" } : null));
      showMessage("🗑️ Imagen eliminada correctamente.");
      setOpenDelete(false);
    } catch {
      showMessage("❌ Error al eliminar la imagen.", false);
    } finally {
      setOverlayLoading(false);
    }
  };

  const currentImageUrl = getFullImageUrl(imageRecord?.imageUrl || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-xl border border-gray-200 bg-white rounded-2xl overflow-hidden relative">
        {overlayLoading && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-50">
            <Loader2 className="h-10 w-10 text-white animate-spin mb-3" />
            <p className="text-white text-sm font-medium animate-pulse">
              Procesando solicitud...
            </p>
          </div>
        )}

        <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-5">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <ImageIcon className="h-5 w-5 text-yellow-300" />
            Fondo del Hero — Sección Convocatorias
          </CardTitle>
          <p className="text-sm text-purple-100 mt-1">
            Administra la imagen principal del encabezado de la sección de convocatorias.
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {successMessage && (
            <Alert className="border-l-4 border-green-500 bg-green-50 flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {errorMessage && (
            <Alert className="border-l-4 border-red-500 bg-red-50 flex items-center gap-2 shadow-sm">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Imagen Actual del Hero
            </h3>

            <div className="border rounded-xl bg-gray-50 p-4 mb-8 hover:shadow-md transition-all duration-200">
              {currentImageUrl ? (
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <img
                    src={currentImageUrl}
                    alt="Fondo actual"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold tracking-wide">
                      Imagen Activa
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
                  Usando degradado predeterminado.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-end">
            {/* --- REEMPLAZAR IMAGEN --- */}
            <Dialog open={openReplace} onOpenChange={setOpenReplace}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md">
                  <Upload className="h-4 w-4 mr-2" /> Reemplazar Imagen
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg rounded-xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-800">
                    Reemplazar Imagen de Fondo
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                  <p className="text-sm text-gray-600">
                    Selecciona una nueva imagen que reemplazará la actual.
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setNewFile(file);
                      if (file) setPreview(URL.createObjectURL(file));
                    }}
                  />
                  {preview && (
                    <div className="relative mt-3 rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={preview}
                        alt="Vista previa"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-xs">
                        Vista previa
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setOpenReplace(false)}
                    className="border-gray-300"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!newFile || loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Subiendo...
                      </>
                    ) : (
                      "Guardar Imagen"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* --- ELIMINAR IMAGEN --- */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium shadow-md"
                  disabled={!currentImageUrl}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Eliminar Imagen
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-800">
                    ¿Eliminar Imagen de Fondo?
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  Esta acción eliminará la imagen actual y mostrará el degradado
                  predeterminado. ¿Deseas continuar?
                </p>
                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setOpenDelete(false)}
                    className="border-gray-300"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Eliminar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CallHeroImageManager;