"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const data_1 = require("./data/data");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Backend Running');
});
app.get('/chat', (req, res) => {
    res.send(data_1.chats);
});
app.get('/chat/:id', (req, res) => {
    console.log(req.params.id);
    const singleChat = data_1.chats.find(chat => chat._id === req.params.id);
    res.send(singleChat);
});
app.listen(port, () => {
    return console.log(`Backend is listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map