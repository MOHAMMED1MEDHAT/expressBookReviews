const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let availbleBooks=[]
  for(book in books){
    availbleBooks.push(books[book].title);
  }
  return res.status(200).json(availbleBooks);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN=req.params.isbn
  const book=books[ISBN];
  return res.status(200).json(book);
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author=req.params.author
  for(book in books){
    if(books[book].author===author){
      return res.status(200).json(books[book]);
    }
  }
  return res.status(404).json({message:"not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title=req.params.title
  for(book in books){
    if(books[book].title===title){
      return res.status(200).json(books[book]);
    }
  }
  return res.status(404).json({message:"not found"});});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const ISBN=req.params.isbn
  const book=books[ISBN].reviews;
  return res.status(200).json(book);
});

module.exports.general = public_users;
