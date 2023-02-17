const mongoose = require("mongoose");

(async () => {
  await mongoose.connect("mongodb+srv://omer:Bsv5qtmbaK7huWEh@cluster0.sollise.mongodb.net/boli");
})();

module.exports = {
  User: require("./User"),
  Recording: require("./Recording"),
};
