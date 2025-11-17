const API_BASE_URL = "http://localhost:5213/api/PracticasStep";

export interface PracticasStep {
    id?: number;
    stepNumber: number;
    title: string;
    subtitle: string;
    description: string;
    tips: string;
    color: string;
    actions: string;
    imageUrl?: string;
}

/**
 * Obtiene todos los pasos del proceso de prácticas.
 */
export const getSteps = async (): Promise<PracticasStep[]> => {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) throw new Error("Error al cargar los pasos");
    return await res.json();
};

/**
 * Crea un nuevo paso (con o sin imagen).
 */
export const createStep = async (formData: FormData): Promise<PracticasStep> => {
    const res = await fetch(API_BASE_URL, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Error al crear el paso");
    return await res.json();
};

/**
 * Actualiza un paso existente (por id).
 */
export const updateStep = async (id: number, formData: FormData): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        body: formData,
    });
    if (!res.ok) throw new Error("Error al actualizar el paso");
};

/**
 * Elimina un paso por id.
 */
export const deleteStep = async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el paso");
};