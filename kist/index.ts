import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Allow requests from the Vite dev server (http://localhost:5173)
app.use(cors());
app.use(express.json());

// ---- Interfaces ----

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  isAvailable: boolean;
}

// ---- Sample data ----

const books: Book[] = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008, isAvailable: true },
  { id: 2, title: "You Don't Know JS", author: "Kyle Simpson", year: 2015, isAvailable: false },
  { id: 3, title: "Effective TypeScript", author: "Dan Vanderkam", year: 2019, isAvailable: true }
];

// ---- Routes ----

// Simple health check
app.get("/", (req, res) => {
  res.type("text/plain").send("Books API is running");
});

app.get("/books", (req, res) => {
  res.type("application/json").status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book);
});

// ---- Start server ----

app.listen(PORT, () => {
  console.log(`Books API running at http://127.0.0.1:${PORT}`);
});

