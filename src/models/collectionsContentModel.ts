import { DB } from '../db'
import { Sequelize } from  'sequelize'

const sequelize = require('sequelize')

const MODEL_NAME = 'collectionsContent';

export const Model = DB.define( MODEL_NAME, {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  thumbnail: {
    type: sequelize.STRING
  },
  img: {
    type: sequelize.STRING
  }
});



export { Model as CollectionsContentModel }
