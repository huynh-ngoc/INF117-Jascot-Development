import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// Property Analysis Page Data Fetch

// Send property data to backend
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const {
//       areaAppreciationRate,
//       rentAppreciationRate,
//       dscrRequirement,
//       areaPropertyTaxRate,
//       vacancyRate,
//       operatingExpenses,
//       annualChangeInOc,
//       lessConForUnexpectedCosts
//     } = body;

//     // Fallback validation to ensure all required fields are filled
//     if (
//       !areaAppreciationRate ||
//       !rentAppreciationRate ||
//       !dscrRequirement ||
//       !areaPropertyTaxRate ||
//       !vacancyRate ||
//       !operatingExpenses ||
//       !annualChangeInOc ||
//       !lessConForUnexpectedCosts
//     ) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Currently for investors add onto user, otherwise create new profile for realtors
//     const userDocRef = doc(db, "users", userId);

//     await setDoc(
//       userDocRef,
//       {
//         investmentType,
//         holdingPeriod,
//         acquisitionMargin,
//         outOfState,
//         acquisitionType,
//         operationalPrefs,
//       },
//       { merge: true }
//     );
//     return NextResponse.json({
//       success: true,
//       message: "Investment Preferences saved successfully",
//       userId,
//     });
//   } catch (error) {
//     console.error("Error saving investment preferences:", error);
//     return NextResponse.json(
//       { error: "Failed to save investment preferences" },
//       { status: 500 }
//     );
//   }
// }

// Retrieve existing property
export async function GET() {
  try {
    const userDocRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "Property not found in the database" }, { status: 404 });
    }

    const userData = userSnapshot.data();

    return NextResponse.json({
      success: true,
      property: {
        localRuleOfThumb: {
          areaAppreciationRate: userData.ruleOfThumbMetrics.areaAppreciationRate || "",
          rentAppreciationRate: userData.ruleOfThumbMetrics.rentAppreciationRate || "",
          dscrRequirement: userData.ruleOfThumbMetrics.dscrRequirement || "",
          propertyTaxRate: userData.ruleOfThumbMetrics.propertyTaxRate || "",
          vacancyRate: userData.ruleOfThumbMetrics.vacancyRate || "",
          operatingExpenses: userData.ruleOfThumbMetrics.operatingExpenses || "",
          operatingCostsChange: userData.ruleOfThumbMetrics.operatingCostsChange || "",
          contingency: userData.ruleOfThumbMetrics.contingency || ""
        },
        rehab: {
          amountFinanced: userData.rehabRenovate.amountFinanced || "",
          amountPaid: userData.rehabRenovate.amountPaid || "",
          arv: userData.rehabRenovate.arv || "",
          costOfMaterials: userData.rehabRenovate.costOfMaterials || "",
          holdingCost: userData.rehabRenovate.holdingCost || "",
          overRuns: userData.rehabRenovate.overRuns || "",
          overRunsPct: userData.rehabRenovate.overRunsPct || "",
          subTotal: userData.rehabRenovate.subTotal || "",
          totalRehabBudget: userData.rehabRenovate.totalRehabBudget || ""
        },
        test: {
          investmentType: userData.investmentType || "",
          holdingPeriod: userData.holdingPeriod || "",
          acquisitionMargin: userData.acquisitionMargin || "",
          outOfState: userData.outOfState || "",
          acquisitionType: userData.acquisitionType || "",
          operationalPrefs: userData.operationalPrefs || "",
        },
      }
    });
  } catch (error) {
    console.error("Error: Failed to retrieve property data from database:", error);

    return NextResponse.json(
      { error: "Failed to retrieve property data from database" },
      { status: 500 }
    );
  }
}