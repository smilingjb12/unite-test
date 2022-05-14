/* eslint-disable @typescript-eslint/no-var-requires */
import { DataTypes, Sequelize } from 'sequelize';
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error('Connection string is missing!');
}

console.log('NODE ENV!!!!!:', process.env.NODE_ENV);
const sslConfig = process.env.NODE_ENV === 'production'
  ? { require: true, rejectUnauthorized: false }
  : null;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: sslConfig
  },
});

let request: any;
sequelize
  .authenticate()
  .then(() => {
    console.log('connection established successfully');
    request = sequelize.define('Request', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      coords: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      additionalInfo: {
        type: DataTypes.STRING
      }
    }, {
      // Other model options go here
    });
  })
  .catch(err => {
    console.log('Could not connect to db:', err);
  });

export const Request = request;