import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// npm install datatables.net datatables.net-bs5
// npm install --save-dev @types/datatables.net
// npm install --save-dev @types/jquery

import $ from "jquery";
import "datatables.net-bs5"; // Bootstrap 5 styling for DataTables
// import 'datatables.net-bs5';

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

function renderBooksTable(books: Book[]): void {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <h1>Book Library Management System</h1>
    <table id="booksTable" class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${books.map(book => `
          <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.isAvailable ? "Available" : "Checked out"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  // Initialize DataTable
  $("#booksTable").DataTable();
}


// function renderBooks(books: Book[]): void {
//   const app = document.querySelector<HTMLDivElement>("#app")!;
//   app.innerHTML = "";

//   const title = document.createElement("h1");
//   title.textContent = "Book Library Management System";
//   app.appendChild(title);

//   const table = document.createElement("table");
//   table.className = "table table-striped table-bordered"
//   table.innerHTML=`
//   <thead class="table-dark">
//      <tr>
//        <th>ID</th>
//        <th>Title</th>
//        <th>Author</th>
//        <th>Year</th>
//        <th>Status</th>
//      </tr>
//    </thead>
//    <tbody></tbody>
//   `;
//   const tbody=table.querySelector("tbody");
//   books.forEach(book=>{
//     const row = document.createElement("tr");
//     row.innerHTML=`
//       <td>${book.id}</td>
//       <td>${book.title}</td>
//       <td>${book.author}</td>
//       <td>${book.year}</td>
//       <td>${book.isAvailable ? "Available" : "Checked out"}</td>
//     `;
//     tbody?.appendChild(row);
//   });

//   app.appendChild(table);

//   new window.DataTable(table);
//   // books.forEach(book => {
//   //   const container = document.createElement("div");
//   //   container.className = "book";

//   //   const heading = document.createElement("h2");
//   //   heading.textContent = book.title;
//   //   container.appendChild(heading);

//   //   const author = document.createElement("p");
//   //   author.textContent = `Author Name: ${book.author}`;
//   //   container.appendChild(author);

//   //   const year = document.createElement("p");
//   //   year.textContent = `Published Year: ${book.year}`;
//   //   container.appendChild(year);

//   //   const status = document.createElement("p");
//   //   status.textContent = book.isAvailable ? "Available" : "Checked out";
//   //   container.appendChild(status);

//   //   app.appendChild(container);
//   // });
// }

async function main(): Promise<void> {
  try {
    const books = await fetchBooks();
    renderBooksTable(books);
    // renderBooks(books);
  } catch (error) {
    console.error(error);

    const app = document.querySelector<HTMLDivElement>("#app");
    if (app) app.textContent = "Failed to load books.";
  }
}

main();


