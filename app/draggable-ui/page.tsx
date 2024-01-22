"use client";

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react/hooks";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "../utils/uploadthing";

export default function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="w-[400px] h-[400px] relative my-10 mx-auto bg-slate-200 hover:border hover:border-cyan-600"
      >
        <input {...getInputProps()} />

        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          Drop files here!
        </span>
      </div>
      <div className="my-5 flex justify-center">
        {files.length > 0 && (
          <button onClick={() => startUpload(files)}>
            Upload {files[0].name} files
          </button>
        )}
      </div>
    </>
  );
}
