"use server";
import { connectToMongoDB } from "@/lib/db";
import { Codes } from "@/models/basic";

export async function fetchBasicEditorData({ id }: { id: string }) {
  try {
    await connectToMongoDB();
    const EditorBlock = await Codes.findOne({ share: id });
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

export async function updateBasicEditorData({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    await connectToMongoDB();
    const findEditorBlock = await Codes.findOne({ share: id });

    let EditorBlock;

    if (!findEditorBlock) {
      EditorBlock = new Codes({
        code: data,
        share: id,
      });
      await EditorBlock.save();
    } else {
      if (data.blocks.length === 0) {
        await Codes.deleteOne({ share: id });
      }
      EditorBlock = await Codes.findOneAndUpdate(
        { share: id },
        {
          $set: {
            code: data,
          },
        }
      );
    }
    if (EditorBlock) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (e) {
    console.log(e, "error");
    return { success: false };
  }
}
