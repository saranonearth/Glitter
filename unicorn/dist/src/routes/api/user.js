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
//Module imports
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("config"));
const express_1 = require("express");
const check_1 = require("express-validator/check");
const gravatar_1 = __importDefault(require("gravatar"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const ResponseHandler_1 = __importDefault(require("../..//util/ResponseHandler"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const Tweet_1 = __importDefault(require("./../../models/Tweet"));
const router = express_1.Router();
// @route   POST api/user
// @desc    Register user given their username,email and password, returns the token upon successful registration
// @access  Public
router.post("/", [
    check_1.check("username", "Please include a valid username").not().isEmpty(),
    check_1.check("email", "Please include a valid email").isEmail(),
    check_1.check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return ResponseHandler_1.default.badRequest(req, res, "", { errors: errors.array() });
    }
    const { email, password, username } = req.body;
    try {
        let user = yield User_1.default.findOne({ username });
        if (user) {
            return ResponseHandler_1.default.badRequest(req, res, "", {
                errors: [
                    {
                        msg: "User already exists"
                    }
                ]
            });
        }
        const options = {
            s: "200",
            r: "pg",
            d: "mm"
        };
        const avatar = gravatar_1.default.url(email, options);
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashed = yield bcryptjs_1.default.hash(password, salt);
        // Build user object based on IUser
        const userFields = {
            email,
            username,
            password: hashed,
            avatar
        };
        user = new User_1.default(userFields);
        yield user.save();
        const payload = {
            userId: user.id
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.get("jwtSecret"), { expiresIn: config_1.default.get("jwtExpiration") }, (err, token) => {
            if (err)
                throw err;
            ResponseHandler_1.default.success(req, res, "", { token });
        });
    }
    catch (err) {
        console.log(err);
        ResponseHandler_1.default.serverError(req, res, "Server Error", {});
    }
}));
// @route   GET api/user
// @desc    Get users from usernames
// @access  Public
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const escpQuery = Object.assign({}, ...Object.keys(req.query).map(obKey => {
            return { [obKey]: req.query[obKey] };
        }));
        console.log(escpQuery);
        const filter = escpQuery.filter || '';
        const filterOn = escpQuery.filterOn || '';
        let filterQuery = {};
        if (filter.length > 0) {
            const regx = new RegExp(filter, 'i');
            if (filterOn.length > 0) {
                filterQuery = {
                    [filterOn]: regx
                };
            }
            else {
                filterQuery = {
                    username: regx
                };
            }
        }
        const users = yield User_1.default.find(filterQuery).limit(10);
        return ResponseHandler_1.default.success(req, res, "", users);
    }
    catch (err) {
        console.log(err);
        ResponseHandler_1.default.serverError(req, res, "Server Error", {});
    }
}));
// @route   POST api/user/follow/:id
// @param   id: id of the user to be followed
// @desc    Register user given their username,email and password, returns the token upon successful registration
// @access  private
router.post('/follow/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toFollow = req.params.id;
    try {
        const user = yield User_1.default.findOne({ _id: req.userId });
        if (!user) {
            return ResponseHandler_1.default.badRequest(req, res, "", { errors: [{ error: "User doesn't exist" }] });
        }
        if (user.followers.find(e => e.toString() === toFollow.toString())) {
            return ResponseHandler_1.default.badRequest(req, res, "", { errors: [{ msg: "User is already being followed" }] });
        }
        let userFollowers = user.followers;
        userFollowers = [mongoose_1.default.Types.ObjectId(toFollow), ...userFollowers];
        user.followers = userFollowers;
        yield user.save();
        //send updated tweet feed
        const tweetsOfFollowers = yield Tweet_1.default.find({
            'postedBy': {
                $in: [...userFollowers, req.userId]
            }
        }).sort([['createdAt', -1]]).populate("postedBy", { password: 0 }).exec();
        ResponseHandler_1.default.success(req, res, "Followed", tweetsOfFollowers);
    }
    catch (err) {
        console.log(err);
        ResponseHandler_1.default.serverError(req, res, "Server Error", {});
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map