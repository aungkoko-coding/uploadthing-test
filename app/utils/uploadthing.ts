import { generateComponents } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
