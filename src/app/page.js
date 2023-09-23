"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [keyword, setKeyword] = useState("");
  const originalText =
    "Create your personal code space by adding<br /><strong>https://codeexchange.vercel.app/share/your keyword</strong> to the URL";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < originalText.length - 1) {
        setTypedText((prevText) => prevText + originalText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // Adjust the typing speed (interval) as needed
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="dark-bg flex min-h-screen flex-col items-center text-black justify-between p-24">
      <div className="text-center flex flex-col">
        <h1 className="text-4xl font-bold  mb-4">
          Welcome to Your Personal Code Space
        </h1>
        <p
          className="text-lg text-gray-400"
          dangerouslySetInnerHTML={{ __html: typedText }}></p>
        <div className="mt-4 justify-center">
          <h2 className="text-xl font-semibold ">Enter your Keyword here</h2>
            
              <input
                type="text"
                className="rounded-l-lg p-2 bg-gray-800  text-white outline-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                className="rounded-r-lg bg-blue-500 hover:bg-blue-600  px-4 py-2"
                onClick={() => {
                  if(keyword)
                  window.location.href =
                    "https://codeexchange.vercel.app/share/" + keyword;
                  else{
                    alert("Please enter a keyword")
                  }
                }}>
                Get to page
              </button>
            </div>
          </div>
    </main>
  );
}
