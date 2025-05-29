import { NextResponse } from "next/server";
import { generatePropertyId } from "@/lib/propertyUtils";

function parseAddressString(addressString) {
  try {
    const parts = addressString.split(",").map((s) => s.trim());

    if (parts.length < 3) {
      throw new Error("Invalid address format");
    }

    return {
      street: parts[0],
      city: parts[1],
      state: parts[2]?.split(" ")[0] || "",
      zip: parts[2]?.split(" ")[1] || "",
    };
  } catch (error) {
    console.error("Error parsing address:", error);
    return { street: "", city: "", state: "", zip: "" };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Generate ID request body:", body);

    let { address, mlsNumber = null } = body;

    if (typeof address === "string") {
      address = parseAddressString(address);
    }

    if (
      !address?.street ||
      !address?.city ||
      !address?.state ||
      !address?.zip
    ) {
      console.log("Invalid address:", address);
      return NextResponse.json(
        {
          error: "Complete address required (street, city, state, zip)",
          received: address,
        },
        { status: 400 }
      );
    }

    const propertyId = generatePropertyId(address, mlsNumber);
    console.log("Generated propertyId:", propertyId);

    return NextResponse.json({
      success: true,
      data: {
        propertyId,
        address,
      },
    });
  } catch (error) {
    console.error("Error generating property ID:", error);
    return NextResponse.json(
      {
        error: "Failed to generate property ID",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
