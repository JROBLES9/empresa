import { Request, Response } from 'express';
import AlertaModel from '../models/alerta';
import proyectoModel from '../models/proyecto';
import { responseAlerta } from '../@types/globals';
import { Op } from 'sequelize';

export class AlertaController {
    public static async createAlerta(req: Request, res: Response) {
        try {
            const newAlerta = await AlertaModel.create(req.body);
            res.status(201).json({ message: "Alerta creada exitosamente.", id: newAlerta.id_alertas });
        } catch (error: any) {
            res.status(500).json({ message: "Error al crear la alerta.", error: error.message });
        }
    }

    public static async getAlertas(_req: Request, res: Response) {
        try {
            const alertas = await AlertaModel.findAll();
            var respuesta: responseAlerta[] = [];

            for (const alerta of alertas) {
                const proyecto = await proyectoModel.findOne({
                    where: {
                        id_proyecto: alerta.id_proyectos,
                        [Op.or]: [
                            { estado: 'Activo' },
                            { estado: 'En progreso' }
                        ]
                    }
                });
                if (proyecto) {
                    const fechaVencimiento = new Date(proyecto.fecha_fin);
                    const fechaActual = new Date();
                    const diasRestantes = Math.ceil((fechaVencimiento.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24));
            
            
                    // si dias restantes es menor a alerta.dias entonces se muestra la alerta
                    const proyectoVencidoEn = diasRestantes < 0 ? `Vencido hace ${Math.abs(diasRestantes)} días` : `Vence en ${diasRestantes} días`;
            
                    respuesta.push({
                        Proyecto: proyecto.nombre_proyecto,
                        Descripcion: proyectoVencidoEn
                    });
                }
            }

            return res.status(200).json(respuesta);
        } catch (error: any) {
            return res.status(500).json({ message: "Error al obtener las alertas.", error: error.message });
        }
    }

    public static async getAlerta(req: Request, res: Response) {
        try {
            const alerta = await AlertaModel.findByPk(req.params.id);
            if(alerta) {
                const proyecto = await proyectoModel.findOne({
                    where: {
                        id_proyecto: alerta.id_proyectos,
                        [Op.or]: [
                            { estado: 'Activo' },
                            { estado: 'En progreso' }
                        ]
                    }
                });
                if (proyecto) {
                    const fechaVencimiento = new Date(proyecto.fecha_fin);
                    const fechaActual = new Date();
                    const diasRestantes = Math.ceil((fechaVencimiento.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24));
            
            
                    // si dias restantes es menor a alerta.dias entonces se muestra la alerta
                    const proyectoVencidoEn = diasRestantes < 0 ? `Vencido hace ${Math.abs(diasRestantes)} días` : `Vence en ${diasRestantes} días`;
            
                    const respuesta: responseAlerta = ({
                        Proyecto: proyecto.nombre_proyecto,
                        Descripcion: proyectoVencidoEn
                    });
    
                    return res.status(200).json(respuesta);
                }

                return res.status(200).json(null);

            }
            
        } catch (error: any) {
            return res.status(500).json({ message: "Error al obtener la alerta.", error: error.message });
        }
    }

    public static async updateAlerta(req: Request, res: Response) {
        try {
            await AlertaModel.update(req.body, { where: { id_alertas: req.params.id } });
            res.status(200).json({ message: "Alerta actualizada exitosamente." });
        } catch (error: any) {
            res.status(500).json({ message: "Error al actualizar la alerta.", error: error.message });
        }
    }

    public static async deleteAlerta(req: Request, res: Response) {
        try {
            await AlertaModel.update({ state: false }, { where: { id_alertas: req.params.id } });
            return res.status(200).json({ message: "Alerta eliminada exitosamente." });
        } catch (error: any) {
            return res.status(500).json({ message: "Error al eliminar la alerta.", error: error.message });
        }
    }
}

export default AlertaController;