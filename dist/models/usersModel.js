"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = exports.Model = void 0;
const db_1 = require("../db");
const sequelize = require('sequelize');
const MODEL_NAME = 'users';
exports.Model = db_1.DB.define(MODEL_NAME, {
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
exports.UsersModel = exports.Model;
//# sourceMappingURL=usersModel.js.map