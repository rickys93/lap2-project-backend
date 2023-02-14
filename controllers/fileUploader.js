const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your account credentials
cloudinary.config({
    cloud_name: "da6qginmp",
    api_key: "796625378121813",
    api_secret: "3jSnTmH6LAgq5mVg7Wmx7ygl53g",
});

// const formData = new FormData();
// formData.append("file", file);
async function uploadFile(file) {
    if (!file.mimetype.includes("image")) {
        return { success: false, error: "File type not image" };
    }
    // Upload file to Cloudinary and get shareable URL
    const response = await cloudinary.uploader.upload(
        file.path,
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                return { success: true, result: result };
            }
        }
    );
    return response;
}

module.exports = uploadFile;
