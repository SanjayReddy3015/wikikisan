import { NextResponse } from "next/server"

// --------------------------------------------------
// Mock Database (Demo Only)
// --------------------------------------------------
const users: any[] = []

// --------------------------------------------------
// POST: Register User
// --------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      mobile,
      email,
      password,
      state,
      district,
      village,
      landSize,
      primaryCrop,
      preferredLanguage,
      role,
    } = body

    // ------------------------------
    // VALIDATION (MATCHES UI)
    // ------------------------------
    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, message: "Invalid name" }, { status: 400 })
    }

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json({ success: false, message: "Invalid mobile number" }, { status: 400 })
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters" }, { status: 400 })
    }

    if (!state || !district || !village) {
      return NextResponse.json({ success: false, message: "Address details required" }, { status: 400 })
    }

    if (!role || !["farmer", "agri_doctor", "agriculture_expert"].includes(role)) {
      return NextResponse.json({ success: false, message: "Invalid role selected" }, { status: 400 })
    }

    // ------------------------------
    // CHECK USER EXISTS
    // ------------------------------
    const exists = users.find(
      (u) => u.mobile === mobile || (email && u.email === email)
    )

    if (exists) {
      return NextResponse.json(
        { success: false, message: "User already registered" },
        { status: 409 }
      )
    }

    // ------------------------------
    // SIMULATE DB DELAY
    // ------------------------------
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // ------------------------------
    // CREATE USER
    // ------------------------------
    const newUser = {
      id: crypto.randomUUID(),
      name,
      mobile,
      email: email || null,
      state,
      district,
      village,
      landSize: landSize || null,
      primaryCrop: primaryCrop || null,
      preferredLanguage: preferredLanguage || "en",
      role,
      createdAt: new Date().toISOString(),
    }

    users.push({
      ...newUser,
      password, // ❗ Demo only – hash in production
    })

    // ------------------------------
    // SUCCESS RESPONSE (UI EXPECTED)
    // ------------------------------
    return NextResponse.json({
      success: true,
      message: "Registration successful",
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    console.error("Register API Error:", error)

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
