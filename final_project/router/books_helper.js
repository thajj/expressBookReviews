let books = require("./booksdb.js");

const getBookByAuthor = (author) => {
  const filteredBooks = [];

  Object.keys(books).forEach((isbn) => {
    const book = books[isbn];
    if (book.author === author) {
      const { author, ...bookWithoutAuthor } = book;
      filteredBooks.push({ isbn, ...bookWithoutAuthor });
    }
  });
  return filteredBooks;
};

const getBookByTitle = (title) => {
  const filteredBooks = [];

  Object.keys(books).forEach((isbn) => {
    const book = books[isbn];
    if (book.title === title) {
      const { title, ...bookWithoutTitle } = book;
      filteredBooks.push({ isbn, ...bookWithoutTitle });
    }
  });
  return filteredBooks;
};

module.exports.getBookByAuthor = getBookByAuthor;
module.exports.getBookByTitle = getBookByTitle;
