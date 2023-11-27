import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transaction_code: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const UserTransactionsSchema = new mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
  },
  transaction_count: {
    type: Number,
    required: true,
  },
  bucket_start_date: {
    type: Date,
    required: true,
  },
  bucket_end_date: {
    type: Date,
    required: true,
  },
  transactions: [transactionSchema],
});

const Usertransactions = mongoose.model('Usertransactions', UserTransactionsSchema);

export default Usertransactions