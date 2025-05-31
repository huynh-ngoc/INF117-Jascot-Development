import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

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

// Send Rule of Thumb Metrics data to backend
export async function POST(request) {
  try {
    const body = await request.json();
    // Convert percent fields to decimals
    const dataToSave = { ...body };
    percentFields.forEach(field => {
      if (dataToSave[field] !== undefined) {
        dataToSave[field] = percentStrToDecimal(dataToSave[field]);
      }
    });
    // DSCR stays as number/string
    const userDocRef = doc(db, "users", userId);
    await setDoc(
      userDocRef,
      {
        ruleOfThumbMetrics: {
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

// Retrieve Rule of Thumb Metrics fields
export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const userData = userSnapshot.data();
    const ruleOfThumbMetrics = userData.ruleOfThumbMetrics || {};
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