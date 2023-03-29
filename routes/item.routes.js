const express = require("express");
const Item = require("../models/Item.model");
const User = require("../models/User.model");
const isUserLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require("../config/cloudinary.config");
const router = express.Router();

// List of items
router.get("/item", (req, res, next) => {
  Item.find()
    .populate("user")
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
      email: req.body.email,
      image: req.file.path,
      user: req.session.currentUser._id,
    };

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
      if (req.session.currentUser._id === foundedItem.user.toString()) {
        res.render("item/edit-item.hbs", foundedItem);
      }
      else { //befor we didn't had the else condition
        res.render("/item");
      }  
    })
    .catch((error) => next(error));
});

// //UPDATE: process form
router.post(
  "/item/:itemId/edit",
  isUserLoggedIn,
  fileUploader.single("image"),
  (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    const { itemId } = req.params;
    const { title, description, price, condition, email } = req.body;
    const image = req.file.path;

    Item.findByIdAndUpdate(
      itemId,
      { title, description, image, price, condition, email },
      { new: true }
    )
      .then((updateItem) => {
        res.redirect("/item");
      })
      .catch((error) => next(error));
  }
);

//DELETE
router.post("/item/:itemId/delete", isUserLoggedIn, (req, res, next) => {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)
    .then(() => res.redirect("/item"))
    .catch((error) => next(error));
});

//item details
router.get("/item/:itemId", isUserLoggedIn, (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .populate("user")
    .then((itemDetails) => {
      res.render("item/item-details", itemDetails);
    })
    .catch((e) => {
      console.log("error getting item details from DB", e);
      next(e);
    });
});

module.exports = router;
