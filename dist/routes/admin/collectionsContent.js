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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionsContentRoutes = void 0;
const express = __importStar(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = express.Router();
exports.collectionsContentRoutes = router;
const models_1 = require("../../models");
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.CollectionsContentModel.findAll({
            include: [{
                    model: models_1.UsersModel,
                    attributes: ["id", "name"]
                }, {
                    model: models_1.CollectionsModel,
                    attributes: ["id", "title", "link"]
                }],
            raw: true
        });
        console.log('data', data);
        res.render('admin/collectionsContent/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield models_1.CollectionsModel.findAll({
            include: {
                model: models_1.UsersModel,
                attributes: ["id", "name"]
            },
            raw: true
        });
        res.render('admin/collectionsContent/add', { collections });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield models_1.CollectionsModel.findOne({ where: {
                id: req.body.collectionId
            }, raw: true });
        console.log('collections', collection);
        console.log('req.body', req.body);
        if (req.files) {
            const thumbnail = req.files.thumbnail;
            req.body.thumbnail = thumbnail.name;
            thumbnail.mv(process.cwd() + '/public/uploads/collections/' + collection.link + '/thumbnail/' + thumbnail.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            const img = req.files.img;
            req.body.img = img.name;
            img.mv(process.cwd() + '/public/uploads/collections/' + collection.link + '/' + img.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        console.log('req.body', req.body);
        yield models_1.CollectionsContentModel.create(req.body);
        const data = yield models_1.CollectionsContentModel.findAll({
            include: [{
                    model: models_1.UsersModel,
                    attributes: ["id", "name"]
                }, {
                    model: models_1.CollectionsModel,
                    attributes: ["id", "title", "link"]
                }],
            raw: true
        });
        res.render('admin/collectionsContent/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/edit/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.CollectionsContentModel.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: models_1.CollectionsModel,
                attributes: ["id", "title", "link"]
            }, raw: true
        });
        console.log(data);
        res.render('admin/collectionsContent/edit', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield models_1.CollectionsModel.findOne({ where: {
                id: req.body.collectionId
            }, raw: true });
        console.log('collections', collection);
        console.log('req.body', req.body);
        if (req.files) {
            const thumbnail = req.files.thumbnail;
            req.body.thumbnail = thumbnail.name;
            thumbnail.mv(process.cwd() + '/public/uploads/collections/' + collection.link + '/thumbnail/' + thumbnail.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            const img = req.files.img;
            req.body.img = img.name;
            img.mv(process.cwd() + '/public/uploads/collections/' + collection.link + '/' + img.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        yield models_1.CollectionsModel.update(req.body, { where: { id: req.body.id } });
        const data = yield models_1.CollectionsContentModel.findAll({
            include: [{
                    model: models_1.UsersModel,
                    attributes: ["id", "name"]
                }, {
                    model: models_1.CollectionsModel,
                    attributes: ["id", "title", "link"]
                }],
            raw: true
        });
        res.render('admin/collectionsContent/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield models_1.CollectionsContentModel.findOne({
            where: { id: req.body.id },
            include: {
                model: models_1.CollectionsModel,
                attributes: ["id", "link"]
            },
            raw: true
        });
        if (item.thumbnail != null) {
            fs_1.default.readdirSync(process.cwd() + '/public/uploads/collections/' + item['collection.link'] + '/thumbnail/').forEach((file) => {
                if (file == item.thumbnail) {
                    fs_1.default.unlinkSync(process.cwd() + '/public/uploads/collections/' + item['collection.link'] + '/thumbnail/' + item.thumbnail);
                }
            });
        }
        if (item.img != null) {
            fs_1.default.readdirSync(process.cwd() + '/public/uploads/collections/' + item['collection.link']).forEach((file) => {
                if (file == item.img) {
                    fs_1.default.unlinkSync(process.cwd() + '/public/uploads/collections/' + item['collection.link'] + '/' + item.img);
                }
            });
        }
        yield models_1.CollectionsContentModel.destroy({ where: { id: req.body.id } });
        const data = yield models_1.CollectionsContentModel.findAll({
            include: [{
                    model: models_1.UsersModel,
                    attributes: ["id", "name"]
                }, {
                    model: models_1.CollectionsModel,
                    attributes: ["id", "title", "link"]
                }],
            raw: true
        });
        res.render('admin/collectionsContent/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=collectionsContent.js.map