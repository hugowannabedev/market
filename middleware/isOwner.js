const Item= require("../models/Item.model");
function isOwner(req, res, next) {
  const { itemId } = req.params;
  Item.findById(itemId)
    .then((foundedItem) => {
      if (req.session.currentUser._id === foundedItem.user.toString()) {
        next();
      } 
    })
    .catch((error) => {
      res.render("/item");
    });
}
module.exports = isOwner;