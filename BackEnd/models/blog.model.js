const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  /* id: {
     type: mongoose.Schema.Types.ObjectId,
     default: new mongoose.Types.ObjectId()
   },*/
  userName: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Methods
PostSchema.method({})

// Static Methods
PostSchema.static({})

module.exports = mongoose.model('Post', PostSchema)