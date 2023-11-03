"use client";
import { useState, useEffect } from "react";
import { useUser } from "../context/session";
import Navbar from "../components/navbar";
import { AiOutlineShareAlt, AiTwotoneEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import statements...

const Dashboard = () => {
  const [url, setUrl] = useState([]);
  const [newSnippetKeyword, setNewSnippetKeyword] = useState("");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetch("https://code-exchange-backend.vercel.app/getCodeSpace", {
        // fetch("http://localhost:5000/getCodeSpace", {
        method: "POST",
        body: JSON.stringify({
          owner: user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isSuccess) {
            setUrl(data.keywords);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleCreateSnippet = () => {
    router.push(`/account/${newSnippetKeyword}`);
  };

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col mt-10 py-10 md:py-20 items-center min-h-screen"
        style={{
          backgroundImage: `linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)`,
        }}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-700 ">
          Hello, <span className="link link-underline px-2">{user?.name}</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-8 py-2 px-2 text-gray-700">
          Welcome to the dashboard. Your code snippets are here:
        </p>

        <div className="grid gap-4 w-[90vw] md:w-3/4 lg:w-1/2 xl:w-1/3">
          {/* Create New Code Snippet Section */}
          <div className="flex flex-col gap-4">
            {/* Keyword Input */}
            <input
              type="text"
              placeholder="Enter keyword"
              value={newSnippetKeyword}
              onChange={(e) => setNewSnippetKeyword(e.target.value)}
              className="lg:rounded-l-lg px-4 py-3 bg-zinc-800 border-black border text-white outline-none mb-2 lg:mb-0"
            />

            {/* Create New Code Snippet Button */}
            <button
              onClick={handleCreateSnippet}
              className="capitalize rounded-lg border border-black px-6 py-4 transition-all duration-300 ease-in-out transform hover:shadow-md hover:bg-blue-500 hover:border-blue-700 hover:text-white w-full">
              Create New Code Snippet
            </button>
          </div>

          <p className="text-3xl md:text-4xl lg:text-4xl mb-3 font-bold mt-4 text-gray-700 link link-underline py-2 w-fit ">
            Code Snippet
          </p>
          {/* Existing Code Snippets */}
          {url.map((item, index) => (
            <div
              key={index}
              className="flex capitalize justify-between items-center bg-gray-800 text-white rounded-lg border border-transparent px-6 py-4 transition-all duration-300 ease-in-out transform hover:shadow-md hover:bg-gray-100 hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 w-full">
              <h2 className="mb-3 text-lg md:text-xl lg:text-2xl font-semibold">
                {item}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <span>
                <button
                  className="transition-all py-1 px-2 duration-300 ease-in-out transform hover:scale-110 hover:text-black"
                  onClick={() => {
                    router.push(`/account/${item}`);
                  }}>
                  <AiTwotoneEdit className="text-2xl" />
                </button>
                <button
                  className="transition-all py-1 px-2 duration-300 ease-in-out transform hover:scale-110 hover:text-black"
                  onClick={() => {
                    toast.success("Copied to clipboard");
                    navigator.clipboard.writeText(
                      `http://codeexchange.vercel.app/account/${item}`
                    );
                  }}>
                  <AiOutlineShareAlt className="text-2xl" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
