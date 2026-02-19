"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Clock,
  CheckCircle,
  User,
  MessageSquare,
  TrendingUp,
  Stethoscope,
} from "lucide-react"

/* -------------------------------------
   MOCK DATA
------------------------------------- */
const MOCK_CONSULTATIONS: any[] = [
  {
    _id: "1",
    subject: "Rice leaf disease",
    description: "Leaves turning yellow with brown spots",
    type: "crop_disease",
    priority: "high",
    status: "resolved",
    createdAt: new Date(),
    cropDetails: {
      cropName: "Rice",
      variety: "BPT-5204",
      area: 2,
    },
    expert: { name: "Dr. Suresh Rao" },
    analytics: {
      messagesExchanged: 6,
      recommendationsGiven: 2,
    },
    rating: { score: 4.5 },
    activeRecommendations: [
      { title: "Apply copper fungicide" },
    ],
  },
]

const statusColors: any = {
  open: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
}

/* -------------------------------------
   PAGE
------------------------------------- */
export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState(MOCK_CONSULTATIONS)
  const [search, setSearch] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [newConsultation, setNewConsultation] = useState({
    subject: "",
    description: "",
    cropName: "",
    area: "",
  })

  const filtered = consultations.filter(c =>
    c.subject.toLowerCase().includes(search.toLowerCase())
  )

  const createConsultation = () => {
    if (!newConsultation.subject || !newConsultation.description) return

    setConsultations(prev => [
      {
        _id: crypto.randomUUID(),
        subject: newConsultation.subject,
        description: newConsultation.description,
        type: "general",
        priority: "medium",
        status: "open",
        createdAt: new Date(),
        cropDetails: {
          cropName: newConsultation.cropName,
          area: newConsultation.area,
        },
      },
      ...prev,
    ])

    setShowCreate(false)
    setNewConsultation({
      subject: "",
      description: "",
      cropName: "",
      area: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Expert Consultations</h1>
            <p className="text-gray-600">
              Get professional advice from agriculture experts
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus size={18} /> New Consultation
          </button>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search consultations..."
              className="w-full pl-10 pr-4 py-2 border rounded"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {filtered.map(c => (
            <div key={c._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{c.subject}</h3>
                    <p className="text-gray-600 text-sm">{c.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${statusColors[c.status]}`}>
                  {c.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {c.createdAt.toLocaleString()}
                </span>
                {c.expert && (
                  <span className="flex items-center gap-1">
                    <User size={14} /> {c.expert.name}
                  </span>
                )}
                {c.analytics && (
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} /> {c.analytics.messagesExchanged} messages
                  </span>
                )}
              </div>

              {c.activeRecommendations && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-1">Recommendations</p>
                  <div className="flex gap-2">
                    {c.activeRecommendations.map((r: any, i: number) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {r.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <TrendingUp size={40} className="mx-auto mb-4" />
              No consultations found
            </div>
          )}
        </div>

        {/* CREATE MODAL */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">New Consultation</h2>

              <input
                placeholder="Subject"
                className="w-full border p-2 mb-3 rounded"
                value={newConsultation.subject}
                onChange={(e) => setNewConsultation({ ...newConsultation, subject: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full border p-2 mb-3 rounded"
                value={newConsultation.description}
                onChange={(e) => setNewConsultation({ ...newConsultation, description: e.target.value })}
              />
              <input
                placeholder="Crop Name"
                className="w-full border p-2 mb-3 rounded"
                value={newConsultation.cropName}
                onChange={(e) => setNewConsultation({ ...newConsultation, cropName: e.target.value })}
              />
              <input
                placeholder="Area (acres)"
                className="w-full border p-2 mb-4 rounded"
                value={newConsultation.area}
                onChange={(e) => setNewConsultation({ ...newConsultation, area: e.target.value })}
              />

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={createConsultation}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
