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
exports.collectionsRoutes = void 0;
const express = __importStar(require("express"));
const cyrillic_to_translit_js_1 = __importDefault(require("cyrillic-to-translit-js"));
const fs_1 = __importDefault(require("fs"));
const router = express.Router();
exports.collectionsRoutes = router;
const models_1 = require("../../models");
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.CollectionsModel.findAll({
            include: {
                model: models_1.UsersModel,
                attributes: ["id", "name"]
            },
            raw: true
        });
        console.log(data);
        res.render('admin/collections/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('admin/collections/add', {});
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            const img = req.files.thumbnail;
            req.body.thumbnail = img.name;
            img.mv(process.cwd() + '/public/uploads/collections/' + img.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        req.body.link = new cyrillic_to_translit_js_1.default().transform(req.body.title, "_");
        const dir = process.cwd() + '/public/uploads/collections/' + req.body.link;
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
            fs_1.default.mkdirSync(dir + '/thumbnail');
        }
        console.log(req.body);
        yield models_1.CollectionsModel.create(req.body);
        const data = yield models_1.CollectionsModel.findAll({
            include: {
                model: models_1.UsersModel,
                attributes: ["id", "name"]
            },
            raw: true
        });
        res.render('admin/collections/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/edit/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.CollectionsModel.findOne({ where: {
                id: req.params.id
            }, raw: true });
        res.render('admin/collections/edit', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            const img = req.files.thumbnail;
            req.body.thumbnail = img.name;
            img.mv(process.cwd() + '/public/uploads/collections/' + img.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        const newPath = process.cwd() + '/public/uploads/collections/' + req.body.link;
        const oldPath = process.cwd() + '/public/uploads/collections/' + req.body.old;
        if (newPath != oldPath) {
            fs_1.default.renameSync(oldPath, newPath);
        }
        console.log('req.body', req.body);
        yield models_1.CollectionsModel.update(req.body, { where: { id: req.body.id } });
        const data = yield models_1.CollectionsModel.findAll({
            include: {
                model: models_1.UsersModel,
                attributes: ["id", "name"]
            },
            raw: true
        });
        res.render('admin/collections/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield models_1.CollectionsModel.findOne({ where: { id: req.body.id }, raw: true });
        if (item.thumbnail != null) {
            fs_1.default.readdirSync(process.cwd() + '/public/uploads/collections/').forEach((file) => {
                if (file == item.thumbnail) {
                    fs_1.default.unlinkSync(process.cwd() + '/public/uploads/collections/' + item.thumbnail);
                }
            });
            fs_1.default.readdirSync(process.cwd() + '/public/uploads/collections/').forEach((file) => {
                if (file == item.link) {
                    fs_1.default.rmdirSync(process.cwd() + '/public/uploads/collections/' + item.link, { recursive: true });
                }
            });
        }
        yield models_1.CollectionsModel.destroy({ where: { id: req.body.id } });
        yield models_1.CollectionsContentModel.destroy({ where: { collectionId: req.body.id } });
        const data = yield models_1.CollectionsModel.findAll({
            include: {
                model: models_1.UsersModel,
                attributes: ["id", "name"]
            },
            raw: true
        });
        res.render('admin/collections/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=collections.js.map