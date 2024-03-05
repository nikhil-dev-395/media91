import mongoose from "mongoose";
const db_name = "media91";
const connectDB = async () => {
  try {
    let username = process.env.MONGODB_USERNAME;
    let password = process.env.MONGODB_PASSWORD;
    let uri = process.env.MONGODB_URI;
    if (!username || !password || !uri || !db_name) {
      console.log({ error: ".env values are not loaded or check db_name" });
      process.exit(1);
    }

    const conn = await mongoose.connect(
      `${username}${password}${uri}/${db_name}`
    );
    console.log(`\n MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error Occurred at connectDB - ", error.message ,` \n` ,error);
    process.exit(1);
  }
};

export default connectDB;
