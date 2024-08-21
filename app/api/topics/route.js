import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { title, description } = await request.json();
    await connectMongoDB();
    const topic = await Topic.create({ title, description });
    return NextResponse.json(
      { message: "Topic Created", topic: topic },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to post new topic" },
      {
        status: 500,
      }
    );
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();
    const topics = await Topic.find();

    return NextResponse.json({ topics });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get topics", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    await connectMongoDB();
    const id = request.nextUrl.searchParams.get("id");
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete the topic", error: error.message },
      { status: 500 }
    );
  }
};
