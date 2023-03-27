const express = require("express");
const Item = require("../models/Item.model");
const isUserLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

// List of items
router.get("/item", (req, res, next) => {
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
  const itemDetails = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    condition: req.body.condition,
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

// router.get("/create", (req, res, next) => {
//   .then(() => {
//   res.render("item/create-item")
//   ;})

router.get("/create", isUserLoggedIn, (req, res, next) => {
  Item.find()
    .then(() => {
      res.render("item/create-item.hbs");
    })
    .catch((e) => {
      console.log(e);
      next(e);
    });
});

router.post("/create", isUserLoggedIn, (req, res, next) => {
  const itemDetails = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    condition: req.body.condition,
    image: req.body.image,
  };

  Item.create(itemDetails)
    .then((itemFromDB) => {
      res.redirect("/item");
    })
    .catch((e) => {
      console.log("error adding new item", e);
      next(e);
    });
});

module.exports = router;
