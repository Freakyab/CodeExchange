"use client";
const EditorBlock = dynamic(() => import("../../Editor/EditorReadOnly"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styles from "../../Home.module.css"; // Import CSS module for local styles
import "react-toastify/dist/ReactToastify.css";

const CodePage = ({ params }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("https://code-exchange-backend.vercel.app/get", {
      method: "POST",
      body: JSON.stringify({
        share: params.share,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.isSuccess) setCode(data.code);
    
  };

  return (
    <div className={styles.fancyBackground}>
      <div className="bg-white rounded-lg shadow-2xl m-4 md:w-3/5 lg:w-[50vw] xl:w-[60vw]">
        <div className="bg-gray-700 text-white py-4 px-6 rounded-t-lg flex justify-between">
          <h1 className="text-xl font-semibold">Blogger's Editor</h1>
          <button
            className="text-xl text-black bg-white font-semibold cursor-pointer hover:bg-gray-300 px-4 rounded-lg">
            HELLO,
          </button>
        </div>
        <div>
          <EditorBlock
            data={code}
            
            onChange={setCode}
            holder="editorjs-container"
            share={params.share}
          />
        </div>
      </div>
     
    </div>
  );
};

export default CodePage;
