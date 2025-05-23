import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

// Send Account data to backend
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, emailPermissions, plan, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;

    const userData = {
      email,
      emailPermissions: emailPermissions || [],
      plan: plan || "free",
      role: role || "investor",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
    };

    // 4. Store user data in Firestore using the auth UID
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, userData);

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      userId: userId,
    });
  } catch (error) {
    console.error("Error creating account:", error);

    // Handle Firebase Auth specific errors with better messages
    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json(
        { error: "Email address is already in use" },
        { status: 400 }
      );
    }

    if (error.code === "auth/weak-password") {
      return NextResponse.json(
        { error: "Password is too weak" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Failed to create account: ${error.message}` },
      { status: 500 }
    );
  }
}

// Retrieve Account data (need to implement sessions/authentication)
