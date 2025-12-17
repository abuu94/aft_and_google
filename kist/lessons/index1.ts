// import express, { Request, Response } from "express";
import express from "express";

import type { Request, Response } from "express"; 

const app = express();
const port: number = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.type("text/plain");
  res.status(200).send("Hello world");
});

app.post("/hello", (req: Request, res: Response) => {
  console.log(req.body.text);
  res.send("OK");
});




app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});