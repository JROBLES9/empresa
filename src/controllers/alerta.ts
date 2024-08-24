import { Request, Response } from 'express';
import AlertaModel from '../models/alerta';
import proyectoModel from '../models/proyecto';
import { responseAlerta } from '../@types/globals';
import { Op } from 'sequelize';

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
            
                    console.log(diasRestantes);
            
                    // si dias restantes es menor a alerta.dias entonces se muestra la alerta
                    const proyectoVencidoEn = diasRestantes < 0 ? `Vencido hace ${Math.abs(diasRestantes)} días` : `Vence en ${diasRestantes} días`;
            
                    console.log(proyectoVencidoEn);
            
                    respuesta.push({
                        Proyecto: proyecto.nombre_proyecto,
                        Descripcion: proyectoVencidoEn
                    });
                }
            }

            console.log(respuesta);

            res.json(respuesta);
        } catch (error: any) {
            res.status(500).json({ message: "Error al obtener las alertas.", error: error.message });
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
            
                    console.log(diasRestantes);
            
                    // si dias restantes es menor a alerta.dias entonces se muestra la alerta
                    const proyectoVencidoEn = diasRestantes < 0 ? `Vencido hace ${Math.abs(diasRestantes)} días` : `Vence en ${diasRestantes} días`;
            
                    console.log(proyectoVencidoEn);
            
                    const respuesta: responseAlerta = ({
                        Proyecto: proyecto.nombre_proyecto,
                        Descripcion: proyectoVencidoEn
                    });
    
                    res.json(respuesta);
                }

                res.json(null);

            }
            
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