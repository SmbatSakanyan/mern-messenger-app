const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: [String],
  conversations: [
    {
      conversationId: Schema.Types.ObjectId,
      lastMessageRead: Number
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;