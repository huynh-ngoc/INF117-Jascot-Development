import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// POST: Save Operating Budget as a map under users/{user_id}/properties/{property_id}
export async function POST(request) {
  try {
    const body = await request.json();
    const { propertyId } = body;
    if (!propertyId) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }
    // Remove propertyId from body if present
    const { propertyId: _omit, ...budget } = body;
    // Reference to: users/{userId}/properties/{propertyId}
    const propertyDocRef = doc(db, `users/${userId}/properties/${propertyId}`);
    await setDoc(
      propertyDocRef,
      {
        operatingBudget: {
          ...budget,
          updatedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );
    return NextResponse.json({
      success: true,
      message: "Operating Budget saved successfully",
    });
  } catch (error) {
    console.error("Error saving Operating Budget:", error);
    return NextResponse.json(
      { error: `Failed to save Operating Budget data: ${error.message}` },
      { status: 500 }
    );
  }
}

// GET: Retrieve Operating Budget map from users/{user_id}/properties/{property_id}
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');
    if (!propertyId) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }
    const propertyDocRef = doc(db, `users/${userId}/properties/${propertyId}`);
    const propertySnapshot = await getDoc(propertyDocRef);
    if (!propertySnapshot.exists()) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    const propertyData = propertySnapshot.data() || {};
    const operatingBudget = propertyData.operatingBudget || {};
    return NextResponse.json({
      success: true,
      operatingBudget: {
        ...operatingBudget,
        updatedAt: operatingBudget.updatedAt || "",
      },
    });
  } catch (error) {
    console.error("Error getting Operating Budget fields:", error);
    return NextResponse.json(
      { error: `Failed to retrieve Operating Budget data: ${error.message}` },
      { status: 500 }
    );
  }
} 