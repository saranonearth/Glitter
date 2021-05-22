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
//Modules
const express_1 = require("express");
const check_1 = require("express-validator/check");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./../../models/User"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const Tweet_1 = __importDefault(require("../../models/Tweet"));
const ResponseHandler_1 = __importDefault(require("../../util/ResponseHandler"));
const router = express_1.Router();
const WSS_TWEET = "GLITTED";
// @route   GET api/tweet
// @desc    Get tweets of a user
// @access  Private
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ _id: req.userId });
        if (!user) {
            return ResponseHandler_1.default.badRequest(req, res, "", { errors: [{ error: "User not found" }] });
        }
        //adding current user to have the user's tweets too in the feed
        let followers = user.followers;
        followers.push(mongoose_1.default.Types.ObjectId(req.userId));
        const tweetsOfFollowers = yield Tweet_1.default.find({
            'postedBy': {
                $in: [...followers]
            }
        }).sort([['createdAt', -1]]).populate("postedBy", { password: 0 }).exec();
        return ResponseHandler_1.default.success(req, res, "", tweetsOfFollowers);
    }
    catch (err) {
        console.log(err);
        ResponseHandler_1.default.serverError(req, res, "Server Error", {});
    }
}));
// @route   POST api/tweet
// @desc    Post tweet of a user
// @access  Private
router.post("/", auth_1.default, [
    check_1.check("tweetText", "Please include a valid tweet data").not().isEmpty()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const io = req.app.get('socketio');
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return ResponseHandler_1.default.badRequest(req, res, "", { errors: errors.array() });
    }
    const { tweetText } = req.body;
    try {
        console.log(req.userId);
        let tweet = new Tweet_1.default({
            tweetText,
            postedBy: req.userId
        });
        yield tweet.save();
        tweet = yield tweet.populate('postedBy').execPopulate();
        io.emit(WSS_TWEET, tweet);
        return ResponseHandler_1.default.success(req, res, "", tweet);
    }
    catch (err) {
        console.log(err);
        ResponseHandler_1.default.serverError(req, res, "Server Error", {});
    }
}));
exports.default = router;
//# sourceMappingURL=tweet.js.map