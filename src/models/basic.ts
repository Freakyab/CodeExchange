import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
     code: {
          type: Object,
          required: true
     },
     share: {
          type: String,
          required: true
     },
});

export const Code = mongoose.models.code || mongoose.model('code', codeSchema);

const AccountSchema = new mongoose.Schema({
     username: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     },
     name: {
          type: String,
          required: true
     }
});

export const Account = mongoose.models.account || mongoose.model('account', AccountSchema);