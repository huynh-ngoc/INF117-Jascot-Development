import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// Send Property Features data to backend
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      minSqft,
      maxSqft,
      minLotSize,
      minBedrooms,
      maxBedrooms,
      minBathrooms,
      maxBathrooms,
      condition,
      parking,
    } = body;

    // Array validation
    if (!Array.isArray(condition) || !Array.isArray(parking)) {
      return NextResponse.json(
        { error: "All fields must be provided in the correct format" },
        { status: 400 }
      );
    }

    // Numeric field validation
    const numericFields = {
      minSqft,
      maxSqft,
      minLotSize,
      minBedrooms,
      maxBedrooms,
      minBathrooms,
      maxBathrooms,
    };
    for (const [field, value] of Object.entries(numericFields)) {
      if (value !== "" && value !== null && value !== undefined) {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
          return NextResponse.json(
            { error: `${field} must be a number` },
            { status: 400 }
          );
        }
      }
    }

    // Logical validation for min/max fields
    if (
      minSqft !== "" &&
      maxSqft !== "" &&
      parseFloat(minSqft) > parseFloat(maxSqft)
    ) {
      return NextResponse.json(
        { error: "Maximum square footage must be greater than minimum" },
        { status: 400 }
      );
    }

    // Create a reference to the document
    const userDocRef = doc(db, "users", userId);

    await setDoc(
      userDocRef,
      {
        propertyFeatures: {
          minSqft,
          maxSqft,
          minLotSize,
          minBedrooms,
          maxBedrooms,
          minBathrooms,
          maxBathrooms,
          condition,
          parking,
          updatedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: "Property features saved successfully",
    });
  } catch (error) {
    console.error("Error saving Property Features:", error);

    return NextResponse.json(
      { error: `Failed to save Property Frofile data: ${error.message}` },
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
    const propertyFeatures = userData.propertyFeatures || {};

    return NextResponse.json({
      success: true,
      propertyFeatures: {
        minSqft: propertyFeatures.minSqft || "",
        maxSqft: propertyFeatures.maxSqft || "",
        minLotSize: propertyFeatures.minLotSize || "",
        minBedrooms: propertyFeatures.minBedrooms || "",
        maxBedrooms: propertyFeatures.maxBedrooms || "",
        minBathrooms: propertyFeatures.minBathrooms || "",
        maxBathrooms: propertyFeatures.maxBathrooms || "",
        condition: propertyFeatures.condition || [],
        parking: propertyFeatures.parking || [],
        updatedAt: propertyFeatures.updatedAt || "",
      },
    });
  } catch (error) {
    console.error("Error getting Property Features fields:", error);

    return NextResponse.json(
      { error: `Failed to retrieve Property Features data: ${error.message}` },
      { status: 500 }
    );
  }
}
