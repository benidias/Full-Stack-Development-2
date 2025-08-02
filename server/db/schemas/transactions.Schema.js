import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  agentId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
    ref: 'employees'
  }
});
const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction;