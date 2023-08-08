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
router.get("/works", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allWorks = yield db_1.prisma.work.findMany();
        res.json(allWorks);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.get("/works/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const work = yield db_1.prisma.work.findUnique({
            where: {
                id: id,
            },
        });
        res.json(work);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.post("/works", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const work = yield db_1.prisma.work.create({
            data: {
                name: name,
            },
        });
        res.json(work);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.put("/works/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const work = yield db_1.prisma.work.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });
        res.json(work);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
router.delete("/works/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const work = yield db_1.prisma.work.delete({
            where: {
                id: id,
            },
        });
        res.json(work);
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
exports.default = router;
