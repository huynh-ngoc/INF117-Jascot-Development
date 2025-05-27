import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

function isMoneyField(label) {
  const moneyFieldLabels = [
    'Loan Amount',
    'Monthly Payment',
    'Annual Payment',
    'Balloon Payment',
    'First Draw',
    'Asking Price',
    'Rehab Costs',
    'Max Loan Amount',
    'User Loan Amount'
  ];
  return moneyFieldLabels.some(moneyLabel => label.includes(moneyLabel));
}

function percentStrToDecimal(str) {
  if (typeof str === 'string' && str.trim().endsWith('%')) {
    return parseFloat(str.replace('%', '')) / 100;
  }
  return str;
}

function decimalToPercentStr(num) {
  if (typeof num === 'number') {
    return (num * 100).toFixed(2) + '%';
  }
  return num;
}

function cleanMoneyValue(value) {
  if (typeof value === 'string') {
    // Remove $ and commas, then convert to number
    return parseFloat(value.replace(/[$,]/g, '')) || 0;
  }
  return value;
}

// POST: Save or update loan terms for a specific loan type
export async function POST(request) {
  try {
    const body = await request.json();
    const { loanType, terms } = body;
    if (!loanType || !terms) {
      return NextResponse.json({ error: "loanType and terms are required" }, { status: 400 });
    }
    
    // Process fields based on their type
    const newFields = (terms.fields || []).map(f => {
      if (typeof f.value === 'string' && f.value.trim().endsWith('%')) {
        // Handle percentage fields
        return { ...f, value: percentStrToDecimal(f.value) };
      } else if (isMoneyField(f.label)) {
        // Handle money fields - store as number without $ or commas
        return { ...f, value: cleanMoneyValue(f.value) };
      }
      return f;
    });

    const userDocRef = doc(db, "users", userId);
    await setDoc(
      userDocRef,
      {
        loanTerms: {
          [loanType]: { fields: newFields },
        },
      },
      { merge: true }
    );
    return NextResponse.json({ success: true, message: "Loan terms saved successfully" });
  } catch (error) {
    console.error("Error saving loan terms:", error);
    return NextResponse.json({ error: "Failed to save loan terms" }, { status: 500 });
  }
}

// GET: Retrieve all loan terms for the user
export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    
    const userData = userSnapshot.data();
    const loanTerms = userData.loanTerms || {};
    
    // Process the data for display
    const result = {};
    for (const [key, section] of Object.entries(loanTerms)) {
      if (section && Array.isArray(section.fields)) {
        result[key] = {
          fields: section.fields.map(f => {
            // Handle percentage fields
            if (typeof f.value === 'number' && 
                (f.label.toLowerCase().includes('percent') || 
                 f.label.includes('%') || 
                 f.label.toLowerCase().includes('ltv') || 
                 f.label.toLowerCase().includes('rate') || 
                 f.label.toLowerCase().includes('fee'))) {
              return { ...f, value: decimalToPercentStr(f.value) };
            }
            // Money fields are returned as numbers - frontend will handle $ display
            return f;
          })
        };
      } else {
        result[key] = section;
      }
    }
    return NextResponse.json({ success: true, loanTerms: result });
  } catch (error) {
    console.error("Error retrieving loan terms:", error);
    return NextResponse.json({ error: "Failed to retrieve loan terms" }, { status: 500 });
  }
} 