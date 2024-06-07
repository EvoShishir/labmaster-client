const { default: mongoose } = require("mongoose");

const connectMongoose = async () => {
  await mongoose
    .connect(
      "mongodb+srv://evoshishir:Atefarmanshishir123@cluster0.fvbztsh.mongodb.net/labmaster"
    )
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error("Connection to database failed", error));
};

export default connectMongoose;
