const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "files", "name.txt"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);

  fs.appendFile(
    path.join(__dirname, "files", "name.txt"),
    "\n\nAdding this text using APPEND.",
    (err) => {
      if (err) throw err;
      console.log("Append complete!");
    }
  );
});

// console.log("Hello...");

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Created file by fs module.",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete!");
//   }
// );

// fs.writeFile(
//   path.join(__dirname, "files", "data.csv"),
//   "Created file by fs module.",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete!");
//   }
// );

//exit on uncaught error
process.on("uncaughtExecption", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
