import { Request, Response } from 'express';
import proyecto from '../models/proyecto';
import { validateProyecto, validateProyectoUpdate } from '../schemas/proyecto';
import { Proyecto } from '../@types/globals';

export class ProyectoController {
    public static async createProyecto(req: Request, res: Response) {
        try {
            const result = validateProyecto(req.body);
            if (!result.success) {
                throw result.error;
            }

            // Convertir las fechas de string a Date
            const data = {
                ...result.data,
                fecha_inicio: new Date(result.data.fecha_inicio),
                fecha_fin: new Date(result.data.fecha_fin),
            };

            const newProyecto = await proyecto.create(data as Proyecto);
            res.json({ message: "Proyecto creado exitosamente.", id: (newProyecto as unknown as Proyecto).id_proyecto });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el proyecto.", error });
        }
    }

    public static async getProyectos(_req: Request, res: Response) {
        try {
            const proyectos = await proyecto.findAll();
            res.json(proyectos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los proyectos.", error });
        }
    }

    public static async getProyecto(req: Request, res: Response) {
        try {
            const Proyecto = await proyecto.findByPk(req.params.id);
            res.json(Proyecto);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el proyecto.", error });
        }
    }

    public static async updateProyecto(req: Request, res: Response) {
        try {
            const result = validateProyectoUpdate(req.body);
            if (!result.success) {
                throw result.error;
            }
            
        // Convertir las fechas de string a Date solo si están definidas
        const data = {
            ...result.data,
            fecha_inicio: result.data.fecha_inicio ? new Date(result.data.fecha_inicio) : undefined,
            fecha_fin: result.data.fecha_fin ? new Date(result.data.fecha_fin) : undefined,
        };

            await proyecto.update(data, { where: { id_proyecto: req.params.id } });
            res.json({ message: "Proyecto actualizado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el proyecto.", error });
        }
    }

    public static async deleteProyecto(req: Request, res: Response) {
        try {
            await proyecto.destroy({ where: { id_proyecto: req.params.id } });
            res.json({ message: "Proyecto eliminado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el proyecto.", error });
        }
    }
}

export default ProyectoController;