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
router.get("/colors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allColors = yield db_1.prisma.color.findMany();
        res.json(allColors);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.get("/colors/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const color = yield db_1.prisma.color.findUnique({
            where: {
                id: id,
            },
        });
        res.json(color);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.post("/colors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const color = yield db_1.prisma.color.create({
            data: {
                name: name,
            },
        });
        res.json(color);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.put("/colors/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const color = yield db_1.prisma.color.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });
        res.json(color);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.delete("/colors/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const color = yield db_1.prisma.color.delete({
            where: {
                id: id,
            },
        });
        res.json(color);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
exports.default = router;
