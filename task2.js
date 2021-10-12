const csv = require("csvtojson");
const fs = require("fs");
const { pipeline } = require("stream");

const fileSource = "./csv/file.csv";
const fileDest = "./txt/file.txt";

const readStream = fs.createReadStream(fileSource);
const writeStream = fs.createWriteStream(fileDest);

pipeline(readStream, csv(), writeStream, (err) => {
  if (err) {
    console.error("Pipeline failed.", err);
  } else {
    console.log("Pipeline succeeded.");
  }
});
