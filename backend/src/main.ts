import fs from "fs";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsConfig from "./libs/cors";
import routes from "./routes/routes";
import createHttpError from "http-errors";
import fileUpload from "express-fileupload";
import "./database/database";
dotenv.config();
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

if (fs.existsSync(__dirname + "/views" + "/index.html")) {
   app.use(express.static(path.join(__dirname, "views")));
   app.use("*", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "index.html"));
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
