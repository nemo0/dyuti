import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { UserModel } from "@/models/user";
import { BusinessModel } from "@/models/business";
import auth from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          message: "You must be signed in to create a business.",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const {
      businessName,
      businessAddress,
      businessPhone,
      businessEmail,
      businessWebsite,
    } = await request.json();

    const businessNameExists = await BusinessModel.findOne({
      businessName,
    });

    /* 
    The reason for checking the duplicates individually is because we want to return a specific error message for each duplicate.
    */
    if (businessNameExists) {
      return NextResponse.json(
        {
          message: "Business name already exists.",
          success: false,
        },
        {
          status: 409,
        }
      );
    }

    const businessPhoneExists = await BusinessModel.findOne({
      businessPhone,
    });

    if (businessPhoneExists) {
      return NextResponse.json(
        {
          message: "Business phone already exists.",
          success: false,
        },
        {
          status: 409,
        }
      );
    }

    const businessEmailExists = await BusinessModel.findOne({
      businessEmail,
    });

    if (businessEmailExists) {
      return NextResponse.json(
        {
          message: "Business email already exists.",
          success: false,
        },
        {
          status: 409,
        }
      );
    }

    const businessWebsiteExists = await BusinessModel.findOne({
      businessWebsite,
    });

    if (businessWebsiteExists) {
      return NextResponse.json(
        {
          message: "Business website already exists.",
          success: false,
        },
        {
          status: 409,
        }
      );
    }

    const business = await BusinessModel.create({
      businessName,
      businessAddress,
      businessPhone,
      businessEmail,
      businessWebsite,
      businessOwner: session.user._id,
    });

    const { _id } = business;

    await UserModel.findByIdAndUpdate(
      session.user._id,
      {
        $push: {
          businesses: _id,
        },
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Business created successfully.",
      success: true,
      business,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong.",
      success: false,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    console.log(session);
    return NextResponse.json({
      session,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong.",
      success: false,
    });
  }
}
