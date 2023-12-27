const { exec } = require("child_process");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const port = 8080;

const allowedOrigins = ["http://localhost:5173", undefined];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS -> " + origin));
    }
  },
};

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin) || true) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "86400"); // 24 hours
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, "input.txt");
  },
});

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, "input.png");
  },
});

const upload = multer({ storage: storage });
const uploadImage = multer({ storage: storageImage });

app.post("/uploadImage", uploadImage.single("file"), (req, res) => {
  console.log("File received:", req.file);

  executePython("decrypt");
  res.send("Image uploaded successfully");
});

app.post("/uploadFile", upload.single("file"), (req, res) => {
  console.log("File received:", req.file);

  executePython("encrypt");
  res.send("File uploaded successfully");
});

app.post("/uploadText", (req, res) => {
  console.log("Text received:", req.body.text);

  const contentToWrite = req.body.text;
  const filePath = "./tmp/input.txt";

  fs.writeFile(filePath, contentToWrite, (error) => {
    if (error) {
      console.error("Error writing to file:", error);
    }
  });

  executePython("encrypt");
  res.send("Text uploaded successfully");
});

app.get("/downloadEncrypted", (req, res) => {
  const zipFilePath = "./tmp/encrypted.zip";
  const zipFileStream = fs.createReadStream(zipFilePath);

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=encrypted.zip");

  zipFileStream.pipe(res);
});

app.get("/downloadDecrypted", (req, res) => {
  const filePath = "./tmp/decryptOut.txt";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    res.send({ output: data });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function executePython(filename) {
  const pythonScript = "./scripts/" + filename + ".py";
  const command = `python ${pythonScript}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`\nError executing Python script ->\n${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`\nPython script stderr ->\n${stderr}`);
      return;
    }
    console.log(`\nPython script output ->\n${stdout}`);

    return stdout;
  });
}
