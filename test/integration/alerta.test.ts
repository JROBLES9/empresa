import request from 'supertest';
import express, { Application } from 'express';
import AlertaController from '../../src/controllers/alerta';
import AlertaModel from '../../src/models/alerta';
import ProyectoModel from '../../src/models/proyecto';

const app: Application = express();
app.post('/alerta', AlertaController.createAlerta);
app.get('/alerta', AlertaController.getAlertas);
app.get('/alerta/:id', AlertaController.getAlerta);
app.put('/alerta/:id', AlertaController.updateAlerta);
app.delete('/alerta/:id', AlertaController.deleteAlerta);

jest.mock('../../src/models/alerta', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn()
}));

jest.mock('../../src/models/proyecto', () => ({
  findOne: jest.fn()
}));

describe('AlertaController', () => {
    describe('createAlerta', () => {

        it('Crea una alerta y devuelve un mensaje de exito', async () => {
            const mockAlerta = { id_alertas: 1 };
            (AlertaModel.create as jest.Mock).mockResolvedValue(mockAlerta);

            const response = await request(app)
                .post('/alerta')
                .send({ /* datos de la alerta */ });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: "Alerta creada exitosamente.", id: mockAlerta.id_alertas });
        });

        it('Retorna un mensaje de error si falla', async () => {
            const mockError = new Error('Error al crear la alerta');
            (AlertaModel.create as jest.Mock).mockRejectedValue(mockError);

            const response = await request(app)
                .post('/alerta')
                .send({ /* datos de la alerta */ });


            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Error al crear la alerta.");
            expect(response.body.error).toBe(mockError.message);
        });
    });

    describe('getAlertas', () => {
        it('Retorna alertas con estado 200', async () => {
            const mockAlertas = [
                { id_proyectos: 1, dias: 5 },
                { id_proyectos: 2, dias: 10 }
            ];
            const mockProyectos = [
                { id_proyecto: 1, nombre_proyecto: 'Proyecto 1', fecha_fin: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), estado: 'Activo' },
                { id_proyecto: 2, nombre_proyecto: 'Proyecto 2', fecha_fin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), estado: 'En progreso' }
            ];

            (AlertaModel.findAll as jest.Mock).mockResolvedValue(mockAlertas);
            (ProyectoModel.findOne as jest.Mock).mockImplementation(({ where: { id_proyecto } }) => {
                return mockProyectos.find(proyecto => proyecto.id_proyecto === id_proyecto);
            });

            const response = await request(app).get('/alerta');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                { Proyecto: 'Proyecto 1', Descripcion: 'Vence en 3 días' },
                { Proyecto: 'Proyecto 2', Descripcion: 'Vencido hace 2 días' }
            ]);
        });

        it('Retorna estado 500 y maneja errores', async () => {
            const errorMessage = 'Database error';
            (AlertaModel.findAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const response = await request(app).get('/alerta');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error al obtener las alertas.', error: errorMessage });
        });
    });

    describe('getAlerta', () => {
        it('Retorna una alerta con estado 200', async () => {
            const mockAlerta = { id_proyectos: 1, dias: 5 };
            const mockProyecto = {
                id_proyecto: 1,
                nombre_proyecto: 'Proyecto 1',
                fecha_fin: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                estado: 'Activo'
            };

            (AlertaModel.findByPk as jest.Mock).mockResolvedValue(mockAlerta);
            (ProyectoModel.findOne as jest.Mock).mockResolvedValue(mockProyecto);

            const response = await request(app).get('/alerta/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                Proyecto: 'Proyecto 1',
                Descripcion: 'Vence en 3 días'
            });
        });

        it('Retorna null si no se encuentra el proyecto', async () => {
            const mockAlerta = { id_proyectos: 1, dias: 5 };

            (AlertaModel.findByPk as jest.Mock).mockResolvedValue(mockAlerta);
            (ProyectoModel.findOne as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/alerta/1');

            expect(response.status).toBe(200);
            expect(response.body).toBeNull();
        });

        it('Retorna estado 500 y maneja errores', async () => {
            const errorMessage = 'Database error';
            (AlertaModel.findByPk as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const response = await request(app).get('/alerta/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error al obtener la alerta.', error: errorMessage });
        });
    });

    describe('updateAlerta', () => {
        it('Actualiza una alerta y devuelve un mensaje de éxito', async () => {
            (AlertaModel.update as jest.Mock).mockResolvedValue([1]); // 1 indica que una fila fue actualizada

            const response = await request(app)
                .put('/alerta/1')
                .send({ /* datos de la alerta actualizada */ });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Alerta actualizada exitosamente." });
        });

        it('Retorna un mensaje de error si falla', async () => {
            const mockError = new Error('Error al actualizar la alerta');
            (AlertaModel.update as jest.Mock).mockRejectedValue(mockError);

            const response = await request(app)
                .put('/alerta/1')
                .send({ /* datos de la alerta actualizada */ });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Error al actualizar la alerta.");
            expect(response.body.error).toBe(mockError.message);
        });
    });

    describe('deleteAlerta', () => {
        it('Actualiza el campo state a 0 y devuelve un mensaje de éxito', async () => {
            (AlertaModel.update as jest.Mock).mockResolvedValue([1]); // 1 indica que una fila fue actualizada

            const response = await request(app)
                .delete('/alerta/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Alerta eliminada exitosamente." });
        });

        it('Retorna un mensaje de error si falla', async () => {
            const mockError = new Error('Error al eliminar la alerta');
            (AlertaModel.update as jest.Mock).mockRejectedValue(mockError);

            const response = await request(app)
                .delete('/alerta/1');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Error al eliminar la alerta.");
            expect(response.body.error).toBe(mockError.message);
        });
    });
});