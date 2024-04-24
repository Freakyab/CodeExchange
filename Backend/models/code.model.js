const mongoose = require("mongoose");
const client = require("../config/connect");

const codeSchema = new mongoose.Schema(
  {
    code: {
      type: Object,
      required: true,
    },
    share: {
      type: String,
      required: true,
    },
    flag: {
      type: Boolean,
      required: true,
    },
    waitingList: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Code = client.model("Code", codeSchema);

module.exports = Code;
