"use client";

import { FormEvent, useRef, useState } from "react";
import { useUploadThing } from "../utils/uploadthing";
import { UploadFileResponse } from "uploadthing/client";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadMetadata, setDownloadMetadata] = useState<UploadFileResponse<{
    uploadedBy: string;
  }> | null>(null);
  const [imageData, setImageData] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { isUploading, startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onUploadProgress(p) {
        const progressBarEle = progressBarRef.current;
        if (progressBarEle) progressBarEle.style.width = p + "%";
      },
      onClientUploadComplete(res) {
        setImageData(null);
        setDownloadMetadata(res[0]);
      },
    }
  );

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(currentFile);
    reader.addEventListener("load", (event) => {
      setImageData({ url: event.target.result, name: currentFile.name });
    });
    setFile(currentFile);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) startUpload([file]);
  };

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
    <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto my-10">
      <div className="flex w-full justify-between items-center gap-x-5 md:gap-x-10">
        <div className="flex-1">
          <label
            htmlFor="fileInput"
            className="min-h-[200px] bg-slate-300 flex justify-center items-center text-3xl cursor-pointer"
          >
            {imageData ? (
              <img
                src={imageData.url}
                alt={imageData.name}
                className="object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#5bd917"
                viewBox="0 0 256 256"
              >
                <path d="M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Z"></path>
              </svg>
            )}
            <input
              hidden
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImagePick}
            />
          </label>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <p className="text-[12px]">
            {imageData?.name ?? "Please pick an image!"}
          </p>
        </div>
      </div>
      {imageData && (
        <button
          type="submit"
          className="mx-auto block mt-10 px-4 py-2 bg-cyan-500 text-white rounded"
        >
          Upload
        </button>
      )}
      {isUploading && (
        <div className="w-full h-[20px] my-10 relative border border-cyan-500">
          <div
            ref={progressBarRef}
            className="absolute top-0 bottom-0 left-0 bg-cyan-500 duration-300"
          ></div>
        </div>
      )}
      {downloadMetadata && (
        <button
          onClick={handleDownload}
          type="button"
          className="mx-auto block mt-10 px-4 py-2 bg-cyan-500 text-white rounded"
        >
          Download {downloadMetadata.name}
        </button>
      )}
    </form>
  );
}
