import { NextResponse } from "next/server"

// ------------------------------
// Mock Database (Demo Only)
// ------------------------------
const users: any[] = []

// ------------------------------
// POST: Create New Farmer Account
// ------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      phone,
      email,
      password,
      state,
      district,
      farmSize,
      primaryCrop,
      language = "en",
    } = body

    // ------------------------------
    // Basic Validation
    // ------------------------------
    if (!name || !phone || !password || !state || !district) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      )
    }

    // Indian phone number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Indian mobile number",
        },
        { status: 400 }
      )
    }

    // ------------------------------
    // Check Existing User
    // ------------------------------
    const exists = users.find(
      (u) => u.phone === phone || (email && u.email === email)
    )

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      )
    }

    // ------------------------------
    // Simulate Processing Delay
    // ------------------------------
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // ------------------------------
    // Create User (Password NOT hashed – demo only)
    // ------------------------------
    const newUser = {
      id: crypto.randomUUID(),
      name,
      phone,
      email: email || null,
      state,
      district,
      farmSize: farmSize || null,
      primaryCrop: primaryCrop || null,
      language,
      createdAt: new Date().toISOString(),
    }

    users.push({
      ...newUser,
      password, // ❗ hash in real app
    })

    // ------------------------------
    // Response (No password leak)
    // ------------------------------
    return NextResponse.json({
      success: true,
      message: "Farmer account created successfully",
      data: {
        user: newUser,
        token: `wikikisan_mock_token_${newUser.id}`,
      },
    })
  } catch (error) {
    console.error("Signup Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
