"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MessageModel = new mongoose_1.default.Schema({
    sender: { type: mongoose_1.default.Schema.Types.ObjectId },
    content: { type: String, trim: true },
    chat: { type: mongoose_1.default.Schema.Types.ObjectId },
}, {
    timestamps: true,
});
exports.Message = mongoose_1.default.model('Message', MessageModel);
//# sourceMappingURL=MessageModel.js.map