import { Request, Response } from "express";

const errorHandler = (fn: Function) => {
    return (req: Request, res: Response) => {
        fn(req, res).catch((err: Error) => {
            console.log(err);
            res.status(500).json({ message: "Something went wrong", errormessage: err.message });
        });
        return;
    };
};

export default errorHandler;