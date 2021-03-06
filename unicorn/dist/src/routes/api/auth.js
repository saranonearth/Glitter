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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("config"));
const express_1 = require("express");
const check_1 = require("express-validator/check");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Relative imports
const auth_1 = __importDefault(require("../../middleware/auth"));
const User_1 = __importDefault(require("../../models/User"));
const ResponseHandler_1 = __importDefault(require("../../util/ResponseHandler"));
const router = express_1.Router();
// @route   GET api/auth
// @desc    Get authenticated user given the token
// @access  Private
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId).select("-password");
        if (!user) {
            return ResponseHandler_1.default.badRequest(req, res, "", { errors: [] });
        }
        return res.json(user);
    }
    catch (err) {
        ResponseHandler_1.default.serverError(req, res, "Server Error", {});
    }
}));
// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post("/", [
    check_1.check("username", "Please include a valid username").not().isEmpty(),
    check_1.check("password", "Password is required").exists()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(http_status_codes_1.default.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ username });
        if (!user) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                errors: [
                    {
                        msg: "Invalid Credentials"
                    }
                ]
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                errors: [
                    {
                        msg: "Invalid Credentials"
                    }
                ]
            });
        }
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
exports.default = router;
//# sourceMappingURL=auth.js.map