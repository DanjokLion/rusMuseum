"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsModel = exports.Model = void 0;
const db_1 = require("../db");
const sequelize = require('sequelize');
const MODEL_NAME = 'collections';
exports.Model = db_1.DB.define(MODEL_NAME, {
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
exports.CollectionsModel = exports.Model;
//# sourceMappingURL=collectionsModel.js.map