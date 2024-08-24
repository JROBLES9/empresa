import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/db';
import { Proyecto } from '../@types/globals';

class ProyectoModel extends Model<Proyecto> implements Proyecto {
    public id_proyecto!: number;
    public nombre_proyecto!: string;
    public descripcion!: string;
    public fecha_inicio!: Date;
    public fecha_fin!: Date;
    public porcentaje_completado!: number;
    public estado!: string;
}

ProyectoModel.init({
    id_proyecto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_proyecto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    porcentaje_completado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'proyectos',
    timestamps: false
});

export default ProyectoModel;