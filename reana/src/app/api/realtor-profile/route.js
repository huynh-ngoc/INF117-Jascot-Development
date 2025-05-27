import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// Send Realtor Profile data to backend
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      brokerageName,
      street,
      city,
      state,
      zipcode,
      officeNum,
      officeNumExt,
      agentName,
      licenseNumber,
      email,
      mobileNum,
      agentType,
    } = body;

    // Validate that all required fields are present
    const requiredFields = [
      "brokerageName",
      "street",
      "city",
      "state",
      "zipcode",
      "officeNum",
      "officeNumExt",
      "agentName",
      "licenseNumber",
      "email",
      "mobileNum",
      "agentType",
    ];

    const missingFields = [];

    for (const fieldName of requiredFields) {
      const value = body[fieldName];
      if (value === "" || value === null || value === undefined) {
        missingFields.push(fieldName);
      }
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields: missingFields,
        },
        { status: 400 }
      );
    }

    // Create a reference to the document
    const userDocRef = doc(db, "users", userId);

    await setDoc(
      userDocRef,
      {
        realtorProfile: {
          brokerageName,
          street,
          city,
          state,
          zipcode,
          officeNum,
          officeNumExt,
          agentName,
          licenseNumber,
          email,
          mobileNum,
          agentType,
          updatedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: "Realtor profile saved successfully",
    });
  } catch (error) {
    console.error("Error saving Realtor Profile:", error);

    return NextResponse.json(
      { error: `Failed to save Realtor Profile data: ${error.message}` },
      { status: 500 }
    );
  }
}

// The GET function is fine and remains unchanged

// Retrieve Property Profile fields
export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json(
        { error: "Realtor Profile not found" },
        { status: 404 }
      );
    }

    const userData = userSnapshot.data();
    const realtorProfile = userData.realtorProfile || {};

    return NextResponse.json({
      success: true,
      realtorProfile: {
        brokerageName: realtorProfile.brokerageName || "",
        street: realtorProfile.street || "",
        city: realtorProfile.city || "",
        state: realtorProfile.state || "",
        zipcode: realtorProfile.zipcode || "",
        officeNum: realtorProfile.officeNum || "",
        officeNumExt: realtorProfile.officeNumExt || "",
        agentName: realtorProfile.agentName || "",
        licenseNumber: realtorProfile.licenseNumber || "",
        email: realtorProfile.email || "",
        mobileNum: realtorProfile.mobileNum || "",
        agentType: realtorProfile.agentType || "",
        updatedAt: realtorProfile.updatedAt || "",
      },
    });
  } catch (error) {
    console.error("Error getting Realtor Profile fields:", error);

    return NextResponse.json(
      { error: `Failed to retrieve Realtor Profile data: ${error.message}` },
      { status: 500 }
    );
  }
}
