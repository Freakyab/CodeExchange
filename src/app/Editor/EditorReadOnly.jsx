import React, { memo, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";

const EditorBlock = ({ data, holder,onChange, share }) => {
  useEffect(() => {
    const sendData = async (content) => {
      try {
        const res = await fetch("https://code-exchange-backend.vercel.app/create/", {
          method: "POST",
          body: JSON.stringify({
            code: content, // Use a different variable name here to avoid conflicts
            share: share,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await res.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };
      const editor = new EditorJS({
        tools: {
          ...EDITOR_TOOLS,
        },
        holder: holder,
        placeholder: "Let's write an awesome blog!",
        data: data,
        autofocus: true,
        onChange: async (api, event) => {
          const savedData = await api.saver.save();
          // control.setUpdateCode(savedData);
          sendData(savedData);
        }
      });
    return () => {
      editor.isReady.then(() => {
        editor.destroy();
      });
    };
  }, [data, holder, onChange, share]);
  

  return <div id={holder} className="bg-white" />;
};

export default memo(EditorBlock);
