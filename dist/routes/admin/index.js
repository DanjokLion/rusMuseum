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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express = __importStar(require("express"));
const sha256 = require('sha256');
const router = express.Router();
exports.AdminRoutes = router;
const news_1 = require("./news");
const collections_1 = require("./collections");
const vistavka_1 = require("./vistavka");
const users_1 = require("./users");
const filesManager_1 = require("./filesManager");
const collectionsContent_1 = require("./collectionsContent");
const vistavkaContent_1 = require("./vistavkaContent");
const models_1 = require("../../models");
let currentUser;
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('admin/login', {});
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.UsersModel.findOne({ where: {
                email: req.body.email,
                pass: sha256(req.body.pass)
            }, raw: true });
        console.log(user);
        currentUser = user;
        const error = 'Неверный логин или пароль';
        if (user != null) {
            res.cookie('a', true);
            res.render('admin/index', {});
        }
        else {
            res.render('admin/login', { error });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/logout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('a', false);
        res.render('admin/login', {});
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.locals.currentUser = currentUser;
    if (req.cookies.a == 'false' || req.cookies.a == null) {
        res.render('admin/login', {});
    }
    else {
        next();
    }
}));
router.get('/index', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('admin/index');
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.use('/news', news_1.newsRoutes);
router.use('/collections', collections_1.collectionsRoutes);
router.use('/vistavka', vistavka_1.vistavkaRoutes);
router.use('/users', users_1.usersRoutes);
router.use('/filesManager', filesManager_1.filesManagerRoutes);
router.use('/collectionsContent', collectionsContent_1.collectionsContentRoutes);
router.use('/vistavkaContent', vistavkaContent_1.vistavkaContentRoutes);
//# sourceMappingURL=index.js.map