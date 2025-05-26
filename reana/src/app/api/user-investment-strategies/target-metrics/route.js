import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// Send Property Features data to backend
export async function POST(request) {
  try {
    const body = await request.json();
    const { capRate, cashOnCash, dscr, grm } = body;

    // Create a reference to the document
    const userDocRef = doc(db, "users", userId);

    await setDoc(
      userDocRef,
      {
        targetMetrics: {
          capRate,
          cashOnCash,
          dscr,
          grm,
          updatedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: "Target Metrics saved successfully",
    });
  } catch (error) {
    console.error("Error saving Target Metrics:", error);

    return NextResponse.json(
      { error: `Failed to save Target Metrics data: ${error.message}` },
      { status: 500 }
    );
  }
}

// Retrieve Property Profile fields
export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const userData = userSnapshot.data();
    const targetMetrics = userData.targetMetrics || {};

    return NextResponse.json({
      success: true,
      targetMetrics: {
        capRate: targetMetrics.capRate || "",
        cashOnCash: targetMetrics.cashOnCash || "",
        dscr: targetMetrics.dscr || "",
        grm: targetMetrics.grm || "",
        updatedAt: targetMetrics.updatedAt || "",
      },
    });
  } catch (error) {
    console.error("Error getting Target Metrics fields:", error);

    return NextResponse.json(
      { error: `Failed to retrieve Target Metrics data: ${error.message}` },
      { status: 500 }
    );
  }
}
