
console.log("Vite Project for Book has Started");

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  isAvailable: boolean;
}

async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("http://127.0.0.1:3000/books");

  if (!response.ok) {
    throw new Error("Failed to fetch books: " + response.status);
  }

  return await response.json();
}

function renderBooks(books: Book[]): void {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Book Library";
  app.appendChild(title);

  books.forEach(book => {
    const container = document.createElement("div");
    container.className = "book";

    const heading = document.createElement("h2");
    heading.textContent = book.title;
    container.appendChild(heading);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    container.appendChild(author);

    const year = document.createElement("p");
    year.textContent = `Published: ${book.year}`;
    container.appendChild(year);

    const status = document.createElement("p");
    status.textContent = book.isAvailable ? "Available" : "Checked out";
    container.appendChild(status);

    app.appendChild(container);
  });
}

async function main(): Promise<void> {
  try {
    const books = await fetchBooks();
    renderBooks(books);
  } catch (error) {
    console.error(error);

    const app = document.querySelector<HTMLDivElement>("#app");
    if (app) app.textContent = "Failed to load books.";
  }
}

main();


