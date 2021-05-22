"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class JSONResponse {
    constructor() { }
    static success(_, res, message, data) {
        res.status(http_status_codes_1.default.OK).json({
            code: http_status_codes_1.default.OK,
            message: message || 'success',
            data: data,
        });
    }
    static noAuthorization(_, res, message, data) {
        res.status(http_status_codes_1.default.UNAUTHORIZED).json({
            code: http_status_codes_1.default.UNAUTHORIZED,
            message: message || 'success',
            data: data,
        });
    }
    static badRequest(_, res, message, data) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            code: http_status_codes_1.default.BAD_REQUEST,
            message: message || 'success',
            data: data,
        });
    }
    static serverError(_, res, message, data) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
            message: message || 'internal server error',
            data: data,
        });
    }
}
exports.default = JSONResponse;
//# sourceMappingURL=ResponseHandler.js.map