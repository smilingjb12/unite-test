/* eslint-disable @typescript-eslint/no-var-requires */
import { DataTypes, Sequelize } from 'sequelize';
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error('Connection string is missing!');
}

const sslConfig = process.env.NODE_ENV === 'production'
  ? { require: true }
  : { require: false, rejectUnauthorized: false };

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: process.env.DATABASE_FORBID_SSL ? null : {
    ssl: sslConfig
  },
});

export const Request = sequelize.define('Request', {
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