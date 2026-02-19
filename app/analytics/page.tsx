"use client"

import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const translations = {
  en: {
    title: "Farm Analytics",
    overview: "Overview",
    backToDashboard: "Back to Dashboard",
    cropYield: "Crop Yield (tons)",
    rainfall: "Rainfall (mm)",
    soilHealth: "Soil Health Index",
  },
  hi: {
    title: "कृषि विश्लेषण",
    overview: "अवलोकन",
    backToDashboard: "डैशबोर्ड पर लौटें",
    cropYield: "फसल उत्पादन (टन)",
    rainfall: "वर्षा (मिमी)",
    soilHealth: "मृदा स्वास्थ्य सूचकांक",
  },
} as const

// 🌾 Sample analytics data (replace with API later)
const cropYieldData = [
  { name: "Wheat", value: 40 },
  { name: "Rice", value: 55 },
  { name: "Maize", value: 30 },
]

const rainfallData = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 35 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 80 },
]

const soilHealthData = [
  { name: "Nitrogen", value: 70 },
  { name: "Phosphorus", value: 60 },
  { name: "Potassium", value: 75 },
]

export default function AnalyticsPage() {
  const router = useRouter()
  const lang = "en" // later connect to global language state

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          🌾 {translations[lang].title}
        </h1>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          {translations[lang].backToDashboard}
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{translations[la]()
