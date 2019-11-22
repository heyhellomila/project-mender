import { Response } from "express";
import { HttpError } from "../errors/HttpError";

export default function handleError(err: HttpError, res: Response) {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json(err);
    } else {
        return res.status(500).json(err);
    }
}
