import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { UserModel } from "@/models/user";
import { ClientModel } from "@/models/client";
import auth from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          message: "You must be signed in to create a client.",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const body: ClientModel = await request.json();

    const client = await ClientModel.create({
      ...body,
      customerOwner: session.user._id,
    });

    const { _id } = client;

    await UserModel.findByIdAndUpdate(
      session.user._id,
      {
        $push: {
          clients: _id,
        },
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Client created successfully.",
      success: true,
      client,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong.",
      success: false,
    });
  }
}
