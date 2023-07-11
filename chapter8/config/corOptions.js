const whiteList = [
    "https://www.ahmad.com",
    "http://localhost:3500",
    "http://127.0.01:5500",
  ];
  
const corOptions = {
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  };

  module.exports = corOptions