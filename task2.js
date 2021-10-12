import csv from "csvtojson";
import fs from "fs";
import { pipeline } from "stream";

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
