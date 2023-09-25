"use client";
const EditorBlock = dynamic(() => import("../../Editor/EditorReadOnly"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import styles from "../../Home.module.css"; // Import CSS module for local styles
import { BsFillClipboardFill, BsDownload } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../assets/loader";

import "react-toastify/dist/ReactToastify.css";

const CodePage = ({ params }) => {
  const [code, setCode] = useState("");
  const [displayLoader, setDisplayLoader] = useState(true);
  const [id, setId] = useState("");
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();

  const textInputRef = useRef(null);
  useEffect(() => {
    if (session) {
      setId(session.user.id);
    }
    getData();
  }, [session, id]);

  const getData = async () => {
    // const res = await fetch("https://code-exchange-backend.vercel.app/get", {
    const res = await fetch("http://localhost:5000/accountGet", {
      method: "POST",
      body: JSON.stringify({
        account: params.account,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!data.isSuccess) {
      setToggle(false);
    } else {
      setCode(data.code);
      if (id === data._id) {
        setToggle(false);
      } else {
        setToggle(true);
      }
    }

    setDisplayLoader(false);
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
                className="text-xl font-semibold"
                onClick={() =>
                  (window.location.href = "http://localhost:3000/")
                }>
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
                key={toggle}
                toggle={toggle}
                account={params.account}
                data={code}
                onChange={setCode}
                holder="editorjs-container"
                _id={id}
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
