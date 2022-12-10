import { Request, Response, Router } from "express";
import { IAuthValues } from "./interfaces.js";
export const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
    const formData: IAuthValues = req.body;
    console.log(formData);
});
