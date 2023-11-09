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
// import bodyParser from "body-parser";
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./api/index_"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.enable("trust proxy");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, morgan_1.default)(":remote-addr :method :url :status :res[content-length] - :response-time ms"));
app.use(express_1.default.json({ limit: "5mb" }));
// app.use(express.urlencoded({ limit: "10mb" }));
const server = http_1.default.createServer(app);
const port = process.env.DEV_PORT;
app.use("/api", index_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
const shutdown = () => {
    console.log("Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === "dev") {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    }
    else {
        console.log(`⚡️[server]: Server is running at ${process.env.CYCLIC_URL}`);
    }
}));
