import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Tema = db.define('Tema', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
   
}, {
    createdAt: false,
    updatedAt: false
});


export default Tema;