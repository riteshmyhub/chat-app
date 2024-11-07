import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import fs from "fs";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";
import createHttpError from "http-errors";
import fileUpload from "express-fileupload";
import "./database/database";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import path from "path";

const PORT = process.env.PORT || 8000;

interface CustomError extends Error {
   status?: number;
}
// middlewares
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: "http://localhost:3000", credentials: true } });

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

io.on("connection", (socket) => {
   console.log("User connected:", socket.id);

   socket.emit("ONLINE_USERS", { s: "ss" });

   socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
   });
});

// server
server.listen(PORT, () => {
   console.log(`server running on : http://localhost:${PORT}/api/v1`);
});
