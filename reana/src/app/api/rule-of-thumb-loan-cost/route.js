import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

function percentToDecimal(val) {
  if (typeof val === 'string' && val.trim().endsWith('%')) {
    return parseFloat(val.replace('%', '')) / 100;
  }
  if (typeof val === 'number') {
    return val > 1 ? val / 100 : val;
  }
  return val;
}

// POST: Save rule-of-thumb loan cost data
export async function POST(request) {
  try {
    const body = await request.json();
    let { costs, disposition } = body;
    // Convert percent fields to decimals
    costs = (costs || []).map(item => ({
      ...item,
      percent: percentToDecimal(item.percent)
    }));
    if (disposition) {
      disposition = {
        ...disposition,
        percent: percentToDecimal(disposition.percent)
      };
    }
    const userDocRef = doc(db, "users", userId);
    await setDoc(
      userDocRef,
      {
        ruleOfThumbLoanCost: {
          costs,
          disposition,
          lastUpdated: new Date().toISOString()
        },
      },
      { merge: true }
    );
    return NextResponse.json({ success: true, message: "Loan cost data saved successfully" });
  } catch (error) {
    console.error("Error saving loan cost data:", error);
    return NextResponse.json({ error: "Failed to save loan cost data" }, { status: 500 });
  }
}

// GET: Retrieve rule-of-thumb loan cost data
export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    const userData = userSnapshot.data();
    const ruleOfThumbLoanCost = userData.ruleOfThumbLoanCost || {};
    return NextResponse.json({ success: true, ruleOfThumbLoanCost });
  } catch (error) {
    console.error("Error retrieving loan cost data:", error);
    return NextResponse.json({ error: "Failed to retrieve loan cost data" }, { status: 500 });
  }
} 