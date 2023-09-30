import { DB } from '../db'
import { Sequelize } from  'sequelize'

const sequelize = require('sequelize')

const MODEL_NAME = 'collections';

export const Model = DB.define( MODEL_NAME, {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: sequelize.STRING
  },
  link: {
    type: sequelize.STRING
  },
  thumbnail: {
    type: sequelize.STRING
  },
  meta_keywords: {
    type: sequelize.STRING
  },
  meta_description: {
    type: sequelize.STRING
  },
});



export { Model as CollectionsModel }
