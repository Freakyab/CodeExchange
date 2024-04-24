const mongoose = require("mongoose");
const client = require("../config/connect");

const premiumUserSchema = new mongoose.Schema(
  {
    code: {
      type: Object,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Premium = client.model("PremiumUser", premiumUserSchema);

module.exports = Premium;
