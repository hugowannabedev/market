const Item= require("../models/Item.model");
function isOwner(req, res, next) {
  const { itemId } = req.params;
  Item.findById(itemId)
    .then((foundedItem) => {
      if (req.session.currentUser && req.session.currentUser._id === foundedItem.user.toString()) {
        res.locals.isOwner = true;
        next();

      } else {
        res.locals.isOwner = false;
        next();
      }
    })
    .catch((error) => {
      res.render("error", {error});
      /* res.render("/item"); */
    });
}


module.exports = isOwner;