import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDocs, setDoc, collection } from "firebase/firestore";

const userId = process.env.DEFAULT_USER_ID;

// GET: return an array of all properties of the user
export async function GET() {
  try {
    const propertiesRef = collection(db, 'users', userId, 'properties');
    const snapshot = await getDocs(propertiesRef);
    
    if (snapshot.empty) {
      return NextResponse.json(
        { properties: [] },
        { status: 200 }
      );
    }

    const properties = [];
    snapshot.forEach((doc) => {
      properties.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return NextResponse.json({ properties }, { status: 200 });
  } catch (err) {
    console.error('GET /api/property-list error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
