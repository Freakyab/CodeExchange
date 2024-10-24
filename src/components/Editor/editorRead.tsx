"use client";
import React, { useEffect } from "react";
import EditorJS, { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./editorTools";

const EditorBlock = ({ data, holder }: { data: any; holder: string }) => {
  useEffect(() => {
    const editor = new EditorJS({
      tools: EDITOR_TOOLS as unknown as {
        [toolName: string]: ToolConstructable | ToolSettings;
      },
      //   readOnly: toggle,
      //   holder: holder,
      placeholder: "Let's write an awesome blog!",
      data: data,
      //   autofocus: toggle ? false : true,
      onChange: async (api, event) => {
        const savedData = await api.saver.save();
        // controls.setSelfText(true);
        //   sendData(savedData);
      },
    });
    return () => {
      editor.isReady.then(() => {
        editor.destroy();
      });
    };
  }, [data, holder]);
  //   }, [data, toggle, holder]);

  return <div id={holder} className="bg-white" />;
};

export default EditorBlock;