import mongoose from "mongoose";
const db_name = "media91";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.DATABASE_URI}/${db_name}`
    );
    console.log(`\n MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error Occurred at connectDB", error.message);
    process.exit(1);
  }
};

export default connectDB;
