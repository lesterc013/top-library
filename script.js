const myLibrary = [];

// Write a constructor for making “Book” objects. We will revisit this in the next project. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book.
function Book(title, author, numPages) {
  if (!new.target) {
    throw Error("Must use new operator to create Book object.");
  }

  // Generates random ID and set default hasRead to false.
  this.id = crypto.randomUUID();
  this.hasRead = false;

  // Rest of properties are provided by the user.
  this.title = title;
  this.author = author;
  this.numPages = numPages;
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
  console.log(`New book added to library. Info: ${book.getInfo()}`);
}

// Testing
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180);
addBookToLibrary("Dune", "Frank Herbert", 412);
addBookToLibrary("Atomic Habits", "James Clear", 320);
addBookToLibrary("1984", "George Orwell", 328);
addBookToLibrary("The Pragmatic Programmer", "David Thomas", 352);

console.log(myLibrary);
