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
exports.newsRoutes = void 0;
const express = __importStar(require("express"));
const router = express.Router();
exports.newsRoutes = router;
const models_1 = require("../models");
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield models_1.NewsModel.findAll({
            order: [
                ["id", "DESC"]
            ],
            raw: true
        });
        res.locals.metaTags = {
            title: "Русский музей",
            description: 'Русский музей',
            keywords: "Русский музей"
        };
        res.render('news/index', { news });
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
router.get('/:link', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.NewsModel.findOne({ where: {
                link: req.params.link
            }, raw: true });
        res.locals.metaTags = {
            title: data.title,
            description: data.description,
            keywords: data.meta_keyword
        };
        res.render('news/page', { data });
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=news.js.map