import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Tema from './tema';

const Subcategoria = db.define('Subcategoria', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});

// Establecer la relación de pertenencia a una subcategoría
Subcategoria.hasMany(Tema, {
    foreignKey: 'subcategoriaId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

Tema.belongsTo(Subcategoria, {
    foreignKey: 'subcategoriaId',
    targetKey: 'id'
});

export default Subcategoria;
