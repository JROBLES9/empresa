import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const empleadoModel = sequelize.define('empleado', {
    id_empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50)
    },
    apellido: {
        type: DataTypes.STRING(50)
    },
    fecha_nacimiento: {
        type: DataTypes.DATE
    },
    direccion: {
        type: DataTypes.STRING(100)
    },
    telefono: {
        type: DataTypes.STRING(15)
    },
    email: {
        type: DataTypes.STRING(50)
    },
    fecha_contratacion: {
        type: DataTypes.DATE
    },
    salario: {
        type: DataTypes.DECIMAL(10, 2)
    },
    cargo: {
        type: DataTypes.STRING(50)
    },
    id_proyecto: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'empleados',
    timestamps: false
});

export default empleadoModel;