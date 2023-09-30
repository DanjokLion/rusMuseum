"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express = __importStar(require("express"));
const Router = express.Router();
exports.Router = Router;
const home_1 = require("./home");
const news_1 = require("./news");
const collections_1 = require("./collections");
const excursionvis_1 = require("./excursionvis");
const visitors_1 = require("./visitors");
const vistavka_1 = require("./vistavka");
const admin_1 = require("./admin");
Router.use('/', home_1.homeRoutes);
Router.use('/news', news_1.newsRoutes);
Router.use('/collections', collections_1.collectionsRoutes);
Router.use('/excursionvis', excursionvis_1.excursionvisRoutes);
Router.use('/visitors', visitors_1.visitorsRoutes);
Router.use('/vistavka', vistavka_1.vistavkaRoutes);
Router.use('/admin', admin_1.AdminRoutes);
//# sourceMappingURL=index.js.map