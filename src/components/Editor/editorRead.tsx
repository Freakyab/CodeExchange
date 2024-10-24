"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS, { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./editorTools";
import { updateBasicEditorData } from "@/app/action";

const EditorBlock = ({
  data,
  holder,
  className = "",
  type = "basic",
  isUpdated,
  setIsUpdated,
  editorId,
}: {
  data: any;
  holder: string;
  className?: string;
  type?: string;
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  editorId: string;
}) => {
  const editorInstanceRef = useRef<EditorJS | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set the isMounted flag to true when the component mounts
    setIsMounted(true);

    if (isMounted && !editorInstanceRef.current) {
      const editor = new EditorJS({
        tools: EDITOR_TOOLS as unknown as {
          [toolName: string]: ToolConstructable | ToolSettings;
        },
        holder, // Pass the holder ID
        placeholder: "Let's write an awesome blog!",
        data: data,
        onChange: async (api) => {
          const savedData = await api.saver.save();
          if (type === "basic") {
            console.log("Saving data", savedData);
            setIsUpdated(true);
            await updateBasicEditorData({ id: editorId, data: savedData });
            setIsUpdated(false);
          }
        },
      });

      editorInstanceRef.current = editor;

      return () => {
        if (editorInstanceRef.current) {
          editorInstanceRef.current.isReady.then(() => {
            editorInstanceRef.current?.destroy();
            editorInstanceRef.current = null;
          });
        }
      };
    }
  }, [isMounted, data, holder, editorInstanceRef]);

  return (
    <>
      {/* Ensure the holder div is rendered before initializing EditorJS */}
      <div id={holder} className={className} />
    </>
  );
};

export default EditorBlock;
