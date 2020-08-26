const mongoose = require("mongoose");

const { Schema } = mongoose;

const problemSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },

  userEmail: {
    type: String,
    required: true,
  },
});
const problems = mongoose.model("problem", problemSchema);
module.exports = problems;
