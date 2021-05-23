const multer = require("multer");

const fileStorageEng = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "img/jpg" ||
//     file.mimetype === "img/jpeg" ||
//     file.mimetype === "img/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: fileStorageEng,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  //   fileFilter: fileFilter,
});
module.exports = upload;
