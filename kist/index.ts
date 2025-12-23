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
  { id: 3, title: "Effective TypeScript", author: "Dan Vanderkam", year: 2019, isAvailable: true },
  { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", year: 1999, isAvailable: true },
  { id: 5, title: "Design Patterns", author: "Erich Gamma et al.", year: 1994, isAvailable: false },
  { id: 6, title: "Refactoring", author: "Martin Fowler", year: 1999, isAvailable: true },
  { id: 7, title: "Code Complete", author: "Steve McConnell", year: 2004, isAvailable: true },
  { id: 8, title: "Introduction to Algorithms", author: "Thomas H. Cormen et al.", year: 2009, isAvailable: false },
  { id: 9, title: "Structure and Interpretation of Computer Programs", author: "Harold Abelson & Gerald Jay Sussman", year: 1996, isAvailable: true },
  { id: 10, title: "Working Effectively with Legacy Code", author: "Michael Feathers", year: 2004, isAvailable: true },
  { id: 11, title: "Domain-Driven Design", author: "Eric Evans", year: 2003, isAvailable: false },
  { id: 12, title: "Patterns of Enterprise Application Architecture", author: "Martin Fowler", year: 2002, isAvailable: true },
  { id: 13, title: "Head First Design Patterns", author: "Eric Freeman & Elisabeth Robson", year: 2004, isAvailable: true },
  { id: 14, title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008, isAvailable: false },
  { id: 15, title: "Programming Pearls", author: "Jon Bentley", year: 1986, isAvailable: true },
  { id: 16, title: "Algorithms", author: "Robert Sedgewick & Kevin Wayne", year: 2011, isAvailable: true },
  { id: 17, title: "The Mythical Man-Month", author: "Frederick P. Brooks Jr.", year: 1975, isAvailable: false },
  { id: 18, title: "Continuous Delivery", author: "Jez Humble & David Farley", year: 2010, isAvailable: true },
  { id: 19, title: "Site Reliability Engineering", author: "Niall Richard Murphy et al.", year: 2016, isAvailable: true },
  { id: 20, title: "Release It!", author: "Michael T. Nygard", year: 2007, isAvailable: false },
  { id: 21, title: "The Phoenix Project", author: "Gene Kim et al.", year: 2013, isAvailable: true },
  { id: 22, title: "Accelerate", author: "Nicole Forsgren, Jez Humble & Gene Kim", year: 2018, isAvailable: true },
  { id: 23, title: "Software Engineering at Google", author: "Titus Winters et al.", year: 2020, isAvailable: false },
  { id: 24, title: "The Art of Computer Programming", author: "Donald Knuth", year: 1968, isAvailable: true },
  { id: 25, title: "Compilers: Principles, Techniques, and Tools", author: "Alfred V. Aho et al.", year: 1986, isAvailable: true },
  { id: 26, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell & Peter Norvig", year: 2010, isAvailable: false },
  { id: 27, title: "Deep Learning", author: "Ian Goodfellow, Yoshua Bengio & Aaron Courville", year: 2016, isAvailable: true },
  { id: 28, title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow", author: "Aurélien Géron", year: 2017, isAvailable: true },
  { id: 29, title: "Python Crash Course", author: "Eric Matthes", year: 2015, isAvailable: false },
  { id: 30, title: "Fluent Python", author: "Luciano Ramalho", year: 2015, isAvailable: true }
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



// Add new book
app.post("/books",(req,res)=>{
  const newBook:Book={
    id:books.length? Math.max(...books.map(b=>b.id))+1:1,
    ...req.body,
  };
  books.push(newBook);
  res.status(201).json(newBook);

});

// Update book (full or partial) 
app.put("/books/:id", (req: Request, res: Response) => { 
  const id = Number(req.params.id); 
  const index = books.findIndex(b => b.id === id); 
  if (index === -1) { 
    return res.status(404).json({ error: "Book not found" });
   } 
   
   books[index] = { ...books[index], ...req.body }; // merge updates 
   res.json(books[index]); 
  });


  // Delete book 
  app.delete("/books/:id", (req: Request, res: Response) => {
     const id = Number(req.params.id); 
     const index = books.findIndex(b => b.id === id); 
     if (index === -1) { 
      return res.status(404).json({ error: "Book not found" });
     } 
     const deletedBook = books.splice(index, 1)[0]; 
     res.json({ message: "Book deleted", book: deletedBook }); 
    });




// ---- Start server ----

app.listen(PORT, () => {
  console.log(`Books API running at http://127.0.0.1:${PORT}`);
});

