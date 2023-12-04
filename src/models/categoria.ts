import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import Subcategoria from './subcategoria';

const Categoria = sequelize.define('Categoria', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: DataTypes.STRING,
});

// Establecer la relación de pertenencia a una categoría
Categoria.hasMany(Subcategoria,{
  foreignKey: "categoriaId",
  sourceKey: "id",
  onDelete: 'CASCADE'
})

Subcategoria.belongsTo(Categoria,{
  foreignKey: "categoriaId",
  targetKey: "id"
})

export default Categoria;
