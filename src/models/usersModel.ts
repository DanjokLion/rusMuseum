import { DB } from '../db'
import { Sequelize } from  'sequelize'

const sequelize = require('sequelize')

const MODEL_NAME = 'users';

export const Model = DB.define( MODEL_NAME, {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: sequelize.STRING
  },
  email: {
    type: sequelize.STRING
  },
  pass: {
    type: sequelize.STRING
  },
});

export { Model as UsersModel }
