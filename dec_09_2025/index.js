const express = require("express");
const env = require("dotenv");
const multer = require("multer");
const UPLOAD_FOLDER = "./upload/";
const path = require("path");
const fs = require("fs");
env.config();
const app = express();
app.set("view engine", "ejs");
app.use(express.json());

const UPLOAD_DIR = path.join(__dirname, "new-folder");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log("Error occurred creating folder");
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg and png is allowed"));
    }
  },
});

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  res.send("POST");
});

// File upload with multer

app.post("/file", upload.single("single"), (req, res) => {
  res.send("File uploaded");
});

// 404 not found
app.use((req, res, next) => {
  // console.log("Requested url not found ---404 not found");
  // next("Requested url not found");
  res.status(404).send("Sorry, cannot find that resource!");
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log(err);
    res.status(500).send(err.message);
  } else if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send(err);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
