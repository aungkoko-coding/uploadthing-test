"use client";

import React, { useState } from "react";
import { UploadButton } from "../utils/uploadthing";
import { UploadFileResponse } from "uploadthing/client";

const ExampleUploaderPage = () => {
  const [downloadMetadata, setDownloadMetadata] = useState<UploadFileResponse<{
    uploadedBy: string;
  }> | null>(null);
  const handleDownload = async () => {
    if (downloadMetadata) {
      const response = await fetch(downloadMetadata.url);
      const blob = await response.blob();
      const downloadableUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadableUrl;
      a.download = downloadMetadata.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res): void => {
          console.log("Files", res);
          setDownloadMetadata(res[0]);
          alert("Upload completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {downloadMetadata && (
        <button onClick={handleDownload}>
          Download {downloadMetadata.name}
        </button>
      )}
    </main>
  );
};

export default ExampleUploaderPage;
