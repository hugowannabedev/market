const express = require("express");
const Item = require("../models/Item.model");
const User = require("../models/User.model");
const isUserLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require("../config/cloudinary.config");
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

// Create a new item

router.get("/item/create", isUserLoggedIn, (req, res, next) => {
  Item.find()
    .then(() => {
      res.render("item/create-item.hbs");
    })
    .catch((e) => {
      console.log(e);
      next(e);
    });
});

router.post(
  "/item/create",
  isUserLoggedIn,
  fileUploader.single("image"),
  (req, res, next) => {
    const itemDetails = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      condition: req.body.condition,
      image: req.body.image,
      email: req.body.email,
    };
    console.log(req.body);
    Item.create(itemDetails)
      .then((itemFromDB) => {
        res.redirect("/item");
      })
      .catch((e) => {
        console.log("error adding new item", e);
        next(e);
      });
  }
);

//Update

router.get("/item/:itemId/edit", isUserLoggedIn, (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .then((foundedItem) => {
      res.render("item/edit-item", foundedItem);
    })
    .catch((error) => next(error));
});

// //UPDATE: process form
router.post("/item/:itemId/edit", isUserLoggedIn, (req, res, next) => {
  const { itemId } = req.params;
  const { title, description, price, image, condition } = req.body;

  Item.findByIdAndUpdate(
    itemId,
    { title, description, price, image, condition },
    { new: true }
  )
    .then((updateItem) => {
      console.log(updateItem);
      res.redirect("/item");
    })
    .catch((error) => next(error));
});

//DELETE
router.post("/item/:itemId/delete", isUserLoggedIn, (req, res, next) => {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)
    .then(() => res.redirect("/item"))
    .catch((error) => next(error));
});

module.exports = router;

//item details
router.get("/item/:itemId", isUserLoggedIn, (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .then((itemDetails) => {
      res.render("item/item-details", itemDetails);
    })
    .catch((e) => {
      console.log("error getting item details from DB", e);
      next(e);
    });
});
