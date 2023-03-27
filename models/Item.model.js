const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    title: {
      type: String,
      // required: [true, "Title required"],
      trim: true,
    },
    price: {
      type: Number,
      // required: [true, "Price required"],
      trim: true,
    },
    description: {
      type: String,
      // required: [true, "Description required"],
    },
    condition: {
      type: String,
      // required: [true, "Condition required"],
      trim: true,
    },
    image: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
