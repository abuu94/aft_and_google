// Import Bootstrap styles and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

console.log("Vite Project for Book has Started");

// Book interface
interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  isAvailable: boolean;
}

// Global state
let allBooks: Book[] = [];
let currentPage = 1;
const booksPerPage = 6;

// Fetch books from backend
async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("http://127.0.0.1:3000/books");
  if (!response.ok) {
    throw new Error("Failed to fetch books: " + response.status);
  }
  return await response.json();
}

// Render books as Bootstrap cards
function renderBooks(books: Book[]): void {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = "";

  const row = document.createElement("div");
  row.className = "row";
  app.appendChild(row);

  books.forEach(book => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";
    row.appendChild(col);

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";
    col.appendChild(card);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    const heading = document.createElement("h5");
    heading.className = "card-title";
    heading.textContent = book.title;
    cardBody.appendChild(heading);

    const author = document.createElement("p");
    author.className = "card-text";
    author.textContent = `Author: ${book.author}`;
    cardBody.appendChild(author);

    const year = document.createElement("p");
    year.className = "card-text";
    year.textContent = `Published: ${book.year}`;
    cardBody.appendChild(year);

    const status = document.createElement("span");
    status.className = book.isAvailable ? "badge bg-success" : "badge bg-danger";
    status.textContent = book.isAvailable ? "Available" : "Checked out";
    cardBody.appendChild(status);

    // Edit & Delete buttons
    const updateBtn = document.createElement("button");
    updateBtn.className = "btn btn-sm btn-warning me-2 mt-2";
    updateBtn.textContent = "Edit";
    updateBtn.addEventListener("click", () => updateBook(book.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger mt-2";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteBook(book.id));

    cardBody.appendChild(updateBtn);
    cardBody.appendChild(deleteBtn);
  });
}

// Pagination controls
function renderPagination(totalBooks: number): void {
  const pagination = document.querySelector<HTMLUListElement>("#pagination")!;
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = "page-item" + (currentPage === 1 ? " disabled" : "");
  const prevA = document.createElement("a");
  prevA.className = "page-link";
  prevA.href = "#";
  prevA.textContent = "Previous";
  prevA.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      paginateBooks();
    }
  });
  prevLi.appendChild(prevA);
  pagination.appendChild(prevLi);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item" + (i === currentPage ? " active" : "");

    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = i.toString();

    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      paginateBooks();
    });

    li.appendChild(a);
    pagination.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = "page-item" + (currentPage === totalPages ? " disabled" : "");
  const nextA = document.createElement("a");
  nextA.className = "page-link";
  nextA.href = "#";
  nextA.textContent = "Next";
  nextA.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      paginateBooks();
    }
  });
  nextLi.appendChild(nextA);
  pagination.appendChild(nextLi);
}

// Paginate books
function paginateBooks(): void {
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const paginatedBooks = allBooks.slice(start, end);
  renderBooks(paginatedBooks);
  renderPagination(allBooks.length);
}

// Search functionality
function setupSearch(): void {
  const input = document.querySelector<HTMLInputElement>("#searchInput")!;
  const btn = document.querySelector<HTMLButtonElement>("#searchBtn")!;

  function filterBooks(query: string): void {
    const filtered = allBooks.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderBooks(filtered.slice(0, booksPerPage));
    renderPagination(filtered.length);
  }

  btn.addEventListener("click", () => {
    filterBooks(input.value.toLowerCase());
  });

  input.addEventListener("input", () => {
    filterBooks(input.value.toLowerCase());
  });
}

// Create book
async function createBook(book: Omit<Book, "id">): Promise<void> {
  const response = await fetch("http://127.0.0.1:3000/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!response.ok) throw new Error("Failed to create book");
  allBooks = await fetchBooks();
  paginateBooks();
}

// Hook up create form
function setupCreateForm(): void {
  const form = document.querySelector<HTMLFormElement>("#bookForm")!;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = (document.querySelector<HTMLInputElement>("#titleInput")!).value;
    const author = (document.querySelector<HTMLInputElement>("#authorInput")!).value;
    const year = parseInt((document.querySelector<HTMLInputElement>("#yearInput")!).value);
    const isAvailable = (document.querySelector<HTMLSelectElement>("#statusInput")!).value === "true";

    await createBook({ title, author, year, isAvailable });
    form.reset();
  });
}

// Delete book
async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`http://127.0.0.1:3000/books/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete book");
  allBooks = await fetchBooks();
  paginateBooks();
}

// Update book (simple prompt for now)
async function updateBook(id: number): Promise<void> {
  const book = allBooks.find(b => b.id === id);
  if (!book) return;

  const newTitle = prompt("Enter new title:", book.title);
  if (!newTitle) return;

  const response = await fetch(`http://127.0.0.1:3000/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...book, title: newTitle }),
  });

  if (!response.ok) throw new Error("Failed to update book");
  allBooks = await fetchBooks();
  paginateBooks();
}

// Main entry
async function main(): Promise<void> {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.textContent = "Loading books...";
  try {
    allBooks = await fetchBooks();
    paginateBooks();
    setupSearch();
    setupCreateForm();
  } catch (error) {
    console.error(error);
    app.textContent = "Failed to load books.";
  }
}

main();
