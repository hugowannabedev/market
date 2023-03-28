function isOwner(req, res, next) {
  const { itemId } = req.params;
  Item.findById(itemId).then((foundedItem) => {
    if (req.session.currentUser._id == foundedItem.user) {
    }
  });
}
