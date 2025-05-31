import { NextResponse } from "next/server";
import { db } from "@/lib/firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

// GET /api/properties/[propertyId]/analysis - Get user's analysis
export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { propertyId } = resolvedParams;

    console.log("Fetching analysis for property:", propertyId);

    const docRef = doc(db, "analyses", propertyId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No analysis found for property:", propertyId);
      return NextResponse.json({
        success: true,
        analysis: {
          unitMix: [],
          financing: {},
          operatingBudget: {},
          rehabData: {},
          hasUnsavedChanges: false,
        },
      });
    }

    const analysisData = docSnap.data();
    console.log("Analysis found:", analysisData);

    return NextResponse.json({
      success: true,
      analysis: analysisData,
    });
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return NextResponse.json(
      { error: "Failed to fetch analysis", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/properties/[propertyId]/analysis - Save user's analysis
export async function POST(request, { params }) {
  try {
    const resolvedParams = await params;
    const { propertyId } = resolvedParams;
    const { analysisData } = await request.json();

    console.log("Saving analysis for property:", propertyId, analysisData);

    const analysisDoc = {
      propertyId,
      unitMix: analysisData.unitMix || [],
      financing: analysisData.financing || {},
      operatingBudget: analysisData.operatingBudget || {},
      rehabData: analysisData.rehabData || {},
      hasUnsavedChanges: false,
      lastUpdated: new Date(),
      savedAt: new Date(),
    };

    const docRef = doc(db, "analyses", propertyId);
    await setDoc(docRef, analysisDoc, { merge: true });

    console.log("Analysis saved successfully for:", propertyId);

    return NextResponse.json({
      success: true,
      propertyId,
      analysis: analysisDoc,
    });
  } catch (error) {
    console.error("Error saving analysis:", error);
    return NextResponse.json(
      { error: "Failed to save analysis", details: error.message },
      { status: 500 }
    );
  }
}
