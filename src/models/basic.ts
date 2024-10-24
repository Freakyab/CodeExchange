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

export const Codes = mongoose.models.Codes || mongoose.model('codes', codeSchema);

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

export const Accounts = mongoose.models.accounts || mongoose.model('accounts', AccountSchema);