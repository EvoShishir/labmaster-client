const { default: mongoose } = require("mongoose");

const connectMongoose = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error("Connection to database failed", error));
};

export default connectMongoose;
