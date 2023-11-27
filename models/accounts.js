import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  products: {
    type: [String],
    default: [],
  },
});

const AccountModel = mongoose.model('Account', accountSchema);

export default AccountModel;

