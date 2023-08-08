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
router.get("/styles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allStyles = yield db_1.prisma.style.findMany();
        res.json(allStyles);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.get("/styles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const style = yield db_1.prisma.style.findUnique({
            where: {
                id: id,
            },
        });
        res.json(style);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.post("/styles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const style = yield db_1.prisma.style.create({
            data: {
                name: name,
            },
        });
        res.json(style);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.put("/styles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const style = yield db_1.prisma.style.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });
        res.json(style);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.delete("/styles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const style = yield db_1.prisma.style.delete({
            where: {
                id: id,
            },
        });
        res.json(style);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
exports.default = router;
