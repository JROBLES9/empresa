import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const proyectoModel = sequelize.define('proyecto', {
    id_proyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_proyecto: {
        type: DataTypes.STRING(100)
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    fecha_inicio: {
        type: DataTypes.DATE
    },
    fecha_fin: {
        type: DataTypes.DATE
    },
    porcentaje_completado: {
        type: DataTypes.DECIMAL(5, 2)
    },
    estado: {
        type: DataTypes.STRING(20)
    }
}, {
    tableName: 'proyectos',
    timestamps: false
});

export default proyectoModel;