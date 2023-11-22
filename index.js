import http from "http";
import fs from "fs";
import chalk from "chalk";
import EventEmitter from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
  console.log("Server started");
});

eventEmitter.emit("start");

const PORT = 3000;

const server = http.createServer((req, res) => {
  try {
    if (req.url === "/IMG_1877.JPG" || req.url === "/") {
      let filePath = req.url === "/" ? "index.html" : "IMG_1877.JPG";
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(`Error reading file ${filePath}: ${err.message}`);
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("Internal Server Error");
        }
        if (req.url === "/IMG_1877.JPG") {
          res.writeHead(200, { "Content-Type": "image/jpeg" });
        } else {
          res.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
          });
        }
        res.end(data);
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } catch (error) {
    console.log(error);
  }
});

server.listen(PORT, () => {
  console.log(chalk.yellow(`Server running on port ${PORT}`));
  console.log(`Server running on port ${PORT}`);
});
