import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  try {
    const { id } = params;
    const { newTitle: title, newDescription: description } =
      await request.json();
    await connectMongoDB();
    const topic = await Topic.findByIdAndUpdate(id, { title, description });
    return NextResponse.json(
      { message: "Topic updated successfully", topic: topic },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.jons(
      { message: "Failed to update the topic", error: error.message },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findById(id);

    return NextResponse.json(
      { message: "Topic fetched successfully", topic: topic },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch the topic", error: error.message },
      { status: 500 }
    );
  }
};
