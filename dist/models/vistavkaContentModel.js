"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VistavkaContentModel = exports.Model = void 0;
const db_1 = require("../db");
const sequelize = require('sequelize');
const MODEL_NAME = 'vistavkaContent';
exports.Model = db_1.DB.define(MODEL_NAME, {
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
exports.VistavkaContentModel = exports.Model;
//# sourceMappingURL=vistavkaContentModel.js.map