const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum : [
        "New", "Used", "Vintage", "Destroyed", "In Need of Restoration"
      ]
  
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
