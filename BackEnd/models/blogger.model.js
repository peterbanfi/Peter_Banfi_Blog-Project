const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  text: {
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
BlogSchema.method({})

// Static Methods
BlogSchema.static({})

module.exports = mongoose.model('Blog', BlogSchema)