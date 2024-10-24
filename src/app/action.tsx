"use server";

import connectDB from "@/database/connect";
import { Accounts, Codes } from "@/models/basic";

export async function fetchBasicEditorData({ id }: { id: string }) {
  try {
    await connectDB();
    const EditorBlock = await Codes.findOne();
    const allAccounts = await Accounts.find();
    console.log(allAccounts.length);
    console.log(EditorBlock.length);
    if (EditorBlock) {
      return { data: EditorBlock, success: true };
    } else {
      return { data: null, success: false };
    }
  } catch (e) {
    console.log(e);
    return { data: null, success: false };
  }
}
