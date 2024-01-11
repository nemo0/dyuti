import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { UserModel } from "@/models/user";
import { ItemModel } from "@/models/item";
import auth from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          message: "You must be signed in to create an item.",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const body: ItemModel = await request.json();

    const item = await ItemModel.create({
      ...body,
      itemOwner: session.user._id,
    });

    const { _id } = item;

    await UserModel.findByIdAndUpdate(
      session.user._id,
      {
        $push: {
          items: _id,
        },
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Item created successfully.",
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong.",
      success: false,
    });
  }
}
