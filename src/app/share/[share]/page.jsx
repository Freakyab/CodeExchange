"use client";
const EditorBlock = dynamic(() => import("../../Editor/EditorReadOnly"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { BsFillClipboardFill, BsDownload } from "react-icons/bs";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../Home.module.css"; // Import CSS module for local styles
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const CodePage = ({ params }) => {
  const { share } = params;
  const [code, setCode] = useState("");
  const [realTime, setRealTime] = useState(false);
  const textInputRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("get", share);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    const handleGetContent = (code) => {
      setCode(code);
    };

    const handleUpdateContent = (content) => {
      if (!realTime) {
        setCode(content);
      }
    };

    socket.on("update", handleUpdateContent);
    socket.on("get", handleGetContent);

    setTimeout(() => {
      setRealTime(false);
    }, 1000);

    return () => {
      socket.off("get", handleGetContent); // Remove event listener on unmount
      socket.off("update", handleUpdateContent); // Remove event listener on unmount
    };
  }, [code, share, realTime]);

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
    <div className={styles.fancyBackground}>
      <div className="bg-white rounded-lg shadow-2xl m-4 w-[70vw]">
        <div className="bg-gray-700 text-white py-4 px-6 rounded-t-lg flex justify-between">
          <h1 className="text-xl font-semibold">CodeExchange</h1>
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
            data={code}
            controls={{ realTime, setRealTime }}
            onChange={setCode}
            holder="editorjs-container"
            share={params.share}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CodePage;
