import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

export async function POST(request) {
  try {
    const body = await request.json();
    const {
        profileName
        
    } = body;

    if (
      !profileName
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const userDocRef = doc(db, "users", userId);

    await setDoc(
      userDocRef,
      {
        profileName
      },
      { merge: true }
    );
    return NextResponse.json({
      success: true,
      message: "username saved successfully",
      userId,
    });

  } catch (error) {
    console.error("Error saving user profile:", error);
    return NextResponse.json(
      { error: "Failed to save user profile" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const userData = userSnapshot.data();

    return NextResponse.json({
      success: true,
      userProfile: {
        username: userData.profileName || "",
        email: userData.email || "",
      },
    });
  } catch (error) {
    console.error("Error retrieving user's profile:", error);

    return NextResponse.json(
      { error: "Failed to retrieve profile data" },
      { status: 500 }
    );
  }
}