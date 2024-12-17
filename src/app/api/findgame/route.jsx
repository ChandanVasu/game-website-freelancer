import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStart } from "@/lib/dbConnect";

const connectToDatabase = async () => {
  try {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(connectionStart);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export async function GET(req) {
  try {
    await connectToDatabase();

    const db = mongoose.connection;
    const dataCollectionId = req.nextUrl.searchParams.get("id");

    // Log the received ID for debugging
    console.log("Received dataCollectionId:", dataCollectionId);

    // Validate if dataCollectionId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(dataCollectionId)) {
      console.error("Invalid ObjectId format");
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const mainPostCollection = db.collection("GameList");

    let posts;
    if (dataCollectionId) {
      // Increment views field by 1
      const post = await mainPostCollection.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(dataCollectionId) }, // No need for toString() here
        { $inc: { views: 1 } }, // Increment views by 1
        { returnDocument: "after" } // Return the updated document
      );

      console.log("Post after update:", post);
      return NextResponse.json(post);
    } else {
      posts = await mainPostCollection.find({}).toArray();
    }
  } catch (error) {
    console.error("Error fetching posts from MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts from MongoDB" },
      { status: 500 }
    );
  }
}
