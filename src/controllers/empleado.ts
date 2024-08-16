import { Request, Response } from 'express';
import empleado from '../models/empleado';
import { validateEmpleado, validateEmpleadoUpdate } from '../schemas/empleado';
import { Empleado } from '../@types/globals';

export class EmpleadoController {
    public static async createEmpleado(req: Request, res: Response) {
        try {
            const result = validateEmpleado(req.body);
            if (!result.success) {
                throw result.error;
            }
            const newEmpleado = await empleado.create(result.data);
            res.json({ message: "Empleado creado exitosamente.", id: (newEmpleado as unknown as Empleado).id_empleado });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el empleado.", error });
        }
    }

    public static async getEmpleados(_req: Request, res: Response) {
        try {
            const empleados = await empleado.findAll();
            res.json(empleados);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los empleados.", error });
        }
    }

    public static async getEmpleado(req: Request, res: Response) {
        try {
            const empleadoEncontrado = await empleado.findByPk(req.params.id);
            res.json(empleadoEncontrado);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el empleado.", error });
        }
    }

    public static async updateEmpleado(req: Request, res: Response) {
        try {
            const result = validateEmpleadoUpdate(req.body);
            if (!result.success) {
                throw result.error;
            }
            await empleado.update(result.data, { where: { id_empleado: req.params.id } });
            res.json({ message: "Empleado actualizado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el empleado.", error });
        }
    }

    public static async deleteEmpleado(req: Request, res: Response) {
        try {
            await empleado.destroy({ where: { id_empleado: req.params.id } });
            res.json({ message: "Empleado eliminado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el empleado.", error });
        }
    }
}

export default EmpleadoController;