"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VistavkaContentModel = exports.CollectionsContentModel = exports.VistavkaModel = exports.UsersModel = exports.NewsModel = exports.CollectionsModel = void 0;
const db_1 = require("../db");
const collectionsModel_1 = require("./collectionsModel");
Object.defineProperty(exports, "CollectionsModel", { enumerable: true, get: function () { return collectionsModel_1.CollectionsModel; } });
const newsModel_1 = require("./newsModel");
Object.defineProperty(exports, "NewsModel", { enumerable: true, get: function () { return newsModel_1.NewsModel; } });
const usersModel_1 = require("./usersModel");
Object.defineProperty(exports, "UsersModel", { enumerable: true, get: function () { return usersModel_1.UsersModel; } });
const vistavkaModel_1 = require("./vistavkaModel");
Object.defineProperty(exports, "VistavkaModel", { enumerable: true, get: function () { return vistavkaModel_1.VistavkaModel; } });
const collectionsContentModel_1 = require("./collectionsContentModel");
Object.defineProperty(exports, "CollectionsContentModel", { enumerable: true, get: function () { return collectionsContentModel_1.CollectionsContentModel; } });
const vistavkaContentModel_1 = require("./vistavkaContentModel");
Object.defineProperty(exports, "VistavkaContentModel", { enumerable: true, get: function () { return vistavkaContentModel_1.VistavkaContentModel; } });
usersModel_1.UsersModel.hasMany(collectionsModel_1.CollectionsModel);
collectionsModel_1.CollectionsModel.belongsTo(usersModel_1.UsersModel);
usersModel_1.UsersModel.hasMany(collectionsContentModel_1.CollectionsContentModel);
collectionsContentModel_1.CollectionsContentModel.belongsTo(usersModel_1.UsersModel);
collectionsModel_1.CollectionsModel.hasMany(collectionsContentModel_1.CollectionsContentModel);
collectionsContentModel_1.CollectionsContentModel.belongsTo(collectionsModel_1.CollectionsModel);
usersModel_1.UsersModel.hasMany(vistavkaModel_1.VistavkaModel);
vistavkaModel_1.VistavkaModel.belongsTo(usersModel_1.UsersModel);
usersModel_1.UsersModel.hasMany(vistavkaContentModel_1.VistavkaContentModel);
vistavkaContentModel_1.VistavkaContentModel.belongsTo(usersModel_1.UsersModel);
vistavkaModel_1.VistavkaModel.hasMany(vistavkaContentModel_1.VistavkaContentModel);
vistavkaContentModel_1.VistavkaContentModel.belongsTo(vistavkaModel_1.VistavkaModel);
usersModel_1.UsersModel.hasMany(newsModel_1.NewsModel);
newsModel_1.NewsModel.belongsTo(usersModel_1.UsersModel);
db_1.DB.sync().then(() => {
    usersModel_1.UsersModel.findOrCreate({
        where: {
            id: 1,
            name: "Бесхмельницин Виталий",
            email: "vitaliibeshmelnitsin@gmail.com",
            pass: "a2ead632c2a67c518db8e878c98fb8ac6a70827251f1b2c8331b9c908e60ff1b"
        }
    }).then(() => console.log('Администратор синхронизован')).catch((err) => {
        throw err;
    });
    console.log('База данных синхронизованна');
}).catch((err) => {
    throw err;
});
//# sourceMappingURL=index.js.map