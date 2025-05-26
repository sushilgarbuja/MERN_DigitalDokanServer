import multer from "multer";
import express, { Request } from "express";

// Correctly reference the Multer file type from multer, not Express
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, "./src/uploads/");
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export const upload = multer({ storage: storage });
export { multer, storage };

