import { NextResponse } from "next/server"

// --------------------------------------------------
// Shared OTP Store (Demo Only)
// NOTE: Replace with Redis / DB in production
// --------------------------------------------------
declare global {
  var otpStore: Map<
    string,
    { otp: string; expiresAt: number; attempts: number }
  >
}

globalThis.otpStore =
  globalThis.otpStore ||
  new Map<string, { otp: string; expiresAt: number; attempts: number }>()

const otpStore = globalThis.otpStore

const MAX_ATTEMPTS = 3

// --------------------------------------------------
// POST: Verify OTP
// --------------------------------------------------
export async function POST(request: Request) {
  try {
    const { mobile, otp } = await request.json()

    // ------------------------------
    // Validation
    // ------------------------------
    if (!mobile || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number and OTP are required",
        },
        { status: 400 }
      )
    }

    // Indian mobile number validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number",
        },
        { status: 400 }
      )
    }

    const record = otpStore.get(mobile)

    if (!record) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP not found or expired",
        },
        { status: 400 }
      )
    }

    // ------------------------------
    // Expiry Check
    // ------------------------------
    if (Date.now() > record.expiresAt) {
      otpStore.delete(mobile)
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired",
        },
        { status: 400 }
      )
    }

    // ------------------------------
    // Attempt Limit Check
    // ------------------------------
    if (record.attempts >= MAX_ATTEMPTS) {
      otpStore.delete(mobile)
      return NextResponse.json(
        {
          success: false,
          message: "Too many attempts. Please request a new OTP",
        },
        { status: 429 }
      )
    }

    // ------------------------------
    // OTP Match Check
    // ------------------------------
    if (record.otp !== otp) {
      record.attempts += 1
      otpStore.set(mobile, record)

      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
          attemptsLeft: MAX_ATTEMPTS - record.attempts,
        },
        { status: 401 }
      )
    }

    // ------------------------------
    // SUCCESS
    // ------------------------------
    otpStore.delete(mobile)

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      data: {
        mobile,
        verified: true,
      },
    })
  } catch (error) {
    console.error("OTP Verify Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify OTP",
      },
      { status: 500 }
    )
  }
}
