import mongoose from 'mongoose';


const sessionSchema = new mongoose.Schema({
  session_token: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});


const Session = mongoose.model('Session', sessionSchema);


export default Session;