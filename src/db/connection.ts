import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bdcategoria', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;