const express = require("express");
const Item = require("../models/Item.model");
const isUserLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

// List of items
router.get('/item', (req, res, next) => {
  Item.find()
    .then((itemArr) => {
      
      const data = {
        item: itemArr,
      };
      
      res.render("item/item-list", data);
    })
    .catch((e) => {
      console.log(e);
      next(e);
    });
});

router.post("/item", isUserLoggedIn, (req, res, next) => {
  const bookDetails = {
    Title: req.body.Title,
    Price: req.body.Price,
    Description: req.body.Description,
    Condition: req.body.Condition,
  };

  Item.create(itemDetails)
    .then(() => {
      res.redirect("/item");
    })
    .catch((e) => {
      console.log(e);
      next(e);
    });
});


// Create a new item 
router.get("/create", (req, res, next) => {
  res.render("item/create-item");
});

/*router.get("/create", isUserLoggedIn, (req, res, next) => {
  User.find()
    .then((userArr) => {
      
      const data = {
        users: userArr,
      };

      res.render("/item/create-item", data);
    })
    .catch((e) => {
      console.log(e);
      next(e);
    });
});*/



module.exports = router;
