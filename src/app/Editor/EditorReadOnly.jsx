import React, { memo, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const EditorBlock = ({ data, onChange,controls ,holder, share }) => {

  useEffect(() => {
    const editor = new EditorJS({
      tools: {
        ...EDITOR_TOOLS,
      },
      holder: holder,
      placeholder: "Let's write an awesome blog!",
      data: data,
      autofocus: false,
      onChange: async (api, event) => {
        if(event.type === 'block-changed'|| event.type === 'block-added' || event.type === 'block-deleted'){
          controls.setRealTime(true);
        }
        const savedData = await api.saver.save();
          socket.emit('update', savedData, share);
      }
    });
    
    return () => {
      editor.isReady.then(() => {
        editor.destroy();
      });
    };
  }, [data, holder, share]);

  return <div id={holder} className="bg-white" />;
};

export default memo(EditorBlock);
