import { InferSchemaType, Schema, model, models } from "mongoose";

const ClientSchema = new Schema({
  customerType: {
    type: String,
    enum: ["Individual", "Business"],
    default: "Individual",
  },
  primaryContact: {
    type: String,
  },
  companyName: {
    type: String,
  },
  customerDisplayName: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: "INR",
  },
  customerEmail: {
    type: String,
  },
  customerPhone: {
    type: String,
  },
  customerBillingAddress: {
    type: String,
  },
  customerBillingCity: {
    type: String,
  },
  customerBillingState: {
    type: String,
  },
  customerBillingZip: {
    type: String,
  },
  customerShippingAddress: {
    type: String,
  },
  customerShippingCity: {
    type: String,
  },
  customerShippingState: {
    type: String,
  },
  customerShippingZip: {
    type: String,
  },
});

export type ClientModel = InferSchemaType<typeof ClientSchema>;

export const ClientModel = models.Client ?? model("Client", ClientSchema);
