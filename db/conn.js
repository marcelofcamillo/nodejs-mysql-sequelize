import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);

try {
  sequelize.authenticate();
  console.log('Conectado ao MySQL!');
} catch (error) {
  console.log('Não foi possível conectar ao MySQL!: ', error);
}

export default sequelize;
