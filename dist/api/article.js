"use strict";
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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.get("/articles", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield db_1.prisma.article.findMany();
        res.json(articles);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.get("/articles/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const article = yield db_1.prisma.article.findUnique({
            where: {
                id: id,
            },
        });
        res.json(article);
    }
    catch (error) {
        next();
    }
}));
router.post("/articles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { yarnId, styleId, workId, sizeId, stock, articleNumber, image } = req.body;
        const article = yield db_1.prisma.article.create({
            data: {
                yarnId: yarnId,
                styleId: styleId,
                workId: workId,
                sizeId: sizeId,
                stock: stock,
                articleNumber: articleNumber,
                image: image,
            },
        });
        res.json(article);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.put("/articles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { yarnId, styleId, workId, sizeId, stock, articleNumber } = req.body;
        const article = yield db_1.prisma.article.update({
            where: {
                id: id,
            },
            data: {
                yarnId: yarnId,
                styleId: styleId,
                workId: workId,
                sizeId: sizeId,
                stock: stock,
                articleNumber: articleNumber,
            },
        });
        res.json(article);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.delete("/articles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const article = yield db_1.prisma.article.delete({
            where: {
                id: id,
            },
        });
        res.json(article);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
exports.default = router;
