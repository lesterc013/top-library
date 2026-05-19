// Write a constructor for making “Book” objects. We will revisit this in the next project. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book.
function Book(title, author, numPages) {
  if (!new.target) {
    throw Error("Must use new operator to create Book object.");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = false;
}

// To provide some info on the book
Book.prototype.getInfo = function () {
  return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.hasRead ? "read already" : "not read yet"}`;
};

// add a separate function to the script (not inside the constructor) that can take some arguments,
// create a book from those arguments,
// and store the new book object into an array.
function addBookToLibrary(title, author, numPages) {
  let book = new Book(title, author, numPages);
  myLibrary.push(book);
  // console.log(`New book added to library. Info: ${book.getInfo()}`);
}

const myLibrary = [];

// Add dummy books
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180);
addBookToLibrary("Dune", "Frank Herbert", 412);
addBookToLibrary("Atomic Habits", "James Clear", 320);
addBookToLibrary("1984", "George Orwell", 328);
addBookToLibrary("The Pragmatic Programmer", "David Thomas", 352);

// To dynamically control the table header and the data for that header
const columns = [
  { header: "S/No.", bookProp: null },
  { header: "Title", bookProp: "title" },
  { header: "Author", bookProp: "author" },
  { header: "Number of Pages", bookProp: "numPages" },
  { header: "Read Before", bookProp: "hasRead" },
  { header: "Id", bookProp: "id" },
];

// CREATE THE TABLE HEADER FIRST
const tableHead = document.querySelector("thead");
// Create a new row
const headerRow = tableHead.insertRow();
// Add the th's and their text content
columns.forEach((colObj) => {
  let th = document.createElement("th");
  th.textContent = colObj.header;
  headerRow.appendChild(th);
});

// CREATE THE TABLE BODY
const tableBody = document.querySelector("tbody");

// // Write a function to display each book on the html page
// // Gonna use a table to practice displaying standard data
function addBookData() {
  let count = 1;
  myLibrary.forEach((book) => {
    // Create the new tr
    const newRow = tableBody.insertRow();

    // Using every header and bookProp to figure out which data to place where
    columns.forEach((colObj) => {
      const cellData = newRow.insertCell();

      if (!colObj.bookProp) {
        cellData.textContent = count;
        count++;
      } else {
        cellData.textContent = book[colObj.bookProp];
      }
    });
  });
}

addBookData();

// CONTROLLING OPEN AND CLOSING THE MODAL
const newBookModal = document.querySelector(".new-book-modal");
const openModalButton = document.querySelector(".open-modal-button");
const closeModalButton = document.querySelector(".close-modal-button");

openModalButton.addEventListener("click", () => {
  newBookModal.showModal();
});

closeModalButton.addEventListener("click", () => newBookModal.close());
