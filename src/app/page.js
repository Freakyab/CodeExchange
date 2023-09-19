"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const originalText =
    "Crreate your personal code space by adding<br /><strong>http://localhost:3000/share/[your keyword]</strong> to the URL";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < originalText.length-1) {
        setTypedText((prevText) => prevText + originalText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // Adjust the typing speed (interval) as needed
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your Personal Code Space
        </h1>
        <p
          className="text-lg text-gray-600"
          dangerouslySetInnerHTML={{ __html: typedText }}
        ></p>
      </div>
    </main>
  );
}
