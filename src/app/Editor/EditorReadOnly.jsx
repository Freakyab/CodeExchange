import React, { memo, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";

const EditorBlock = ({ data, toggle, account, holder, onChange, share,_id }) => {
  useEffect(() => {
    const sendData = async (content) => {
      if (account) {
        try {
          // const res = await fetch("http://localhost:5000/accountCreate/", {
          const res = await fetch( "https://code-exchange-backend.vercel.app/accountCreate/",{
              method: "POST",
              body: JSON.stringify({
                code: content, // Use a different variable name here to avoid conflicts
              account: account,
              _id : _id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const responseData = await res.json();
          if(!responseData.isSuccess){
            alert(responseData.message)
          }
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        try {
          const res = await fetch("http://localhost:5000/code/create/", {
          // const res = await fetch(
          //   "https://code-exchange-backend.vercel.app/create/",
          //   {
              method: "POST",
              body: JSON.stringify({
                code: content, // Use a different variable name here to avoid conflicts
                share: share,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const responseData = await res.json();
          console.log(responseData);
        } catch (error) {
          console.error("Error sending data:", error);
        }
      }
    };
    const editor = new EditorJS({
      tools: {
        ...EDITOR_TOOLS,
      },
      readOnly: toggle,
      holder: holder,
      placeholder: "Let's write an awesome blog!",
      data: data,
      autofocus: toggle ? false : true,
      onChange: async (api, event) => {
        const savedData = await api.saver.save();
        // controls.setSelfText(true);
        sendData(savedData);
      },
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
