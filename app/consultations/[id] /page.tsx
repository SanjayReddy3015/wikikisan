"use client"

import { useState } from "react"
import {
  Send,
  Phone,
  Video,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react"

/* ----------------------------------
   MOCK DATA (NO BACKEND REQUIRED)
---------------------------------- */
const MOCK_CONSULTATION: any = {
  subject: "Rice crop leaf disease",
  description: "Leaves are turning yellow with brown spots",
  type: "crop_disease",
  priority: "high",
  status: "resolved",
  createdAt: new Date(),
  cropDetails: {
    cropName: "Rice",
    variety: "BPT-5204",
    area: 2,
    stage: "vegetative",
  },
  expert: {
    name: "Dr. Suresh Rao",
    qualification: "PhD Agriculture",
    specialization: ["crop_disease", "soil_health"],
  },
  diagnosis: {
    condition: "Bacterial Leaf Blight",
    severity: "moderate",
    symptoms: [
      "Yellowing leaves",
      "Brown streaks",
      "Reduced yield",
    ],
    treatment: "Apply copper-based fungicide and improve drainage",
  },
  marketInsights: {
    currentPrice: 2200,
    trend: "rising",
    bestSellingTime: "Next 2 weeks",
  },
  recommendations: [
    {
      title: "Use Copper Fungicide",
      description: "Spray copper oxychloride once in 7 days",
      priority: "high",
      cost: { estimated: 1200 },
      isImplemented: false,
    },
  ],
  messages: [
    {
      sender: { name: "Farmer" },
      message: "My rice leaves have spots",
      timestamp: new Date(),
    },
    {
      sender: { name: "Expert" },
      message: "Looks like bacterial leaf blight",
      timestamp: new Date(),
    },
  ],
}

/* ----------------------------------
   PAGE COMPONENT
---------------------------------- */
export default function ConsultationDetailPage() {
  const [consultation, setConsultation] = useState(MOCK_CONSULTATION)
  const [newMessage, setNewMessage] = useState("")
  const [rating, setRating] = useState(0)

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setConsultation((prev: any) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          sender: { name: "You" },
          message: newMessage,
          timestamp: new Date(),
        },
      ],
    }))
    setNewMessage("")
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold">{consultation.subject}</h1>
          <p className="text-gray-600">{consultation.description}</p>
        </div>

        {/* CROP DETAILS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold mb-2">🌱 Crop Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Crop: {consultation.cropDetails.cropName}</div>
            <div>Variety: {consultation.cropDetails.variety}</div>
            <div>Area: {consultation.cropDetails.area} acres</div>
            <div>Stage: {consultation.cropDetails.stage}</div>
          </div>
        </div>

        {/* DIAGNOSIS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="flex items-center gap-2 font-semibold mb-2">
            <AlertCircle className="text-red-500" /> Diagnosis
          </h2>
          <p className="font-medium">{consultation.diagnosis.condition}</p>
          <p className="text-sm text-gray-600">
            {consultation.diagnosis.treatment}
          </p>
        </div>

        {/* MARKET INSIGHTS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="flex items-center gap-2 font-semibold mb-2">
            <TrendingUp className="text-blue-500" /> Market Insights
          </h2>
          <p>Price: ₹{consultation.marketInsights.currentPrice}</p>
          <p>Trend: {consultation.marketInsights.trend}</p>
          <p>Best Time: {consultation.marketInsights.bestSellingTime}</p>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="flex items-center gap-2 font-semibold mb-2">
            <CheckCircle className="text-green-600" /> Recommendations
          </h2>
          {consultation.recommendations.map((rec: any, i: number) => (
            <div key={i} className="border rounded p-3 mb-2">
              <p className="font-medium">{rec.title}</p>
              <p className="text-sm">{rec.description}</p>
              <p className="text-sm text-gray-500">
                Cost: ₹{rec.cost.estimated}
              </p>
            </div>
          ))}
        </div>

        {/* CHAT */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold mb-3">💬 Messages</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {consultation.messages.map((msg: any, i: number) => (
              <div key={i} className="text-sm">
                <b>{msg.sender.name}:</b> {msg.message}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type message..."
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 rounded"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* RATING */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold mb-2">⭐ Rate Consultation</h2>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className={`text-2xl ${
                  s <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Rating: {rating}/5
          </p>
        </div>

        {/* CONTACT */}
        <div className="bg-white rounded-xl p-6 shadow flex gap-3">
          <button className="flex-1 bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2">
            <Phone size={18} /> Call Expert
          </button>
          <button className="flex-1 bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2">
            <Video size={18} /> Video Call
          </button>
        </div>
      </div>
    </div>
  )
}
