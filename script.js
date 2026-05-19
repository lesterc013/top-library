// Write a constructor for making “Book” objects. We will revisit this in the next project. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book.
function Book(title, author, numPages, hasRead) {
  if (!new.target) {
    throw Error("Must use new operator to create Book object.");
  }

  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = hasRead;
}

// To provide some info on the book
Book.prototype.getInfo = function () {
  return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.hasRead ? "read already" : "not read yet"}`;
};

const myLibrary = {};

// To dynamically control the table header and the data for that header
const tableHeaders = [
  { header: "Title", bookProperty: "title" },
  { header: "Author", bookProperty: "author" },
  { header: "Number of Pages", bookProperty: "numPages" },
  { header: "Read Before", bookProperty: "hasRead" },
];

// To create a Book object and add it to myLibrary
function addBookToLibrary(title, author, numPages, hasRead = false) {
  const book = new Book(title, author, numPages, hasRead);
  const id = crypto.randomUUID();
  myLibrary[id] = book;
  return [id, book];
}

// To create a table row through given a book
function createBookRowData(bookId, book) {
  const newRow = tableBody.insertRow();
  // Insert a cell for each of the table header data
  tableHeaders.forEach((tableHeaderData) => {
    const cellData = newRow.insertCell();

    cellData.textContent = book[tableHeaderData.bookProperty];
  });

  // Add the remove book button to the end of the row - id is the corresponding bookId
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.className = "remove-book-button";
  removeButton.id = bookId;
  removeButton.type = "button";
  removeButton.addEventListener("click", (e) => {
    removeBook(e.target.id);
  });
  newRow.appendChild(removeButton);
}

// To populate the table td based on the books in the library
function populateTable() {
  Object.keys(myLibrary).forEach((id) => {
    createBookRowData(id, myLibrary[id]);
  });
}

// To remove a book from the library, then repopulate the table.
function removeBook(bookId) {
  delete myLibrary[bookId];
  // Clear the table
  tableBody.replaceChildren();
  // Repopulate the table
  populateTable();
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
  const [newBookId, newBook] = addBookToLibrary(...bookParams);
  createBookRowData(newBookId, newBook);
  newBookForm.reset();
});

// CREATING THE TABLE
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

// Add dummy books
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180);
addBookToLibrary("Dune", "Frank Herbert", 412);
addBookToLibrary("Atomic Habits", "James Clear", 320);
addBookToLibrary("1984", "George Orwell", 328);
addBookToLibrary("The Pragmatic Programmer", "David Thomas", 352);

populateTable();
