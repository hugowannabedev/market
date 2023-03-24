const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    Title: {
      type: String,
      required: [true, "Title required"],
      trim: true,
    },
    Price: {
      type: Number,
      required: [true, "Price required"],
      trim: true,
    },
    Description: {
      type: String,
      required: [true, "Description required"],
    },
    Condition: {
      type: String,
      trim: [true, "Condition required"],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
