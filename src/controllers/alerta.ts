import { Request, Response } from 'express';
import AlertaModel from '../models/alerta';
import proyectoModel from '../models/proyecto';

export class AlertaController {
    public static async createAlerta(req: Request, res: Response) {
        try {
            const newAlerta = await AlertaModel.create(req.body) as unknown as { id_alertas: number };
            res.json({ message: "Alerta creada exitosamente.", id: newAlerta.id_alertas });
        } catch (error) {
            res.status(500).json({ message: "Error al crear la alerta.", error });
        }
    }

    public static async getAlertas(_req: Request, res: Response) {
        try {
            const alertas = await AlertaModel.findAll();

            const alertasConVencimiento = await Promise.all(alertas.map(async (alerta) => {
                const proyecto = await proyectoModel.findByPk(alerta.id_proyectos);
                if (proyecto) {
                    const fechaVencimiento = new Date(proyecto.fecha_fin);
                    const fechaActual = new Date();
                    const diasRestantes = Math.ceil((fechaVencimiento.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24));

                    return {
                        ...alerta.toJSON(),
                        proyectoVencidoEn: diasRestantes < 0 ? `Vencido hace ${Math.abs(diasRestantes)} días` : `Vence en ${diasRestantes} días`
                    };
                }
                return alerta;
            }));

            res.json(alertasConVencimiento);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las alertas.", error });
        }
    }

    public static async getAlerta(req: Request, res: Response) {
        try {
            const alertaEncontrada = await AlertaModel.findByPk(req.params.id);
            res.json(alertaEncontrada);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener la alerta.", error });
        }
    }

    public static async updateAlerta(req: Request, res: Response) {
        try {
            await AlertaModel.update(req.body, { where: { id_alertas: req.params.id } });
            res.json({ message: "Alerta actualizada exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar la alerta.", error });
        }
    }

    public static async deleteAlerta(req: Request, res: Response) {
        try {
            await AlertaModel.destroy({ where: { id_alertas: req.params.id } });
            res.json({ message: "Alerta eliminada exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la alerta.", error });
        }
    }
}

export default AlertaController;