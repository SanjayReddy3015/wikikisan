import { NextResponse } from "next/server"

// In-memory OTP store (replace with Redis / DB in production)
const otpStore = new Map<
  string,
  { otp: string; expiresAt: number; attempts: number }
>()

const OTP_EXPIRY_TIME = 5 * 60 * 1000 // 5 minutes
const MAX_ATTEMPTS = 3

export async function POST(request: Request) {
  try {
    const { mobile } = await request.json()

    // ✅ Validate Indian mobile number
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number",
        },
        { status: 400 }
      )
    }

    // 🔒 Prevent OTP spam
    const existing = otpStore.get(mobile)
    if (existing && existing.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many OTP requests. Please try later.",
        },
        { status: 429 }
      )
    }

    // 🔢 Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    otpStore.set(mobile, {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY_TIME,
      attempts: (existing?.attempts || 0) + 1,
    })

    // ⏳ Simulate SMS delay (replace with SMS API)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // 🧪 Development logging
    console.log(`🌾 WikiKisan OTP for ${mobile}: ${otp}`)

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      data: {
        mobile,
        expiresInSeconds: OTP_EXPIRY_TIME / 1000,
      },
    })
  } catch (error) {
    console.error("OTP Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP. Please try again.",
      },
      { status: 500 }
    )
  }
}
