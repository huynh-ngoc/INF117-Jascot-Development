import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// Save Investor Cash Budget
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      downPayment,
      closingCosts,
      inspectionsContractorBids,
      upfrontTaxInsuranceHOA,
      outOfPocketRehabYearOne,
      carryingCostDuringRehabAndRent,
    } = body;

    const totalCashBudget =
      Number(downPayment || 0) +
      Number(closingCosts || 0) +
      Number(inspectionsContractorBids || 0) +
      Number(upfrontTaxInsuranceHOA || 0) +
      Number(outOfPocketRehabYearOne || 0) +
      Number(carryingCostDuringRehabAndRent || 0);

    const cashBudgetData = {
      downPayment: Number(downPayment || 0),
      closingCosts: Number(closingCosts || 0),
      inspectionsContractorBids: Number(inspectionsContractorBids || 0),
      upfrontTaxInsuranceHOA: Number(upfrontTaxInsuranceHOA || 0),
      outOfPocketRehabYearOne: Number(outOfPocketRehabYearOne || 0),
      carryingCostDuringRehabAndRent: Number(
        carryingCostDuringRehabAndRent || 0
      ),
      totalCashBudget: totalCashBudget,
      lastUpdated: new Date(),
    };

    await setDoc(
      doc(db, "users", userId),
      {
        cashBudget: cashBudgetData,
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: "Cash budget saved successfully",
      data: cashBudgetData,
      userId,
    });
  } catch (error) {
    console.error("Error saving cash budget:", error);
    return NextResponse.json(
      { error: "Failed to save cash budget" },
      { status: 500 }
    );
  }
}

// Get Investor Cash Budget
export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnapshot.data();
    const cashBudget = userData.cashBudget;

    if (!cashBudget) {
      return NextResponse.json({
        success: true,
        data: {
          downPayment: 0,
          closingCosts: 0,
          inspectionsContractorBids: 0,
          upfrontTaxInsuranceHOA: 0,
          outOfPocketRehabYearOne: 0,
          carryingCostDuringRehabAndRent: 0,
          totalCashBudget: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: cashBudget,
    });
  } catch (error) {
    console.error("Error retrieving cash budget:", error);
    return NextResponse.json(
      { error: "Failed to retrieve cash budget" },
      { status: 500 }
    );
  }
}

// Update specific budget items
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { updates } = body;

    if (!updates || typeof updates !== "object") {
      return NextResponse.json(
        { error: "Updates object is required" },
        { status: 400 }
      );
    }

    // Get current budget data
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnapshot.data();
    const currentBudget = userData.cashBudget || {};

    const updatedBudget = { ...currentBudget, ...updates };

    updatedBudget.totalCashBudget =
      Number(updatedBudget.downPayment || 0) +
      Number(updatedBudget.closingCosts || 0) +
      Number(updatedBudget.inspectionsContractorBids || 0) +
      Number(updatedBudget.upfrontTaxInsuranceHOA || 0) +
      Number(updatedBudget.outOfPocketRehabYearOne || 0) +
      Number(updatedBudget.carryingCostDuringRehabAndRent || 0);

    updatedBudget.lastUpdated = new Date();

    await setDoc(
      userDocRef,
      {
        cashBudget: updatedBudget,
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: "Cash budget updated successfully",
      data: updatedBudget,
    });
  } catch (error) {
    console.error("Error updating cash budget:", error);
    return NextResponse.json(
      { error: "Failed to update cash budget" },
      { status: 500 }
    );
  }
}
