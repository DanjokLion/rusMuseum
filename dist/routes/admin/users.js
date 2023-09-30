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
exports.usersRoutes = void 0;
const express = __importStar(require("express"));
const sha256 = require('sha256');
const router = express.Router();
exports.usersRoutes = router;
const models_1 = require("../../models");
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.UsersModel.findAll({ raw: true });
        res.render('admin/users/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('admin/users/add', {});
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.pass = sha256(req.body.pass);
        yield models_1.UsersModel.create(req.body);
        const data = yield models_1.UsersModel.findAll({ raw: true });
        res.render('admin/users/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/edit/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.UsersModel.findOne({ where: {
                id: req.params.id
            }, raw: true });
        res.render('admin/users/edit', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.pass = sha256(req.body.pass);
        yield models_1.UsersModel.update(req.body, { where: { id: req.body.id } });
        const data = yield models_1.UsersModel.findAll({ raw: true });
        res.render('admin/users/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.UsersModel.destroy({ where: { id: req.body.id } });
        const data = yield models_1.UsersModel.findAll({ raw: true });
        res.render('admin/users/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=users.js.map