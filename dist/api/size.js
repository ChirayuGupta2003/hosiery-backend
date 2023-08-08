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
router.get("/sizes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allSizes = yield db_1.prisma.size.findMany();
    res.json(allSizes);
}));
router.get("/sizes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const size = yield db_1.prisma.size.findUnique({
        where: {
            id: id,
        },
    });
    res.json(size);
}));
router.post("/sizes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const size = yield db_1.prisma.size.create({
        data: {
            name: name,
        },
    });
    res.json(size);
}));
router.put("/sizes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const size = yield db_1.prisma.size.update({
        where: {
            id: id,
        },
        data: {
            name: name,
        },
    });
    res.json(size);
}));
router.delete("/sizes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const size = yield db_1.prisma.size.delete({
            where: {
                id: id,
            },
        });
        res.json(size);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
exports.default = router;
