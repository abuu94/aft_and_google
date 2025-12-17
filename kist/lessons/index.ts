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

app.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ id });
});

app.get("/sayhello/:keyword", (req: Request, res: Response) => {
  const keyword = req.params.keyword;
  res.send("Hello " + keyword);
});

app.post("/hello", (req: Request, res: Response) => {
  console.log(req.body.text);
  res.send("OK");
});


// Extra

app.get("/success", (req: Request, res: Response) => {
  res.status(200).send("Success");
});

app.get("/bad-request", (req: Request, res: Response) => {
  res.status(400).send("Bad request");
});

app.get("/not-found", (req: Request, res: Response) => {
  res.status(404).send("Not found");
});

app.get("/teapot", (req: Request, res: Response) => {
  res.status(418).send("I'm a teapot ☕");
});

app.get("/error", (req: Request, res: Response) => {
  res.status(500).send("Internal error");
});

app.get("/upstream", (req: Request, res: Response) => {
  res.status(502).send("Upstream API unavailable");
});


app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});