"use server";

import connectDB from "@/database/connect";
import { Account, Code } from "@/models/basic";

export async function fetchBasicEditorData({ id }: { id: string }) {
  try {
    await connectDB();
    const EditorBlock = await Code.find();
    const allAccounts = await Account.find();
    console.log(allAccounts,"allAccounts");
    // console.log(EditorBlock);
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
