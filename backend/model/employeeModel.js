const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true, 
  }
);

const Employeemodel = mongoose.model("Employee", employeeSchema);
module.exports = Employeemodel;
