import { z } from 'zod';

export const alertaSchema = z.object({
    id_alertas: z.number().int().optional(),
    nombre: z.string().max(45),
    dias: z.number().int(),
    id_proyectos: z.number().int(),
    state: z.boolean().optional()
});

export const validateAlerta = (data: any) => {
    return alertaSchema.safeParse(data);
};

export const validateAlertaUpdate = (data: any) => {
    return alertaSchema.partial().safeParse(data);
};