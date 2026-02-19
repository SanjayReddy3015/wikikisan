import { NextResponse } from "next/server"

// ----------------------------------
// Mock User Database (Demo)
// ----------------------------------
const users = [
  {
    id: "1",
    name: "Ravi Kumar",
    mobile: "9876543210",
    email: "ravi@example.com",
    password: "password123", // demo only
    language: "en",
  },
]

// ----------------------------------
// POST: Login
// ----------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { mobile, email, password } = body

    // ------------------------------
    // Validation
    // ------------------------------
    if ((!mobile && !email) || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile/Email and password are required",
        },
        { status: 400 }
      )
    }

    // ------------------------------
    // Find User
    // ------------------------------
    const user = users.find((u) =>
      mobile ? u.mobile === mobile : u.email === email
    )

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      )
    }

    // ------------------------------
    // Password Check (Demo)
    // ------------------------------
    if (user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      )
    }

    // ------------------------------
    // Success Response
    // ------------------------------
    return NextResponse.json({
      success: true,
      token: `wikikisan_token_${user.id}`,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login API Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
