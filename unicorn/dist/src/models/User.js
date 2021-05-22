"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId }],
    username: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
const User = mongoose_1.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map