import HttpStatusCodes from "http-status-codes";
import { Response } from 'express';
import Request from '../types/Request'

class JSONResponse {
    constructor() { }

    static success(_: Request, res: Response, message: string, data: any) {
        res.status(HttpStatusCodes.OK).json({
            code: HttpStatusCodes.OK,
            message: message || 'success',
            data: data,
        });
    }

    static noAuthorization(_: Request, res: Response, message: string, data: any) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({
            code: HttpStatusCodes.UNAUTHORIZED,
            message: message || 'success',
            data: data,
        });
    }


    static badRequest(_: Request, res: Response, message: string, data: any) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
            code: HttpStatusCodes.BAD_REQUEST,
            message: message || 'success',
            data: data,
        });
    }

    static serverError(_: Request, res: Response, message: string, data: any) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: message || 'internal server error',
            data: data,
        });
    }
}

export default JSONResponse;