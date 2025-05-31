import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

function percentToDecimal(val) {
  if (typeof val === 'string' && val.trim().endsWith('%')) {
    return parseFloat(val.replace('%', '')) / 100;
  }
  if (typeof val === 'number') {
    // If the value is between 0 and 1 (inclusive), assume it's already a decimal
    // If the value is greater than 1, treat it as a percent and convert
    return val > 1 ? val / 100 : val;
  }
  return val;
}

// POST: Save additional financing data
export async function POST(request) {
  try {
    const body = await request.json();
    let {
      maxLTV,
      isIO,
      rate,
      balloon,
      lenderFee,
      asIs,
      maxLoanAmt,
      userLoanAmt,
      reqDownPay,
      loanAmt2,
      actualLTV,
      monthlyPayment,
      annualPayment,
      selectedFee
    } = body;

    // Convert percentage fields to decimals
    maxLTV = percentToDecimal(maxLTV);
    rate = percentToDecimal(rate);
    lenderFee = percentToDecimal(lenderFee);
    actualLTV = percentToDecimal(actualLTV);

    const userDocRef = doc(db, "users", userId);
    await setDoc(
      userDocRef,
      {
        additionalFinancing: {
          maxLTV,
          isIO,
          rate,
          balloon,
          lenderFee,
          asIs,
          maxLoanAmt,
          userLoanAmt,
          reqDownPay,
          loanAmt2,
          actualLTV,
          monthlyPayment,
          annualPayment,
          selectedFee,
          lastUpdated: new Date().toISOString()
        },
      },
      { merge: true }
    );
    return NextResponse.json({ success: true, message: "Additional financing data saved successfully" });
  } catch (error) {
    console.error("Error saving additional financing data:", error);
    return NextResponse.json({ error: "Failed to save additional financing data" }, { status: 500 });
  }
}

// GET: Retrieve additional financing data
export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    
    const userData = userSnapshot.data();
    const additionalFinancing = userData.additionalFinancing || {};
    
    return NextResponse.json({ success: true, additionalFinancing });
  } catch (error) {
    console.error("Error retrieving additional financing data:", error);
    return NextResponse.json({ error: "Failed to retrieve additional financing data" }, { status: 500 });
  }
} 