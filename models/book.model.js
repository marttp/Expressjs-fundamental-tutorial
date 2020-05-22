const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const collectionName = 'books';
const model = mongoose.model(collectionName, bookSchema, collectionName);

module.exports = model;
