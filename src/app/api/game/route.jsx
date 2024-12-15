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

    const dataCollection = req.nextUrl.searchParams.get("dataCollection");

    const mainPostCollection = db.collection(dataCollection);

    const posts = await mainPostCollection.find({}).toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts from MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts from MongoDB" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const db = mongoose.connection;

    const dataCollection = req.nextUrl.searchParams.get("dataCollection");

    const mainPostCollection = db.collection(dataCollection);

    const postData = await req.json();

    postData.date = new Date();

    const insertResult = await mainPostCollection.insertOne(postData);

    return NextResponse.json({
      message: "Post added successfully",
      postId: insertResult.insertedId,
      postData,
    });
  } catch (error) {
    console.error("Error adding post to MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to add post to MongoDB" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase(); // Connect to MongoDB

    const db = mongoose.connection;
    const dataCollection = req.nextUrl.searchParams.get("dataCollection");

    const mainPostCollection = db.collection(dataCollection);

    const { id } = await req.json(); // Assuming DELETE data contains an ID

    // Ensure id is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const objectId = mongoose.Types.ObjectId.createFromHexString(id);

    const deleteResult = await mainPostCollection.deleteOne({ _id: objectId }); // Delete data

    if (deleteResult.deletedCount === 1) {
      return NextResponse.json({ message: "Post deleted successfully" });
    } else {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting post from MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to delete post from MongoDB" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase(); // Connect to MongoDB

    const db = mongoose.connection;
    const dataCollection = req.nextUrl.searchParams.get("dataCollection");

    const mainPostCollection = db.collection(dataCollection);

    const { id, updateData } = await req.json(); // Assuming PUT data contains an ID and updateData

    // Ensure id is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const objectId = mongoose.Types.ObjectId.createFromHexString(id);

    const updateResult = await mainPostCollection.updateOne(
      { _id: objectId },
      { $set: updateData }
    ); // Update data

    if (updateResult.matchedCount === 1) {
      return NextResponse.json({ message: "Post updated successfully" });
    } else {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating post in MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to update post in MongoDB" },
      { status: 500 }
    );
  }
}
