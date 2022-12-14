import { Response, Request, NextFunction } from "express";
import { ErrorException } from "./error-exception.js";
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof ErrorException) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({ message: "Unexpected error" });
};
