"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tweetSchema = new mongoose_1.Schema({
    tweetText: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});
const Tweet = mongoose_1.model("Tweet", tweetSchema);
exports.default = Tweet;
//# sourceMappingURL=Tweet.js.map