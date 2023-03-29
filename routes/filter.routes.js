// const express = require("express");
// const Item = require("../models/Item.model");
// const User = require("../models/User.model");
// const isUserLoggedIn = require("../middleware/isLoggedIn");
// const fileUploader = require("../config/cloudinary.config");
// const router = express.Router();

// router.get("/item", (req, res, next) => {
//   Item.find()
//     .then((itemArr) => {
//       const data = {
//         item: itemArr,
//       };

//       res.render("item/clothes", data);
//     })
//     .catch((e) => {
//       console.log(e);
//       next(e);
//     });
// });

// module.exports = router;
