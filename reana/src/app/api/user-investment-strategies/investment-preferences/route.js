import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// Investment Preferences Page

// Send investment preferences to backend
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      investmentType,
      holdingPeriod,
      acquisitionMargin,
      outOfState,
      acquisitionType,
      operationalPrefs,
    } = body;

    // Fallback validation to ensure all required fields are filled
    if (
      !investmentType ||
      !outOfState ||
      !holdingPeriod ||
      !acquisitionMargin ||
      !acquisitionType ||
      !operationalPrefs
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Currently for investors add onto user, otherwise create new profile for realtors
    const userDocRef = doc(db, "users", userId);

    await setDoc(
      userDocRef,
      {
        investmentType,
        holdingPeriod,
        acquisitionMargin,
        outOfState,
        acquisitionType,
        operationalPrefs,
      },
      { merge: true }
    );
    return NextResponse.json({
      success: true,
      message: "Investment Preferences saved successfully",
      userId,
    });
  } catch (error) {
    console.error("Error saving investment preferences:", error);
    return NextResponse.json(
      { error: "Failed to save investment preferences" },
      { status: 500 }
    );
  }
}

// Retrieve user's investment preferences
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
      investmentPrefs: {
        investmentType: userData.investmentType || "",
        holdingPeriod: userData.holdingPeriod || "",
        acquisitionMargin: userData.acquisitionMargin || "",
        outOfState: userData.outOfState || "",
        acquisitionType: userData.acquisitionType || "",
        operationalPrefs: userData.operationalPrefs || "",
      },
    });
  } catch (error) {
    console.error("Error retrieving investor preferences:", error);

    return NextResponse.json(
      { error: "Failed to retrieve profile data" },
      { status: 500 }
    );
  }
}
