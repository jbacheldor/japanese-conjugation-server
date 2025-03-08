"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const conjugationsController_1 = __importDefault(require("./controllers/conjugationsController"));
const app = new _1.default([new conjugationsController_1.default()]);
const server = app.listen();
process.on('SIGTERM', () => {
    server.close(() => {
        console.log("stopping server due to reasons");
        process.exit();
    });
});
