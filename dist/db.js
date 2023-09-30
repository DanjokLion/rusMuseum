"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const sequelize_1 = require("sequelize");
exports.DB = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false,
    define: {
        freezeTableName: true
    }
});
//# sourceMappingURL=db.js.map