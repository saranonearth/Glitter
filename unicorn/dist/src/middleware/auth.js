"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ResponseHandler_1 = __importDefault(require("../util/ResponseHandler"));
function default_1(req, res, next) {
    // Get token from header
    const token = req.header("x-auth-token");
    // Check if no token
    if (!token) {
        return ResponseHandler_1.default.noAuthorization(req, res, "No token, authorization denied", {});
    }
    // Verify token
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.get("jwtSecret"));
        req.userId = payload.userId;
        next();
    }
    catch (err) {
        ResponseHandler_1.default.noAuthorization(req, res, "Token is not valid", {});
    }
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map