import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

export async function GET(request, { params }) {
  const { propertyId } = params;
  if (!propertyId) {
    return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
  }
  const propertyDocRef = doc(db, "users", userId, "properties", propertyId);
  const propertySnapshot = await getDoc(propertyDocRef);
  if (!propertySnapshot.exists()) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, property: propertySnapshot.data() });
}

export async function POST(request, context) {
  const { propertyId } = await context.params;
  try {
    const body = await request.json();
    // Expecting { operatingBudget }
    const { operatingBudget } = body;
    const propertyDocRef = doc(db, `users/${userId}/properties/${propertyId}`);
    await setDoc(
      propertyDocRef,
      {
        ...(operatingBudget && { operatingBudget }),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update property: ${error.message}` },
      { status: 500 }
    );
  }
} 