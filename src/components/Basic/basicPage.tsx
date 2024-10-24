"use client";
import { RotateCw } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

const EditorBlock = dynamic(() => import("@/components/Editor/editorRead"), {
  ssr: false,
});
function BasicPage({ data, editorId }: { data: any; editorId: string }) {
  //   const data1={
  //     "time": 1695190255231,
  //     "blocks": [
  //         {
  //             "id": "_TX6bUzM34",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "# Lab Management"
  //             }
  //         },
  //         {
  //             "id": "ZFdQnwxCkW",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "- ref: http://vlabs.iitkgp.ernet.in/se/"
  //             }
  //         },
  //         {
  //             "id": "wXITcwuIva",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "## Requirements from Problem Statements"
  //             }
  //         },
  //         {
  //             "id": "vN1dFxKLW_",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "   A lab management system is a software that helps you to manage your lab operations more efficiently and effectively. It can help you to track samples, collect and analyze data, automate workflows, integrate instruments, control quality, and generate reports."
  //             }
  //         },
  //         {
  //             "id": "yTIm0DlPCh",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "---"
  //             }
  //         },
  //         {
  //             "id": "bVF_PGVqsM",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "  ### Characteristics of Requirements"
  //             }
  //         },
  //         {
  //             "id": "xMB84LMrRf",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "  - The characteristics of requirements for a lab management system based on the points you mentioned are:"
  //             }
  //         },
  //         {
  //             "id": "hfQQXNdRGc",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "1. Availability: The system should be available to all authorized users."
  //             }
  //         },
  //         {
  //             "id": "x3fGaDa00H",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "2. Error handling: The system should display an error message if any error occurs."
  //             }
  //         },
  //         {
  //             "id": "Dqfo0fIfH0",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "3. Real-time seating arrangement: The system should show the real-time seating arrangement of the lab based on the college structure."
  //             }
  //         },
  //         {
  //             "id": "KSCii7Vb1j",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "4. Data storage: The system should store all data entered daily for lab reports."
  //             }
  //         },
  //         {
  //             "id": "Fq58Cd1vmT",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "5. Real-time usage: The system should show the real-time usage of the lab and indicate which seats are vacant and which are not."
  //             }
  //         },
  //         {
  //             "id": "2r9shET2ec",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "----"
  //             }
  //         },
  //         {
  //             "id": "qYCdJirC78",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": " ### Requirements"
  //             }
  //         },
  //         {
  //             "id": "4h7Yi84Wl7",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": " 1.  #### User Requirement "
  //             }
  //         },
  //         {
  //             "id": "uA85_fSdlm",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t\t- Real-time attendance management system: The system should be able to manage attendance in real-time. It should be able to record attendance as soon as students enter the lab and display it in real-time."
  //             }
  //         },
  //         {
  //             "id": "dy0qCFQm5W",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t\t-  Frontend should show real-time seating arrangement: The frontend of the system should show the real-time seating arrangement of the lab. It should be able to display which seats are occupied and which are vacant."
  //             }
  //         },
  //         {
  //             "id": "p_r1y7Vjoe",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t\t- Previous data should be displayed: The system should be able to display previous data such as attendance records and lab reports."
  //             }
  //         },
  //         {
  //             "id": "TjUOJ1CxB0",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t\t- Different seating arrangements should be shown for each lab: The system should be able to show different seating arrangements for each lab based on their structure."
  //             }
  //         },
  //         {
  //             "id": "m6Z-BSC9xa",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t\t- All teachers should be able to access the web application in real-time: All teachers should be able to access the web application in real-time and view the attendance records and lab reports."
  //             }
  //         },
  //         {
  //             "id": "LlOXO7eHlV",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t\t-  Students should be able to enter all required data such as name, roll number, and other details of students."
  //             }
  //         },
  //         {
  //             "id": "YWCX1S3mBa",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "2.  #### System Requirement "
  //             }
  //         },
  //         {
  //             "id": "4qA9yQYhsM",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t- Scalability: The system should be scalable to accommodate the growing needs of the college."
  //             }
  //         },
  //         {
  //             "id": "wPZ5ZMg2mQ",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t- Security: The system should be secure and protect sensitive data such as student records and lab reports."
  //             }
  //         },
  //         {
  //             "id": "uxCL77PyXY",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-  Performance: The system should be able to handle a large number of users and provide fast response times."
  //             }
  //         },
  //         {
  //             "id": "Wh0guJTWHh",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t- Compatibility: The system should be compatible with different browsers and devices."
  //             }
  //         },
  //         {
  //             "id": "b6qkrUoLB-",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-  Reliability: The system should be reliable and available 24/7."
  //             }
  //         },
  //         {
  //             "id": "Un2BZgg93M",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t- Usability: The system should be easy to use and navigate for both teachers and students."
  //             }
  //         },
  //         {
  //             "id": "KYXAlJZUDz",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-  Integration: The system should be able to integrate with other systems such as ERP and MES systems."
  //             }
  //         },
  //         {
  //             "id": "WeD64ubhWa",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t- Customization: The system should be customizable to meet the specific needs of the college."
  //             }
  //         },
  //         {
  //             "id": "p-pFRMZg1t",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "3. #### Functional requirements"
  //             }
  //         },
  //         {
  //             "id": "FXkL3cJOML",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t- Attendance management: The system should be able to manage attendance in real-time."
  //             }
  //         },
  //         {
  //             "id": "p4k-5GmoF-",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-  Seating arrangement: The system should be able to display the real-time seating arrangement of the lab. Data storage: The system should be able to store data such as attendance records and lab reports."
  //             }
  //         },
  //         {
  //             "id": "T-CyAzmtiC",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t- User management: The system should be able to manage users such as teachers and students."
  //             }
  //         },
  //         {
  //             "id": "2j8fxx8DYe",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-  Lab management: The system should be able to manage labs such as different seating arrangements for each lab."
  //             }
  //         },
  //         {
  //             "id": "9Q21GQVrhp",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-  Reporting: The system should be able to generate reports such as attendance reports and lab reports."
  //             }
  //         },
  //         {
  //             "id": "EjvGEnzLRU",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "4. ####  Non-Functional Requirement"
  //             }
  //         },
  //         {
  //             "id": "Ix88I9f5m1",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-   The web server that hosts the system should support Next.js, which is a React-based framework that enables server-side rendering, static site generation, and API routes. The web server should be compatible with Node.js, which is the runtime environment for Next.js. Alternatively, the system can be deployed on platforms that provide Next.js hosting, such as Vercel or Netlify."
  //             }
  //         },
  //         {
  //             "id": "gbnjE_3ymH",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-   The system should have sufficient storage capacity to store the data related to the laboratory operations, such as sample information, analysis results, reports, and other documents. The storage capacity should be scalable and secure, and should support data backup and recovery. The system should also provide access control and encryption mechanisms to protect the data from unauthorized access or modification."
  //             }
  //         },
  //         {
  //             "id": "zRdUcKqjBu",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-   The system should have adequate memory and processing power to handle the data collection, processing, analysis, and reporting tasks. The memory and processing power should be scalable and optimized for performance, and should support parallel and distributed computing. The system should also monitor and manage the resource utilization and allocation, and provide alerts and feedback to the users and administrators."
  //             }
  //         },
  //         {
  //             "id": "I0hfLy-oST",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-   The system should have a reliable and fast network connection to communicate with the instruments, software, and users. The network connection should support encryption and authentication protocols to ensure data security and integrity. The system should also provide a user-friendly interface that is responsive and compatible with different devices and browsers."
  //             }
  //         },
  //         {
  //             "id": "yRDQ1KJZaT",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "5.  #### Product requirements:"
  //             }
  //         },
  //         {
  //             "id": "BjBSPuVwId",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t-   [The web application should allow users to access various virtual labs that simulate real-world experiments and scenarios in different domains, such as electronics, computer science, mechanical engineering, etc.](https://www.vlab.co.in/)[1](https://www.vlab.co.in/)"
  //             }
  //         },
  //         {
  //             "id": "SpV-vreFDr",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "    -   [The web application should provide a complete learning management system around the virtual labs, where the users can avail various tools for learning, such as additional web-resources, video-lectures, animated demonstrations, and self-evaluation.](https://www.vlab.co.in/)[1](https://www.vlab.co.in/)"
  //             }
  //         },
  //         {
  //             "id": "nkGOd5iHwd",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "    -   The web application should have a user-friendly interface that is easy to navigate and use."
  //             }
  //         },
  //         {
  //             "id": "Qo3PIxmwmS",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "    -   The web application should have a secure login system that authenticates and authorizes users based on their roles and permissions."
  //             }
  //         },
  //         {
  //             "id": "Muhd6Weygb",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "    -   The web application should have a data backup and recovery system that ensures the safety and integrity of the laboratory data."
  //             }
  //         },
  //         {
  //             "id": "Ecs-eGJLGv",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "    -   The web application should have a notification system that alerts users of any important events or updates in the laboratory."
  //             }
  //         },
  //         {
  //             "id": "AJ6o_Kddse",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "    -   The web application should have a reporting system that generates customized reports based on the laboratory data and user preferences."
  //             }
  //         },
  //         {
  //             "id": "nWJhxZgzH2",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "7.  ####   Performance requirements: "
  //             }
  //         },
  //         {
  //             "id": "I_vmIgBOQ9",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t  -   The web application should load quickly and respond to user requests within a reasonable time."
  //             }
  //         },
  //         {
  //             "id": "OHPvdm6smD",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t   -   The web application should handle high volumes of data and concurrent users without compromising its functionality or quality."
  //             }
  //         },
  //         {
  //             "id": "nyZ6FPCT-e",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t  -   The web application should be available 24/7 and have minimal downtime or errors."
  //             }
  //         },
  //         {
  //             "id": "GbB4pYwpcB",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t   -   The web application should be able to scale up or down according to the changing needs and demands of the college laboratory."
  //             }
  //         },
  //         {
  //             "id": "z9Tj_RQy2p",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "\t  -   The web application should be compatible with different browsers, devices, and platforms."
  //             }
  //         },
  //         {
  //             "id": "sRjH_8E6h0",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "8. ####   Organizational requirements: "
  //             }
  //         },
  //         {
  //             "id": "T-Kh2C7qdA",
  //             "type": "paragraph",
  //             "data": {
  //                 "text": "    -   The web application should adhere to the ethical and legal principles of the college and its stakeholders, such as confidentiality, privacy, consent, etc."
  //             }
  //         }
  //     ],
  //     "version": "2.28.0"
  // }
  const [isUpdated, setIsUpdated] = React.useState(false);
  return (
    <div className="w-[80%] p-3 md:p-10">
      <div className="bg-gray-700 text-white py-4 px-6 rounded-t-[10px] flex justify-between">
        <h1 className="text-lg md:text-3xl font-bold">Code Exchange</h1>
        <span className="flex justify-between gap-3">
          <span className="mr-2">{!isUpdated ? "Saved" : "Saving"}</span>
          {isUpdated && <RotateCw className="h-6 w-6 cursor-pointer animate-spin" />}
        </span>
      </div>
      <EditorBlock
        data={data}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        editorId={editorId}
        type="basic"
        holder="editorjs-container"
        className="bg-white rounded-b-[10px] p-3 md:p-10 w-full"
      />
    </div>
  );
}

export default BasicPage;
