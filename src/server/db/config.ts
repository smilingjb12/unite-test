import { DataTypes, Sequelize } from 'sequelize';
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error('Connection string is missing!');
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: process.env.DATABASE_FORBID_SSL ? null : {
    ssl: {
      require: false,
      rejectUnauthorized: false
    }
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