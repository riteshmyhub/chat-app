import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import fs from "fs";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsConfig from "./libs/cors";
import routes from "./routes/routes";
import createHttpError from "http-errors";
import fileUpload from "express-fileupload";
import "./database/database";

import { app, server } from "./socket/socket";
import { bucket } from "./libs/cloudinary";
import path from "path";

bucket.init();

const PORT = process.env.PORT || 8000;

interface CustomError extends Error {
   status?: number;
}
// middlewares

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: false }));
app.use("/api/v1", routes);

const client = path.join(__dirname, "..", "..", "frontend", "dist");
if (fs.existsSync(client + "/index.html")) {
   app.use(express.static(client));
   app.use("*", (req, res) => {
      res.sendFile(client + "/index.html");
   });
}

app.use(async (req, res, next) => {
   next(createHttpError.NotFound());
});
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
   res.status(err.status || 500);
   res.send({ error: { status: err.status || 500, message: err.message } });
});
// server
server.listen(PORT, () => {
   console.log(`server running on : http://localhost:${PORT}/api/v1`);
});