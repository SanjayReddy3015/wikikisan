"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Droplets,
  Thermometer,
  Calendar,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Leaf,
  Bug,
  Shield,
  Star
} from "lucide-react"
import { useRouter } from "next/navigation"

/* ---------------- MOCK CROP DATA ---------------- */

const MOCK_CROP = {
  cropName: "Rice",
  category: "Cereal",
  season: "Kharif",
  duration: 120,
  recommendationScore: 88,
  profitability: "high",
  waterRequirement: "high",
  riskFactor: "medium",

  climateRequirements: {
    temperature: { min: 20, max: 35, optimal: 28 },
    rainfall: { min: 1000, max: 2000, optimal: 1500 },
    humidity: { min: 60, max: 80 }
  },

  suitableSoils: ["clay", "loamy"],

  sowingTime: { start: "June", end: "July" },
  harvestTime: { start: "October", end: "November" },
  spacing: { rowToRow: 20, plantToPlant: 15 },
  seedRate: { value: 40, unit: "kg/acre" },

  fertilizers: [
    {
      name: "Urea",
      quantity: "50 kg/acre",
      timing: "30 days after sowing",
      method: "Broadcast"
    }
  ],

  irrigation: {
    frequency: "Every 7 days",
    method: "Flood irrigation",
    criticalStages: ["Tillering", "Flowering"]
  },

  expectedYield: { min: 40, max: 60, average: 50 },
  marketPrice: { min: 1800, max: 2400, average: 2100 },

  investmentRequired: {
    seeds: 2000,
    fertilizers: 3000,
    pesticides: 1500,
    labor: 4000,
    irrigation: 2000,
    total: 12500
  },

  pestManagement: [
    {
      pest: "Stem Borer",
      symptoms: ["Dead hearts", "White heads"],
      organicTreatment: ["Neem oil spray"],
      chemicalTreatment: ["Chlorpyrifos"],
      preventiveMeasures: ["Timely planting"]
    }
  ],

  diseaseManagement: [
    {
      disease: "Bacterial Leaf Blight",
      symptoms: ["Yellow leaves", "Brown streaks"],
      organicTreatment: ["Trichoderma"],
      chemicalTreatment: ["Copper fungicide"],
      preventiveMeasures: ["Proper drainage"]
    }
  ]
}

/* ---------------- PAGE ---------------- */

export default function CropDetailsPage() {
  const router = useRouter()
  const crop = MOCK_CROP

  const getProfitabilityColor = (value: string) => {
    if (value === "high") return "bg-green-500"
    if (value === "medium") return "bg-yellow-400"
    return "bg-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <button
            onClick={() => router.push("/crop-advisor")}
            className="flex items-center gap-2 border px-3 py-2 rounded bg-white"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow">
            <Star className="text-yellow-500" />
            {crop.recommendationScore}/100
          </div>
        </motion.div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6">
          {crop.cropName} ({crop.season})
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Stat icon={<Calendar />} label="Duration" value={`${crop.duration} days`} />
          <Stat icon={<TrendingUp />} label="Profitability" value={crop.profitability} badge={getProfitabilityColor(crop.profitability)} />
          <Stat icon={<Droplets />} label="Water" value={crop.waterRequirement} />
          <Stat icon={<AlertTriangle />} label="Risk" value={crop.riskFactor} />
        </div>

        {/* CLIMATE */}
        <Section title="Climate Requirements" icon={<Thermometer />}>
          Optimal Temp: {crop.climateRequirements.temperature.optimal}°C<br />
          Rainfall: {crop.climateRequirements.rainfall.optimal} mm
        </Section>

        {/* ECONOMICS */}
        <Section title="Economics" icon={<DollarSign />}>
          Expected Yield: {crop.expectedYield.average} quintals/hectare<br />
          Market Price: ₹{crop.marketPrice.average}/quintal
        </Section>

        {/* INVESTMENT */}
        <Section title="Investment Required" icon={<TrendingUp />}>
          Total Cost: ₹{crop.investmentRequired.total}
        </Section>

        {/* PESTS */}
        <Section title="Pest Management" icon={<Bug />}>
          {crop.pestManagement.map((p, i) => (
            <div key={i} className="border p-3 rounded mb-2 bg-white">
              <b>{p.pest}</b><br />
              Treatment: {p.chemicalTreatment.join(", ")}
            </div>
          ))}
        </Section>

        {/* DISEASE */}
        <Section title="Disease Management" icon={<Shield />}>
          {crop.diseaseManagement.map((d, i) => (
            <div key={i} className="border p-3 rounded mb-2 bg-white">
              <b>{d.disease}</b><br />
              Treatment: {d.chemicalTreatment.join(", ")}
            </div>
          ))}
        </Section>

      </div>
    </div>
  )
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Section({ title, icon, children }: any) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="font-semibold flex items-center gap-2 mb-2">
        {icon} {title}
      </h2>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  )
}

function Stat({ icon, label, value, badge }: any) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`font-semibold ${badge ? badge + " text-white rounded px-2" : ""}`}>
        {value}
      </p>
    </div>
  )
}
