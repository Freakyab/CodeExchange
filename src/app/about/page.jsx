import React from "react";
import Navbar from "../components/navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center mt-16">
        <div className="min-w-screen p-8 bg-white shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-4 link link-underline w-fit">
            Welcome to CodeExchange
          </h1>
          <p className="text-gray-600 mb-8 ml-2">
            CodeExchange is your go-to platform for sharing and storing code
            online forever.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold link link-underline w-fit mb-4">
              About CodeExchange
            </h2>
            <p className="text-gray-600 ml-2">
              At CodeExchange, we believe in the power of collaboration and the
              importance of preserving code for the future. Whether you're a
              developer looking to share your expertise or someone seeking
              solutions, CodeExchange is the perfect place for you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 link link-underline w-fit">
              Features
            </h2>

            <div className="mb-4 ml-5 ">
              <h3 className="text-xl font-bold mb-2 link link-underline w-fit">
                {" "}
                1{"] "}Public Codespace
              </h3>
              <p className="text-gray-600 ml-2">
                In the Public Codespace, anyone can create a code page, share
                it, and collaborate with others. It's a space for open
                collaboration and knowledge sharing. Please note that real-time
                collaboration is not currently supported, but stay tuned for
                exciting updates in the future.
                <br /> 
                <code
                    className="font-semibold italic"
                >1.Create a Code Page:</code>
                Start by creating your code page with a unique keyword.
                <br />
                <code
                    className="font-semibold italic"
                >
                2.Share with Others:
                </code>
                 Share the page link to allow others to view
                and edit the code.
                <br />
                <code
                    className="font-semibold italic"
                >
                3.Collaborate:
                </code>
                 Multiple users can easily collaborate on the
                code, making it a hub for collective learning.
              </p>
            </div>

            <div className="ml-5">
              <h3 className="text-xl font-bold mb-2 link link-underline w-fit">
                2{"] "}Private Codespace
              </h3>
              <p className="text-gray-600 ml-2">
                In the Private Codespace, only the owner has the authority to
                create and edit the code. Others can view the code but cannot
                make changes. This provides a secure and controlled environment
                for specific projects or personal work.
              </p>
            </div>
          </section>

          {/* Add other sections as needed, such as Getting Started, Future Developments, etc. */}

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 link link-underline w-fit">
              Feedback and Support
            </h2>
            <p className="text-gray-600">
              We value your feedback! If you have any suggestions, issues, or
              just want to say hello, feel free to{" "}
              <a
                href="mailto:support@codeexchange.com"
                className="text-blue-500">
                contact us
              </a>
              .
            </p>
          </section>

          <p className="text-gray-600">Happy coding!</p>
        </div>
      </div>
    </>
  );
};

export default About;
