const mongoose = require("mongoose");

function connectDb(callback) {
    const password = encodeURIComponent("Shibu444");

  // connection to the uri
  mongoose.connect(`mongodb+srv://Shibu444:${password}@cluster0.wsuwdhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("connection succeed");
    callback();
  });

  db.on("error", (err) => {
    console.log("error:", err);
  });
}

module.exports = connectDb;


