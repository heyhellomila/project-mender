import { NextFunction, Request, Response } from "express";
import HttpException from "../../exceptions/HttpException";

export default function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = err.status;
    const message = err.message;

    res.status(status).send(message);
}
