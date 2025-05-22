import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;
// Send Profile Name, Email, Phone
export async function POST(request) {
  try {
    const body = await request.json();
    const { profileName, email, phone } = body;

    // Fallback validation
    if (!profileName || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Create a reference to the document
    const userDocRef = doc(db, "users", userId);

    await setDoc(
      userDocRef,
      {
        profileName,
        email,
        phone,
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: "Profile saved successfully",
      userId,
    });
  } catch (error) {
    console.error("Error saving investor profile:", error);

    return NextResponse.json(
      { error: "Failed to save profile data" },
      { status: 500 }
    );
  }
}

// Retrieve Profile Name, Email, Phone
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
      profile: {
        profileName: userData.profileName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      },
    });
  } catch (error) {
    console.error("Error retrieving investor profile:", error);

    return NextResponse.json(
      { error: "Failed to retrieve profile data" },
      { status: 500 }
    );
  }
}
