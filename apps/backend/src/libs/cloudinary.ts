import { UploadApiOptions, v2 as cloudinary } from "cloudinary";

//cloudinary config

function init() {
   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
   });
}

type UploadType = { file: any; options: UploadApiOptions; base64?: boolean };
async function uploadFile({ file, options, base64 }: UploadType) {
   const data = base64 ? `data:${file?.mimetype};base64,${file?.data?.toString("base64")}` : file;
   const src = await cloudinary.uploader.upload(data, options);
   return src;
}

async function deleteFile(publicID: string) {
   const res = await cloudinary.uploader.destroy(publicID);
   return res;
}

async function getImage(publicID: string) {
   const res = await cloudinary.api.resource(publicID);
   return res;
}

const bucket = {
   init,
   getImage,
   uploadFile,
   deleteFile,
};
export { bucket };
