class Book {
  constructor(title = "", author = "", pages = "0", isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    this.books.push(newBook);
  }
}

const myLibrary = new Library();
const bookGrid = document.querySelector(".book-cards");

function createBookCard(book) {
  // Creates a grid item that is placed in MAIN in div.book-cards.
  const card = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonContainer = document.createElement("div");
  const readButton = document.createElement("button");
  const removeButton = document.createElement("button");

  card.classList.add("card");
  buttonContainer.classList.add("card-buttons");
  removeButton.classList.add("remove-button");

  title.textContent = `"${book.title}"`;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  removeButton.textContent = "Remove Book";

  if (book.isRead) {
    readButton.classList.add("button-read");
    readButton.textContent = "READ IT";
    readButton.addEventListener("click", () => {
      readButton.classList.toggle("button-unread");
      if (readButton.textContent === "READ IT") {
        readButton.textContent = "DIDN'T READ IT!";
        return (book.isRead = false);
      } else {
        readButton.textContent = "READ IT";
        return (book.isRead = true);
      }
    });
  } else {
    readButton.classList.add("button-unread");
    readButton.textContent = "DIDN'T READ IT!";
    readButton.addEventListener("click", () => {
      readButton.classList.add("button-read");
      readButton.classList.toggle("button-unread");
      if (readButton.textContent === "DIDN'T READ IT!") {
        readButton.textContent = "READ IT";
        return (book.isRead = true);
      } else {
        readButton.textContent = "DIDN'T READ IT!";
        return (book.isRead = false);
      }
    });}

    removeButton.addEventListener("click", () => {
      bookGrid.removeChild(card);
      removeBook(book);
    });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(buttonContainer);
  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(removeButton);
  bookGrid.appendChild(card);
}

function removeBook(item) {
  const index = myLibrary.books.indexOf(item);
  myLibrary.books.splice(index, 1);
  updateBooks();
}

function bookFromInput() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;
  return new Book(title, author, pages, isRead);
}

function updateBooks() {
  resetBooks();
  for (let book of myLibrary.books) {
    createBookCard(book);
  }
}

// This prevents duplicates of cards from forming in the grid
function resetBooks() {
  bookGrid.innerHTML = "";
}

// Restrict page refresh, get book info from input, stores into array, places new card
function addBook(event) {
  event.preventDefault();
  const newBook = bookFromInput();
  myLibrary.addBook(newBook);
  updateBooks();
}

// Selects the "+" button, calls reference of above function
const addBookSubmit = document.querySelector("#submit");
addBookSubmit.onclick = addBook;