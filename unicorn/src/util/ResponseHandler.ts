import { Response } from 'express';
import Request from '../types/Request'

class JSONResponse {
    constructor() { }

    static success(req: Request, res: Response, message: string, data: any) {
        res.status(200).json({
            code: 200,
            message: message || 'success',
            data: data,
        });
    }

    static serverError(req: Request, res: Response, message: string, data: any) {
        res.status(500).json({
            code: 500,
            message: message || 'internal server error',
            data: data,
        });
    }
}

export default JSONResponse;