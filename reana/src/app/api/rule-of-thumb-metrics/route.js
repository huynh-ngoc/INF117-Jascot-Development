import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Helper to convert percent string to decimal
function percentStrToDecimal(str) {
  if (typeof str === 'string' && str.includes('%')) {
    return parseFloat(str.replace('%', '')) / 100;
  }
  return str;
}
// Helper to convert decimal to percent string
function decimalToPercentStr(num) {
  if (typeof num === 'number') {
    return (num * 100).toFixed(2) + '%';
  }
  return num;
}

// List of percent fields
const percentFields = [
  'areaAppreciationRate',
  'rentAppreciationRate',
  'propertyTaxRate',
  'vacancyRate',
  'operatingExpenses',
  'operatingCostsChange',
  'contingency',
  'propertyManagerPro',
  'propertyManagerSelf',
  'repairsAndMaintenance',
  'tenantTurnoverCosts',
  'administrativeCosts',
  'costOfSale',
];

const userId = process.env.DEFAULT_USER_ID;

// POST: Save Rule of Thumb Metrics data as a map under users/{user_id}/properties/{property_id}
export async function POST(request) {
  try {
    const body = await request.json();
    const { propertyId } = body;
    if (!propertyId) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }
    // Remove propertyId from body if present
    const { propertyId: _omit, ...metrics } = body;
    // Convert percent fields to decimals
    const dataToSave = { ...metrics };
    percentFields.forEach(field => {
      if (dataToSave[field] !== undefined) {
        dataToSave[field] = percentStrToDecimal(dataToSave[field]);
      }
    });
    // Reference to: users/{userId}/properties/{propertyId}
    const propertyDocRef = doc(db, `users/${userId}/properties/${propertyId}`);
    await setDoc(
      propertyDocRef,
      {
        'local-rule-of-thumb': {
          ...dataToSave,
          updatedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );
    return NextResponse.json({
      success: true,
      message: "Rule of Thumb Metrics saved successfully",
    });
  } catch (error) {
    console.error("Error saving Rule of Thumb Metrics:", error);
    return NextResponse.json(
      { error: `Failed to save Rule of Thumb Metrics data: ${error.message}` },
      { status: 500 }
    );
  }
}

// GET: Retrieve Rule of Thumb Metrics map from users/{user_id}/properties/{property_id}
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
    const ruleOfThumbMetrics = propertyData['local-rule-of-thumb'] || {};
    // Convert decimals to percent strings for percent fields
    const result = { ...ruleOfThumbMetrics };
    percentFields.forEach(field => {
      if (result[field] !== undefined && result[field] !== "") {
        result[field] = decimalToPercentStr(result[field]);
      }
    });
    return NextResponse.json({
      success: true,
      ruleOfThumbMetrics: {
        ...result,
        updatedAt: result.updatedAt || "",
      },
    });
  } catch (error) {
    console.error("Error getting Rule of Thumb Metrics fields:", error);
    return NextResponse.json(
      { error: `Failed to retrieve Rule of Thumb Metrics data: ${error.message}` },
      { status: 500 }
    );
  }
} 