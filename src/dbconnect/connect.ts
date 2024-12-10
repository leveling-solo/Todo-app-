import mongoose from "mongoose";
export async function Connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", (): void => {
      console.log("MongoDB connected Successfully");
    });

    connection.on("error", (err: Error | string): void => {
      console.log(
        "MongoDB connection err , Please make sure MongoDB is running" + err
      );
    });
  } catch (err) {
    console.log("Something Went Wrong");
    console.log(err);
  }
}
