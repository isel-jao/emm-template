const mongoose = require("mongoose");
console.clear();
const uri = process.env.MONGODB_URI;
console.log("uri =>\t", uri);

mongoose
  .connect("mongodb://localhost:27017/trrrr", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty
  .save()
  .then(() => console.log("meow"))
  .catch((err) => console.error(err));
