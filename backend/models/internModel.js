const mongoose = require("mongoose")

const Schema = mongoose.Schema

const internSchema = new Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    school: {
      type: String,
    },
    major: {
      type: String,
    },
    year: {
      type: Number,
    },
    softwareTools: {
      type: Array,
    },
    trainingDates: {
      type: String,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    credit: {
      type: String,
    },
    image: String,
    cv: String,
    portfolio: String,
  },

  { timestamps: true }
)

module.exports = mongoose.model("Intern", internSchema)
