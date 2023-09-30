"use client";
const EditorBlock = dynamic(() => import("../../Editor/EditorReadOnly"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import styles from "../../Home.module.css"; // Import CSS module for local styles
import { BsFillClipboardFill, BsDownload } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../assets/loader";

import "react-toastify/dist/ReactToastify.css";

const CodePage = ({ params }) => {
  const [code, setCode] = useState("");
  const [displayLoader, setDisplayLoader] = useState(true);
  const router = useRouter();
  const textInputRef = useRef(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("https://code-exchange-backend.vercel.app/get", {
      // const res = await fetch("http://localhost:5000/get", {
      method: "POST",
      body: JSON.stringify({
        share: params.share,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDisplayLoader(false);
    console.log(data);
    if (data.isSuccess) setCode(data.code);
  };

  const handleCopy = () => {
    if (textInputRef.current) {
      const range = document.createRange();
      range.selectNodeContents(textInputRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      toast.success("Copied to clipboard");
    }
  };
  const handleDownload = () => {
    if (textInputRef.current) {
      const range = document.createRange();
      range.selectNodeContents(textInputRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      const selectedText = selection.toString();
      const blob = new Blob([selectedText], { type: "text/plain" });

      // Create a temporary URL and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "selected_text.txt"; // Set the filename
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <>
      {displayLoader ? (
        <Loader />
      ) : (
        <div className={styles.fancyBackground}>
          <div className="bg-white rounded-lg shadow-2xl m-4 w-[70vw]">
            <div className="bg-gray-700 text-white py-4 px-6 rounded-t-lg flex justify-between">
              <h1
                className="text-xl font-semibold cursor-pointer"
                onClick={() => router.push("/")}>
                CodeExchange
              </h1>
              <div>
                <button onClick={handleCopy} className="px-4">
                  <BsFillClipboardFill size={20} />
                </button>
                <button onClick={handleDownload}>
                  <BsDownload size={20} />
                </button>
              </div>
            </div>
            <div ref={textInputRef}>
              <EditorBlock
                toggle={false}
                account={false}
                data={code}
                onChange={setCode}
                holder="editorjs-container"
                share={params.share}
              />
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default CodePage;
