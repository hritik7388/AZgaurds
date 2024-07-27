import config from "config";
import Joi from "joi"; 
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: config.get("cloudinary.cloud_name"),
  api_key: config.get("cloudinary.api_key"),
  api_secret: config.get("cloudinary.api_secret"),
}); 

module.exports = { 

   getImageUrl: async (files) => {
    try {
      var result = await cloudinary.v2.uploader.upload(files[0].path, {
        resource_type: "auto",
      });

      return result.secure_url;
    } catch (error) {
      console.log(error);
    }
  },
 

 
};