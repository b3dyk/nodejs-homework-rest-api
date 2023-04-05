const path = require("path");
const multer = require("multer");

const AppError = require("./appError");

const tmpDir = path.join(__dirname, "../", "tmp");

class ImageService {
  static upload(name) {
    const multerConfig = multer.diskStorage({
      destination: (req, file, clb) => {
        clb(null, tmpDir);
      },
      filename: (req, file, clb) => {
        clb(null, file.originalname);
      },
      limits: {
        fileSize: 600000,
      },
    });

    const multerFilter = (req, file, clb) => {
      if (file.mimetype.startsWith("image")) {
        clb(null, true);
      } else {
        clb(new AppError(400, "Please upload images only.."), false);
      }
    };

    return multer({
      storage: multerConfig,
      fileFilter: multerFilter,
    }).single(name);
  }
}

module.exports = ImageService;
