const mongoose = require("mongoose");

(async () => {
  await mongoose.connect("mongodb://localhost:27017/boli");
})();

module.exports = {
  User: require("./User"),
  Recording: require("./Recording"),
};
