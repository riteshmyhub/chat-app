import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/api/v1", (req: Request, res: Response) => {
   res.send(["test", "text"]);
});

const client = path.join(__dirname, "..", "..", "client", "dist");
if (fs.existsSync(client + "/index.html")) {
   app.use(express.static(client));
   app.use("*", (req, res) => {
      res.sendFile(client + "/index.html");
   });
}

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});
