import { InferSchemaType, Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  itemType: {
    type: String,
    enum: ["Product", "Service"],
    default: "Product",
  },
  itemName: {
    type: String,
    required: true,
  },
  itemUnit: {
    type: String,
  },
  itemSellingPrice: {
    type: Number,
  },
  itemDescription: {
    type: String,
  },
});

export type ItemModel = InferSchemaType<typeof ItemSchema>;

export const ItemModel = models.Item ?? model("Item", ItemSchema);
