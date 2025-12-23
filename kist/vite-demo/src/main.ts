import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// npm install datatables.net datatables.net-bs5
// npm install --save-dev @types/datatables.net
// npm install --save-dev @types/jquery
import $ from "jquery";
import "datatables.net-bs5"; // Bootstrap 5 styling for DataTables
import { Modal } from "bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Toast } from "bootstrap";

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
    <button id="addBookBtn" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#bookModal">
      Add Book
    </button>
    <table id="booksTable" class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${books.map(book => `
          <tr data-id="${book.id}">
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>
              <button class="btn btn-sm ${book.isAvailable ? "btn-success" : "btn-danger"} toggle-status">
                ${book.isAvailable ? "Available" : "Checked out"}
              </button>
            </td>
            <td>
              <button class="btn btn-info btn-sm view-btn" data-bs-toggle="modal" data-bs-target="#bookModal">View</button>
              <button class="btn btn-warning btn-sm edit-btn" data-bs-toggle="modal" data-bs-target="#bookModal">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <!-- Bootstrap Modal -->
    <div class="modal fade" id="bookModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Book Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <!-- Dynamic content goes here -->
            <form id="bookForm">
              <input type="hidden" id="bookId" />
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" id="bookTitle" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Author</label>
                <input type="text" id="bookAuthor" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Year</label>
                <input type="number" id="bookYear" class="form-control" />
              </div>
              <div class="form-check">
                <input type="checkbox" id="bookAvailable" class="form-check-input" />
                <label class="form-check-label">Available</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" id="saveBookBtn" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  `;
  app.innerHTML += `
  <!-- Delete Confirmation Modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">Confirm Delete</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this book?</p>
          <p><strong id="deleteBookTitle"></strong></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" id="confirmDeleteBtn" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
`;


  // Initialize DataTable
  $("#booksTable").DataTable();

  // Event Handlers
  setupEventHandlers();
}

function setupEventHandlers() {
  // Toggle status
  // $(document).on("click", ".toggle-status", function () {
  //   const row = $(this).closest("tr");
  //   const id = row.data("id");
  //   const btn = $(this);

  //   const isAvailable = btn.text() === "Available";
  //   btn.text(isAvailable ? "Checked out" : "Available")
  //      .toggleClass("btn-success btn-danger");

  //   // TODO: send PUT request to backend to update status
  //   console.log(`Toggled status for book ${id}`);
  // });
//   $(document).on("click", ".toggle-status", async function () {
//   const row = $(this).closest("tr");
//   const id = row.data("id");
//   const btn = $(this);

//   // Determine new status
//   const isAvailable = btn.text() !== "Available"; // if currently "Checked out", we want to set Available

//   try {
//     // Send PUT request to backend
//     const response = await fetch(`http://127.0.0.1:3000/books/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ isAvailable }),
//     });

//     if (!response.ok) throw new Error("Failed to update status");

//     // Update UI after success
//     btn.text(isAvailable ? "Available" : "Checked out")
//        .toggleClass("btn-success btn-danger", isAvailable)
//        .toggleClass("btn-danger btn-success", !isAvailable);

//     console.log(`Book ${id} status updated to: ${isAvailable ? "Available" : "Checked out"}`);
//   } catch (err) {
//     console.error(err);
//     alert("Error updating status");
//   }
// });

$(document).on("click", ".toggle-status", async function () {
  const row = $(this).closest("tr");
  const id = row.data("id");
  const btn = $(this);

  // Determine new status
  const newStatus = btn.text() !== "Available"; // if currently "Checked out", we want to set Available

  try {
    // Send minimal PUT request (only isAvailable field)
    const response = await fetch(`http://127.0.0.1:3000/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isAvailable: newStatus }),
    });

    if (!response.ok) throw new Error("Failed to update status");

    // Update UI after success
    btn.text(newStatus ? "Available" : "Checked out")
       .removeClass("btn-success btn-danger")
       .addClass(newStatus ? "btn-success" : "btn-danger");

    console.log(`Book ${id} status updated to: ${newStatus ? "Available" : "Checked out"}`);
  } catch (err) {
    console.error(err);
    alert("Error updating status");
  }
});



  // View book
  $(document).on("click", ".view-btn", function () {
    const row = $(this).closest("tr");
    fillModal(row, true);
  });

  // Edit book
  $(document).on("click", ".edit-btn", function () {
    const row = $(this).closest("tr");
    fillModal(row, false);
  });

  // Delete book
  // $(document).on("click", ".delete-btn", function () {
  //   const row = $(this).closest("tr");
  //   const id = row.data("id");
  //   row.remove();
  //   // TODO: send DELETE request to backend
  //   console.log(`Deleted book ${id}`);
  // });
  let bookIdToDelete: number | null = null;

$(document).on("click", ".delete-btn", function () {
  const row = $(this).closest("tr");
  bookIdToDelete = row.data("id");

  // Show book title in modal for clarity
  const bookTitle = row.find("td:eq(1)").text();
  $("#deleteBookTitle").text(bookTitle);

  // Open delete confirmation modal
  const modalEl = document.getElementById("deleteModal")!;
  const modal = Modal.getOrCreateInstance(modalEl);
  modal.show();
});

// Confirm delete
$("#confirmDeleteBtn").on("click", async function () {
  if (!bookIdToDelete) return;

  try {
    const response = await fetch(`http://127.0.0.1:3000/books/${bookIdToDelete}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete book");

    // Remove row from DataTable
    const table = $("#booksTable").DataTable();
    table.row($(`tr[data-id='${bookIdToDelete}']`)).remove().draw(false);

    console.log(`Book ${bookIdToDelete} deleted successfully`);

    // Close modal
    // closeBookModal();
    const modalEl = document.getElementById("deleteModal")!;
    const modal = Modal.getOrCreateInstance(modalEl);
    modal.hide();

    bookIdToDelete = null;
  } catch (err) {
    console.error(err);
    alert("Error deleting book");
  }
});

  $("#saveBookBtn").on("click", async function () {
  const id = $("#bookId").val();
  const book: Book = {
    id: id ? Number(id) : 0, // if empty, backend will assign ID
    title: String($("#bookTitle").val()),
    author: String($("#bookAuthor").val()),
    year: Number($("#bookYear").val()),
    isAvailable: $("#bookAvailable").is(":checked"),
  };

  try {
    if (!id) {
      // ADD NEW BOOK → POST
      const response = await fetch("http://127.0.0.1:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (!response.ok) throw new Error("Failed to add book");
      console.log("Book added:", await response.json());
    } else {
      // UPDATE EXISTING BOOK → PUT
      const response = await fetch(`http://127.0.0.1:3000/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (!response.ok) throw new Error("Failed to update book");
      console.log("Book updated:", await response.json());
    }

    // Refresh table after save
    const books = await fetchBooks();
    renderBooksTable(books);

    // Close modal
    closeBookModal();
    // const modalEl = document.getElementById("bookModal")!;
    // const modal = Modal.getOrCreateInstance(modalEl);
    // modal.hide();

  } catch (err) {
    console.error(err);
    alert("Error saving book");
  }
});



   $("#addBookBtn").on("click", function () { 
      clearModal(); 
      $("#saveBookBtn").show(); // show Save button
      $("#bookForm input, #bookForm checkbox").prop("disabled", false); // enable fields 
      $(".modal-title").text("Add New Book"); 
    });
}

function clearModal() { 
  $("#bookId").val(""); 
  $("#bookTitle").val(""); 
  $("#bookAuthor").val(""); 
  $("#bookYear").val(""); 
  $("#bookAvailable").prop("checked", false); 
}

function closeBookModal() { 
  const modalEl = document.getElementById("bookModal")!; 
  const modal = Modal.getOrCreateInstance(modalEl); 
  modal.hide(); 
}

function fillModal(row: JQuery<HTMLElement>, isView: boolean) {
  const id = row.data("id");
  $("#bookId").val(id);
  $("#bookTitle").val(row.find("td:eq(1)").text());
  $("#bookAuthor").val(row.find("td:eq(2)").text());
  $("#bookYear").val(row.find("td:eq(3)").text());
  $("#bookAvailable").prop("checked", row.find(".toggle-status").text() === "Available");

  if (isView) {
    $("#bookForm input, #bookForm checkbox").prop("disabled", true);
    $("#saveBookBtn").hide();
  } else {
    $("#bookForm input, #bookForm checkbox").prop("disabled", false);
    $("#saveBookBtn").show();
  }
}

document.getElementById("bookModal")!.addEventListener("hidden.bs.modal", () => {
  clearModal(); // your function that empties inputs
});


async function main(): Promise<void> {
  try {
    const books = await fetchBooks();
    renderBooksTable(books);
  } catch (error) {
    console.error(error);

    const app = document.querySelector<HTMLDivElement>("#app");
    if (app) {
      app.innerHTML = `
        <div class="alert alert-danger d-flex align-items-center mt-3" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          <div>
            <strong>Failed to load books.</strong> Please check your connection or try again later.
          </div>
          <button id="retryBtn" class="btn btn-light btn-sm ms-auto">Retry</button>
        </div>
      `;

      // Attach retry handler
      const retryBtn = document.querySelector<HTMLButtonElement>("#retryBtn");
      if (retryBtn) {
        retryBtn.addEventListener("click", async () => {
          app.innerHTML = `<div class="spinner-border text-primary mt-3" role="status">
                             <span class="visually-hidden">Loading...</span>
                           </div>`;
          try {
            const books = await fetchBooks();
            renderBooksTable(books);
          } catch (err) {
            console.error(err);
            app.innerHTML = `
              <div class="alert alert-danger mt-3" role="alert">
                <strong>Still failed to load books.</strong> Please try again later.
              </div>
            `;
          }
        });
      }
    }
  }
}

main();
