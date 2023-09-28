"use client";
import { useState, useEffect } from "react";
import { useUser } from "./context/session";
import Navbar from "./assets/navbar";
import Login from "./loginPage";
import { useRouter } from "next/navigation";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [sessionKey, setSessionKey] = useState("");
  const [displayLogin, setDisplayLogin] = useState(false);
  const [isSession, setIsSession] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (keyword) {
      router.push("/share/" + keyword);
    } else {
      alert("Please enter a keyword");
    }
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (sessionKey) {
      router.push("/account/" + sessionKey);
    } else {
      alert("Please enter a keyword");
    }
  };

  useEffect(() => {
    if (user) {
      setIsSession(true);
    } else {
      setIsSession(false);
    }
  }, [user]);

  return (
    <>
      <main
        className="flex flex-col mt-10 py-20 items-center justify-center min-h-screen"
        style={{
          backgroundImage: `linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)`,
        }}>
        {displayLogin ? <Login setDisplayLogin={setDisplayLogin} /> : null}
        <Navbar displayLogin={displayLogin} setDisplayLogin={setDisplayLogin} />
        <h1 className="text-4xl font-bold mb-10 py-1 px-2 capitalize link link-underline ">
          Welcome to CodeExchange
        </h1>
        <p className="w-full overflow-x-auto text-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-4 pt-6 md:pb-6 md:pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by adding a keyword to{" "}
          <code className="font-mono font-bold ">
            "https://codeexchange.vercel.app/share/yourkeyword"
          </code>{" "}
          in the URL
        </p>
        <div className="mt-4 py-5">
          <h2
            className="text-xl font-semibold py-1 px-2 link link-underline w-fit"
            title="This is a local space, anyone can access this space">
            Enter your Keyword here
          </h2>
          <div className="flex flex-col lg:flex-row">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row">
                <input
                  type="text"
                  className="lg:rounded-l-lg p-2 bg-zinc-800/30 border-black border text-white outline-none mb-2 lg:mb-0"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  className="lg:rounded-r-lg bg-blue-500 border-black border hover:bg-blue-600 px-4 py-2 text-white">
                  Get to page
                </button>
              </div>
            </form>
          </div>
          {isSession ? (
            <>
              <h2
                className="text-xl font-semibold pt-3 py-1 px-2 link link-underline w-fit"
                title="This is a secure space, only you can access this space">
                Enter your Keyword here
              </h2>
              <div className="flex flex-col lg:flex-row">
                <form onSubmit={handleAccountSubmit}>
                  <div className="flex flex-col lg:flex-row">
                    <input
                      type="text"
                      className="lg:rounded-l-lg p-2 bg-zinc-800/30 border-black border text-white outline-none mb-2 lg:mb-0 "
                      value={sessionKey}
                      onChange={(e) => setSessionKey(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="lg:rounded-r-lg bg-blue-500 border-black border hover:bg-blue-600 px-4 py-2 text-white">
                      Get to page
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : null}
        </div>

        <div className="my-8 grid gap-8 lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left">
          <a
            href="https://github.com/Freakyab/CodeExchange"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer">
            <h2 className="mb-3 text-2xl font-semibold ">
              Current version{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="max-w-[30ch] text-sm opacity-70">
              CodeExchange version{" "}
              <code className="font-mono font-bold">1.7</code>, with new
              features and improvements to enhance the user experience.
            </p>
          </a>

          <a
            href="https://github.com/Freakyab/CodeExchange"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer">
            <h2 className="mb-3 text-2xl font-semibold">
              Copy to Clipboard{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="max-w-[30ch] text-sm opacity-70">
              With a simple click, you can easily copy code snippets to your
              clipboard.
            </p>
          </a>

          <a
            href="https://github.com/Freakyab/CodeExchange"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer">
            <h2 className="mb-3 text-2xl font-semibold">
              Download Code{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="max-w-[30ch] text-sm opacity-70">
              This feature allows you to save code for offline use or future
              reference.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
