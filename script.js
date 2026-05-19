// Write a constructor for making “Book” objects. We will revisit this in the next project. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book.
function Book(title, author, numPages, hasRead) {
  if (!new.target) {
    throw Error("Must use new operator to create Book object.");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = hasRead;
}

// To provide some info on the book
Book.prototype.getInfo = function () {
  return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.hasRead ? "read already" : "not read yet"}`;
};

// add a separate function to the script (not inside the constructor) that can take some arguments,
// create a book from those arguments,
// and store the new book object into an array.
function addBookToLibrary(title, author, numPages, hasRead = false) {
  let book = new Book(title, author, numPages, hasRead);
  myLibrary.push(book);
  return book;
}

const myLibrary = [];

// Add dummy books
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180);
addBookToLibrary("Dune", "Frank Herbert", 412);
addBookToLibrary("Atomic Habits", "James Clear", 320);
addBookToLibrary("1984", "George Orwell", 328);
addBookToLibrary("The Pragmatic Programmer", "David Thomas", 352);

// To dynamically control the table header and the data for that header
const tableHeaders = [
  { header: "S/No.", bookProperty: null },
  { header: "Title", bookProperty: "title" },
  { header: "Author", bookProperty: "author" },
  { header: "Number of Pages", bookProperty: "numPages" },
  { header: "Read Before", bookProperty: "hasRead" },
  { header: "Id", bookProperty: "id" },
];

// CREATE THE TABLE HEADER FIRST
const tableHead = document.querySelector("thead");
// Create a new row
const headerRow = tableHead.insertRow();
// Add the th's and their text content
tableHeaders.forEach((colObj) => {
  const th = document.createElement("th");
  th.textContent = colObj.header;
  headerRow.appendChild(th);
});

// Global count of books
let count = 1;

// Initial population of books
const tableBody = document.querySelector("tbody");

function createBookRowData(book) {
  const newRow = tableBody.insertRow();
  // Insert a cell for each of the table header data
  tableHeaders.forEach((tableHeaderData) => {
    const cellData = newRow.insertCell();

    if (!tableHeaderData.bookProperty) {
      cellData.textContent = count;
      count++;
    } else {
      cellData.textContent = book[tableHeaderData.bookProperty];
    }
  });

  // Add the remove book button to the end of the row
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.className = "remove-book-button";
  removeButton.id = book.id;
  removeButton.type = "button";
  newRow.appendChild(removeButton);
}

function removeBook(bookId) {
  // Find the book in the myLibrary array that has the same id
  // Remove it
  // Clear the table
  // Repopulate the table
}

// Populate table based on the books in the library
function populateTable() {
  myLibrary.forEach((book) => {
    createBookRowData(book);
  });
}

// CONTROLLING OPEN AND CLOSING THE NEW BOOK MODAL
const newBookModal = document.querySelector(".new-book-modal");
const openModalButton = document.querySelector(".open-modal-button");
const closeModalButton = document.querySelector(".close-modal-button");

openModalButton.addEventListener("click", () => {
  newBookModal.showModal();
});

closeModalButton.addEventListener("click", () => newBookModal.close());

// ON MODAL FORM SUBMIT
const newBookForm = document.querySelector("#new-book-form");
newBookForm.addEventListener("submit", (e) => {
  const formData = new FormData(newBookForm);
  const bookParams = [
    formData.get("title"),
    formData.get("author"),
    parseInt(formData.get("number-pages")),
    formData.get("read-before"),
  ];
  const newBook = addBookToLibrary(...bookParams);
  createBookRowData(newBook);
  newBookForm.reset();
});

populateTable();
