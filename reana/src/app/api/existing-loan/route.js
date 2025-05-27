import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      existingLoanBalance,
      interestRate,
      balloonPaymentDue,
      refiAfterMonths,
      monthlyPayment,
    } = body;

    // Validation
    if (
      existingLoanBalance === undefined ||
      interestRate === undefined ||
      monthlyPayment === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "Existing loan balance, interest rate, and monthly payment are required",
        },
        { status: 400 }
      );
    }

    if (typeof existingLoanBalance !== "number" || existingLoanBalance < 0) {
      return NextResponse.json(
        { error: "Existing loan balance must be a positive number" },
        { status: 400 }
      );
    }

    if (
      typeof interestRate !== "number" ||
      interestRate < 0 ||
      interestRate > 100
    ) {
      return NextResponse.json(
        { error: "Interest rate must be between 0 and 100" },
        { status: 400 }
      );
    }

    if (typeof monthlyPayment !== "number" || monthlyPayment < 0) {
      return NextResponse.json(
        { error: "Monthly payment must be a positive number" },
        { status: 400 }
      );
    }

    const annualPayment = monthlyPayment * 12;

    const loanDocRef = doc(db, "users", userId);

    await setDoc(
      loanDocRef,
      {
        existingLoan: {
          existingLoanBalance,
          interestRate,
          balloonPaymentDue: balloonPaymentDue || 0,
          refiAfterMonths: refiAfterMonths || 0,
          monthlyPayment,
          annualPayment,
          lastUpdated: new Date(),
        },
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: "Primary loan saved successfully",
      userId,
    });
  } catch (error) {
    console.error("Error saving existing loan:", error);

    return NextResponse.json(
      { error: "Failed to save loan data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const loanDocRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(loanDocRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json({
        success: true,
        data: {
          existingLoanBalance: 0,
          interestRate: 0,
          balloonPaymentDue: 0,
          refiAfterMonths: 0,
          monthlyPayment: 0,
          annualPayment: 0,
        },
      });
    }

    const userData = userSnapshot.data();
    const existingLoan = userData.existingLoan || {};

    return NextResponse.json({
      success: true,
      data: {
        existingLoanBalance: existingLoan.existingLoanBalance || 0,
        interestRate: existingLoan.interestRate || 0,
        balloonPaymentDue: existingLoan.balloonPaymentDue || 0,
        refiAfterMonths: existingLoan.refiAfterMonths || 0,
        monthlyPayment: existingLoan.monthlyPayment || 0,
        annualPayment: existingLoan.annualPayment || 0,
        lastUpdated: existingLoan.lastUpdated,
      },
    });
  } catch (error) {
    console.error("Error retrieving existing loan:", error);

    return NextResponse.json(
      { error: "Failed to retrieve loan data" },
      { status: 500 }
    );
  }
}
