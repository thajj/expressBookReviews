const express = require("express");
let books = require("./booksdb.js");
const { getBookByAuthor, getBookByTitle } = require("./books_helper.js");
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

// Task 1 - Get the book list available in the shop synchronously
public_users.get("/", function (req, res) {
  return res.json({ books: books });
});

// Task 2 - Get the book details based on ISBN synchronously
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const result = books[isbn];
  if (result) {
    return res.json(result);
  }
  return res
    .status(404)
    .json({ message: `There are no details available for ISBN : ${isbn}` });
});

// Task 3 - Get book details based on author synchronously
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const filteredBooks = getBookByAuthor(author);

  if (filteredBooks.length > 0) {
    return res.json({ bookbyauthor: filteredBooks });
  }
  return res.status(404).json({
    message: `No book available for the author : ${author}`,
  });
});

// Task 4 - Get all books based on title synchronously
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const filteredBooks = getBookByTitle(title);
  if (filteredBooks.length > 0) {
    return res.json({ bookbytitle: filteredBooks });
  }
  return res.status(404).json({
    message: `No book available for the title : ${title}`,
  });
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
