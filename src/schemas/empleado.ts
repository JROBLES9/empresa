import { z } from 'zod';

export const empleadoSchema = z.object({
    id_empleado: z.number().int().optional(),
    nombre: z.string().max(50),
    apellido: z.string().max(50),
    fecha_nacimiento: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    direccion: z.string().max(100),
    telefono: z.string().max(15),
    email: z.string().email(),
    fecha_contratacion: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    salario: z.number().refine((num) => num.toFixed(2).length <= 13, {
        message: "Invalid decimal format",
    }),
    cargo: z.string().max(50),
    id_proyecto: z.number().int(),
});


export const validateEmpleado = (data: any) => {
    return empleadoSchema.safeParse(data);
};

export const validateEmpleadoUpdate = (data: any) => {
    return empleadoSchema.partial().safeParse(data);
};