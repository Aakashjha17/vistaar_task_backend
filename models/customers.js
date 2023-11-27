import mongoose from "mongoose";

const tierDetailsSchema = new mongoose.Schema({
  tier: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  benefits: {
    type: [String],
    default: [],
  },
});

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  accounts: {
    type: [Number],
    default: [],
  },
  tier_and_details: {
    type: Map,
    of: tierDetailsSchema,
    default: {},
  },
});

const CustomerModel = mongoose.model('Customer', customerSchema);

export default CustomerModel;