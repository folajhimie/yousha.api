// const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");

require("dotenv").config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const cloudinaryUploads = (file, folder) => {
//   return new Promise (resolve => {
//     cloudinary.uploader.upload(file, (result) => {
//       resolve({
//         url: result.url,
//         id: result.public_id,
//       })
//     },{
//       resource_type: "auto",
//       folder: folder
//     })
//   })
// }

module.exports = cloudinary;
