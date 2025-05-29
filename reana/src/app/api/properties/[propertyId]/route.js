import crypto from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase.js";
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";

function normalizeAddress(address) {
  return {
    street: address.street
      .toLowerCase()
      .trim()
      .replace(
        /\b(street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|court|ct|place|pl)\b/g,
        (match) => {
          const abbrev = {
            street: "st",
            avenue: "ave",
            road: "rd",
            boulevard: "blvd",
            drive: "dr",
            lane: "ln",
            court: "ct",
            place: "pl",
          };
          return abbrev[match] || match;
        }
      )
      .replace(/\s+/g, " "),
    city: address.city.toLowerCase().trim().replace(/\s+/g, " "),
    state: address.state.toLowerCase().trim(),
    zip: address.zip.replace(/[^0-9]/g, "").substring(0, 5),
  };
}

function generatePropertyId(address, mlsNumber = null) {
  if (mlsNumber) {
    return `mls_${mlsNumber.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  }

  const normalized = normalizeAddress(address);
  const addressString = [
    normalized.street,
    normalized.city,
    normalized.state,
    normalized.zip,
  ].join("|");

  const hash = crypto
    .createHash("sha256")
    .update(addressString)
    .digest("hex")
    .substring(0, 16);

  return `addr_${hash}`;
}

async function checkPropertyIdCollision(propertyId, expectedAddress) {
  try {
    const docRef = doc(db, "properties", propertyId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { collision: false };
    }

    const existingData = docSnap.data();
    const existingNormalized = normalizeAddress(existingData.address);
    const expectedNormalized = normalizeAddress(expectedAddress);

    const isSameAddress =
      existingNormalized.street === expectedNormalized.street &&
      existingNormalized.city === expectedNormalized.city &&
      existingNormalized.state === expectedNormalized.state &&
      existingNormalized.zip === expectedNormalized.zip;

    if (isSameAddress) {
      return {
        collision: false,
        exists: true,
        existingProperty: existingData,
      };
    } else {
      return {
        collision: true,
        existingAddress: existingData.address,
        expectedAddress,
      };
    }
  } catch (error) {
    console.error("Error checking collision:", error);
    return { collision: false, error };
  }
}

// GET /api/properties/[propertyId]
export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { propertyId } = resolvedParams;

    console.log("Fetching property:", propertyId);

    const docRef = doc(db, "properties", propertyId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("Property not found:", propertyId);
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const propertyData = { id: docSnap.id, ...docSnap.data() };
    console.log("Property found:", propertyData);

    return NextResponse.json({
      success: true,
      property: propertyData,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/properties/[propertyId] - Create new property
export async function POST(request, { params }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { address, mlsNumber, basicInfo, marketData, standardUnitMix } = body;

    console.log("Creating property with body:", body);

    if (
      !address?.street ||
      !address?.city ||
      !address?.state ||
      !address?.zip
    ) {
      return NextResponse.json(
        {
          error: "Complete address required (street, city, state, zip)",
        },
        { status: 400 }
      );
    }

    const generatedId = generatePropertyId(address, mlsNumber);
    const { propertyId } = resolvedParams;
    
    if (propertyId !== generatedId) {
      return NextResponse.json(
        {
          error: "PropertyId mismatch",
          expected: generatedId,
          provided: propertyId,
          message: "Use the generated propertyId for this address",
        },
        { status: 400 }
      );
    }

    const collisionCheck = await checkPropertyIdCollision(propertyId, address);

    if (collisionCheck.collision) {
      console.error("Hash collision detected!", {
        propertyId,
        existingAddress: collisionCheck.existingAddress,
        newAddress: address,
      });

      return NextResponse.json(
        {
          error: "Hash collision detected",
          propertyId,
          existingAddress: collisionCheck.existingAddress,
          newAddress: address,
          message: "Please contact support - this is a rare occurrence",
        },
        { status: 409 }
      );
    }

    if (collisionCheck.exists) {
      console.log("Property already exists:", collisionCheck.existingProperty);
      return NextResponse.json(
        {
          success: true,
          propertyId,
          property: collisionCheck.existingProperty,
          message: "Property already exists"
        },
        { status: 200 }
      );
    }

    const propertyData = {
      id: propertyId,
      mlsNumber: mlsNumber || null,
      address: normalizeAddress(address),
      originalAddress: typeof address === 'string' ? address : `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
      basicInfo: basicInfo || {},
      marketData: marketData || {},
      standardUnitMix: standardUnitMix || [],
      dataSource: {
        aiGenerated: true,
        lastUpdated: new Date(),
        confidence: 0.85,
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Creating property document:", propertyData);

    const docRef = doc(db, "properties", propertyId);
    await setDoc(docRef, propertyData);

    console.log("Property created successfully:", propertyId);

    return NextResponse.json(
      {
        success: true,
        propertyId,
        property: propertyData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property", details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[propertyId] - Update existing property
export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const { propertyId } = resolvedParams;
    const body = await request.json();

    const docRef = doc(db, "properties", propertyId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    if (body.address) {
      const currentData = docSnap.data();
      const newPropertyId = generatePropertyId(
        body.address,
        currentData.mlsNumber
      );

      if (newPropertyId !== propertyId) {
        return NextResponse.json(
          {
            error: "Address change would require new propertyId",
            currentId: propertyId,
            newId: newPropertyId,
            message: "Create a new property for the new address",
          },
          { status: 400 }
        );
      }

      updateData.address = normalizeAddress(body.address);
    }

    await updateDoc(docRef, updateData);

    return NextResponse.json({
      success: true,
      propertyId,
      updated: updateData,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Failed to update property", details: error.message },
      { status: 500 }
    );
  }
}

export { generatePropertyId };
