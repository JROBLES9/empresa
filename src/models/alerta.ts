import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/db';
import { Alerta } from '../@types/globals';


class AlertaModel extends Model<Alerta> implements Alerta {
    public id_alertas!: number;
    public nombre!: string;
    public dias!: number;
    public id_proyectos!: number;
}

AlertaModel.init({
    id_alertas: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dias: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_proyectos: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'alertas',
    timestamps: false
});

export default AlertaModel;