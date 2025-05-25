import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// Send Property Profile data to backend
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      landlordFriendly,
      tenantClass,
      specialtyTenants,
      propertyTypes,
      locations,
      areaType,
      schoolQuality,
      crimeTolerance,
    } = body;

    if (
      landlordFriendly === undefined ||
      !Array.isArray(tenantClass) ||
      !Array.isArray(specialtyTenants) ||
      !Array.isArray(propertyTypes) ||
      !Array.isArray(locations) ||
      !Array.isArray(areaType) ||
      !schoolQuality ||
      !crimeTolerance
    ) {
      return NextResponse.json(
        { error: "All fields must be provided in the correct format" },
        { status: 400 }
      );
    }

    // Validate location format if provided
    if (locations.length > 0) {
      const validLocations = locations.every(
        (loc) => typeof loc === "object" && "zipCode" in loc && "radius" in loc
      );

      if (!validLocations) {
        return NextResponse.json(
          { error: "Locations must include zipCode and radius" },
          { status: 400 }
        );
      }
    }

    // Create a reference to the document
    const userDocRef = doc(db, "users", userId);

    await setDoc(
      userDocRef,
      {
        propertyProfile: {
          landlordFriendly,
          tenantClass,
          specialtyTenants,
          propertyTypes,
          locations,
          areaType,
          schoolQuality,
          crimeTolerance,
          updatedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: "Property profile saved successfully",
    });
  } catch (error) {
    console.error("Error saving Property Profile:", error);

    return NextResponse.json(
      { error: `Failed to save Property Profile data: ${error.message}` },
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
    const propertyProfile = userData.propertyProfile || {};

    return NextResponse.json({
      success: true,
      propertyProfile: {
        landlordFriendly: propertyProfile.landlordFriendly || "No",
        tenantClass: propertyProfile.tenantClass || [],
        specialtyTenants: propertyProfile.specialtyTenants || [],
        propertyTypes: propertyProfile.propertyTypes || [],
        locations: propertyProfile.locations || [],
        areaType: propertyProfile.areaType || [],
        schoolQuality: propertyProfile.schoolQuality || "Medium",
        crimeTolerance: propertyProfile.crimeTolerance || "Some",
      },
    });
  } catch (error) {
    console.error("Error getting Property Profile fields:", error);

    return NextResponse.json(
      { error: `Failed to retrieve profile data: ${error.message}` },
      { status: 500 }
    );
  }
}
