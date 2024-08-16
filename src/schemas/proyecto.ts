import { z } from 'zod';

export const proyectoSchema = z.object({
    id_proyecto: z.number().int().optional(),
    nombre_proyecto: z.string().max(100),
    descripcion: z.string(),
    fecha_inicio: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    fecha_fin: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    porcentaje_completado: z.number().min(0).max(100).refine((num) => num.toFixed(2).length <= 5, {
        message: "Invalid decimal format",
    }),
    estado: z.string().max(20),
});

export const validateProyecto = (data: any) => {
    return proyectoSchema.safeParse(data);
};

export const validateProyectoUpdate = (data: any) => {
    return proyectoSchema.partial().safeParse(data);
};