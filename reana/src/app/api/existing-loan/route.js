import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

function cleanLoanFields(fields) {
  return fields.map(f => {
    let value = f.value;
    if (typeof value === 'string') {
      if (f.label.toLowerCase().includes('rate') || f.label.includes('%')) {
        // Convert percent string to decimal
        value = parseFloat(value.replace('%', '')) / 100;
      } else if (f.label.toLowerCase().includes('loan balance') || f.label.toLowerCase().includes('payment')) {
        // Remove $ and commas
        value = parseFloat(value.replace(/[$,]/g, ''));
      }
    }
    return { ...f, value };
  });
}

export async function GET() {
  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  const data = userSnapshot.data().existingLoans || [];
  return NextResponse.json({ success: true, existingLoans: data });
}

export async function POST(request) {
  const body = await request.json();
  const { existingLoans } = body;
  if (!Array.isArray(existingLoans)) {
    return NextResponse.json({ error: "existingLoans must be an array" }, { status: 400 });
  }
  const userDocRef = doc(db, "users", userId);
  await setDoc(userDocRef, { existingLoans }, { merge: true });
  return NextResponse.json({ success: true });
}

// PATCH: Update a specific loan by index
export async function PATCH(request) {
  const body = await request.json();
  const { loanIndex, loanData } = body;
  if (typeof loanIndex !== 'number' || !loanData) {
    return NextResponse.json({ error: "loanIndex and loanData required" }, { status: 400 });
  }
  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);
  let existingLoans = userSnapshot.exists() ? (userSnapshot.data().existingLoans || []) : [];
  // Clean fields before saving
  const cleanedLoan = { ...loanData, fields: cleanLoanFields(loanData.fields) };
  existingLoans[loanIndex] = cleanedLoan;
  await setDoc(userDocRef, { existingLoans }, { merge: true });
  return NextResponse.json({ success: true });
} 