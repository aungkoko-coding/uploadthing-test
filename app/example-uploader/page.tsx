"use client";

import React from "react";
import { UploadButton } from "../utils/uploadthing";

const ExampleUploaderPage = () => {
  function downloadFile() {
    let url =
      "https://utfs.io/f/3095b108-12d5-4f35-a1fb-b52387e57689-qdsvdl.mp4";
    let fileName = "video.mp4";

    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files", res);
          alert("Upload completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {/* <div className="mt-10 mx-auto">
        <a
          href="https://utfs.io/f/3095b108-12d5-4f35-a1fb-b52387e57689-qdsvdl.mp4"
          download={"record.mp4"}
        >
          <button>Download Video</button>
        </a>
      </div> */}
      <button onClick={downloadFile}>Download Video</button>
    </main>
  );
};

export default ExampleUploaderPage;
