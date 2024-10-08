"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//se deben instalar los tipos de typescript
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/ping", (req, res) => {
    res.send("pong");
});
const port = 3003;
app.listen(port, () => {
    console.log("servidor en ejecucion");
    console.log(`http://localhost:${port}/`);
});
