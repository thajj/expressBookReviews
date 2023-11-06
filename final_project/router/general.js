const express = require("express");
let books = require("./booksdb.js");
const {
  getBooks,
  getBookByAuthor,
  getBookByTitle,
  getBookByISBN,
} = require("./books_helper.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6 - Register new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({ username: username, password: password });
      return res.json({
        message: "Customer successfully registered. Now you can login",
      });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res
    .status(404)
    .json({ message: "A username and password are required." });
});

// Task 10 - Task Get the book list available in the shop asynchronously
public_users.get("/", function (req, res) {
  getBooks()
    .then((result) => res.json({ books: result }))
    .catch((error) => res.status(500).json({ error }));
});

// Task 11 - Get the book details based on ISBN asynchronously
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  getBookByISBN(isbn)
    .then((result) => res.json(result))
    .catch((error) => res.status(error.code).json(error.message));
});

// Task 12 - Get book details based on author asynchronously
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  getBookByAuthor(author)
    .then((result) => res.json({ bookbyauthor: result }))
    .catch((error) => res.status(500).json({ error }));
});

// Task 13 - Get all books based on title asynchronously
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  getBookByTitle(title)
    .then((result) => res.json({ bookbytitle: result }))
    .catch((error) => res.status(500).json({ error }));
});

// Task 5 - Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const result = books[isbn];
  if (result) {
    return res.json(result.reviews);
  }
  return res
    .status(404)
    .json({ message: `There are no book for ISBN : ${isbn}` });
});

module.exports.general = public_users;
