const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//check is the username is valid
const isValid = (username) => {
  const userswithsamename = users.filter((user) => user.username === username);
  return userswithsamename.length == 0;
};

const authenticatedUser = (username, password) => {
  const validusers = users.filter(
    (user) => user.username === username && user.password === password
  );
  return validusers.length > 0;
};

// Task 7 - Login method for registered users
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "A username and password are required" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };

    return res.status(200).json({ message: "User successfully logged in" });
  } else {
    return res
      .status(403)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Task 8 - Add a book review by ISBN
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;

  if (!review) {
    return res.status(400).json({ message: "Review is missing" });
  }

  const book = books[isbn];
  if (!book) {
    return res
      .status(404)
      .json({ message: `There are no book for ISBN ${isbn}` });
  }

  username = req.session.authorization["username"];
  books[isbn].reviews[username] = review;

  res.json({
    message: `The review for the book with ISBN ${isbn} has been added / updated.`,
  });
});

// Task 9 - Delete book review by ISBN
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  const book = books[isbn];
  if (!book) {
    return res
      .status(404)
      .json({ message: `There are no book for ISBN ${isbn}` });
  }

  username = req.session.authorization["username"];
  if (!book.reviews[username]) {
    return res.status(404).json({
      message: `There are no review for ISBN ${isbn} posted by the user ${username}`,
    });
  }

  delete books[isbn].reviews[username];
  res.json({
    message: `The reviews posted by ${username} for ISBN ${isbn} have been deleted.`,
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
