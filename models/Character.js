import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: String,
  type: String,
  trait: String,
  hitpoints: {
    type: Number,
    default: 100
  }
});

export default mongoose.model('Character', characterSchema);