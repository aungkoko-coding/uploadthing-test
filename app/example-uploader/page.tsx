"use client";

import React from "react";
import { UploadButton } from "../utils/uploadthing";

const ExampleUploaderPage = () => {
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
    </main>
  );
};

export default ExampleUploaderPage;
