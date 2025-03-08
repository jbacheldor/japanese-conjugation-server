"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// sets up to parse json work loads
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.port = 8000;
        var bodyParser = require('body-parser');
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.initializerControllers(controllers);
    }
    initializerControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    listen() {
        const server = this.app.listen(this.port, () => {
            console.log("listening on server", this.port);
        });
        return server;
    }
}
exports.default = App;
