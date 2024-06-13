import mongoose from "mongoose";
import colors from "colors";

let connected = false;

const connectDB = async () => {
  if (connected) {
    console.log("MongoDB connection is already established.".yellow);
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "promptopia",
    });

    connected = true;
    console.log(
      `Successfully connected to MongoDB at ${db.connection.host}`.cyan
        .underline.bold
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB.".red.bold);
    process.exit(1);
  }
};

export default connectDB;
