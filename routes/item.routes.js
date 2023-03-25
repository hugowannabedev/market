const express = require("express");
const Item = require("../models/Item.model");
const isUserLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

//GET
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

//Display

router.get("./item/create", isUserLoggedIn, (req, res, next) => {
  User.find()
    .then((itemArr) => {
      
      const data = {
        user: itemArr,
      };

      res.render("./item/item-create", data);
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

module.exports = router;
