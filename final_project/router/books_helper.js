let books = require("./booksdb.js");

const getBooks = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 200); // Simulate a delay/
  });
};

// Simulate an async operation to fetch books by ISBN
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    getBooks().then((books) => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject({
          code: 404,
          message: `Error: Book with ISBN ${isbn} not found.`,
        });
      }
    });
  });
};

const getBookByAuthor = async (author) => {
  const filteredBooks = [];
  const result = await getBooks();

  Object.keys(result).forEach((isbn) => {
    const book = books[isbn];
    if (book.author === author) {
      const { author, ...bookWithoutAuthor } = book;
      filteredBooks.push({ isbn, ...bookWithoutAuthor });
    }
  });
  return filteredBooks;
};

const getBookByTitle = async (title) => {
  const filteredBooks = [];
  const result = await getBooks();

  Object.keys(result).forEach((isbn) => {
    const book = books[isbn];
    if (book.title === title) {
      const { title, ...bookWithoutTitle } = book;
      filteredBooks.push({ isbn, ...bookWithoutTitle });
    }
  });
  return filteredBooks;
};

module.exports.getBooks = getBooks;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBookByAuthor = getBookByAuthor;
module.exports.getBookByTitle = getBookByTitle;
