const fs = require("fs");

// fs.mkdir('./new', (err) => {
//     if(err) throw err;

//     console.log("Folder Created")
// })
// fs.rmdir('./new', (err) => {
//     if(err) throw err;

//     console.log("Folder Deleted")
// })

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;

    console.log("Folder Created");
  });
}
if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;

    console.log("Folder Deleted");
  });
}
