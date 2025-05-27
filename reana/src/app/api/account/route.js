import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

const VALID_ROLES = ["investor", "realtor", "lender", "provider"];
const VALID_PLANS = ["pro", "free", "enterprise"];

// Create Account
export async function POST(request) {
  try {
    const body = await request.json();
    const { accountForm, subscription, selectedRole } = body;

    // Validation
    if (
      !accountForm?.email ||
      !accountForm?.password ||
      !selectedRole?.id ||
      !subscription?.selectedPlan
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: email, password, role, or subscription plan",
        },
        { status: 400 }
      );
    }

    const roleMapping = {
      property_investor: "investor",
      realtor: "realtor",
      lender: "lender",
      service_provider: "provider",
    };

    const userRole = roleMapping[selectedRole.id];

    // Validate role
    if (!userRole || !VALID_ROLES.includes(userRole)) {
      return NextResponse.json(
        {
          error: "Invalid role. Must be investor, realtor, lender, or provider",
        },
        { status: 400 }
      );
    }

    // Validate subscription plan
    if (!VALID_PLANS.includes(subscription.selectedPlan)) {
      return NextResponse.json(
        {
          error: "Invalid subscription plan. Must be pro, free, or enterprise",
        },
        { status: 400 }
      );
    }

    // Validate email match
    if (accountForm.email !== accountForm.verifyEmail) {
      return NextResponse.json(
        { error: "Email addresses do not match" },
        { status: 400 }
      );
    }

    // Validate password match
    if (accountForm.password !== accountForm.verifyPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const timestamp = new Date();

    const userData = {
      email: accountForm.email,
      password: accountForm.password,
      emailPermissions: accountForm.emailPermissions || {
        newFeature: false,
        newsLetter: false,
        saleMarketing: false,
      },
      subscriptionPlan: subscription.selectedPlan,
      role: userRole,
      createdAt: timestamp,
      lastUpdated: timestamp,
    };

    await setDoc(doc(db, "users", userId), userData, { merge: true });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      userId,
      data: userData,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}

// Get Account data
export async function GET() {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      userId,
      data: userDoc.data(),
    });
  } catch (error) {
    console.error("Error retrieving account data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve account data" },
      { status: 500 }
    );
  }
}

// Update Account data
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { updates } = body;

    if (!updates) {
      return NextResponse.json(
        { error: "Missing updates field" },
        { status: 400 }
      );
    }

    if (updates.role && !VALID_ROLES.includes(updates.role)) {
      return NextResponse.json(
        {
          error: "Invalid role. Must be investor, realtor, lender, or provider",
        },
        { status: 400 }
      );
    }

    if (
      updates.subscriptionPlan &&
      !VALID_PLANS.includes(updates.subscriptionPlan)
    ) {
      return NextResponse.json(
        {
          error: "Invalid subscription plan. Must be pro, free, or enterprise",
        },
        { status: 400 }
      );
    }

    const timestamp = new Date();
    const updateData = { ...updates, lastUpdated: timestamp };

    await setDoc(doc(db, "users", userId), updateData, { merge: true });

    return NextResponse.json({
      success: true,
      message: "Account updated successfully",
      data: updateData,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}
