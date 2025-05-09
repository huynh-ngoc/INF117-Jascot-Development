"use client"

import React from "react"
import {
  Users,
  TrendingUp,
  Briefcase,
  Home,
  MapPin,
  DollarSign,
  Clock,
  FileUser,
  Route,
  Factory,
  ChartLine,
  School
} from "lucide-react"
import { 
  Expandable, 
  ExpandableCard, 
  ExpandableCardContent, 
  ExpandableCardFooter, 
  ExpandableCardHeader, 
  ExpandableContent, 
  ExpandableTrigger } from "@/components/ui/expandable"
import { Badge } from "@/components/ui/badge"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend } from "recharts"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function NeighborhoodDemographics({ address }) {

function getCardSizes(section) {
    const collapsedHeight = 210
    // const collapsedHeight = section.chartData ? baseCollapsed + 60 : baseCollapsed

    if (section.chartData?.trend || section.chartData?.ethnicity) {
        return { collapsedSize: { height: collapsedHeight }, expandedSize: { height: 520 } }
    }
    if (section.chartData?.employmentTrend) {
        return { collapsedSize: { height: collapsedHeight }, expandedSize: { height: 650 } }
    }
    // default
    return { collapsedSize: { height: collapsedHeight }, expandedSize: { height: 300 } }
    }

    
// Example Data
const data = [
    {
      id: 1,
      title: "Population Data",
      icon: Users,
      iconColor: "text-blue-600",
      badge: { label: "Feb 2025", variant: "secondary" },
      summary: {
        population: 10326,
        changePercent: 1.59,
        text: "10,326 residents, up 1.59%"
      },
      chartData: {
        trend: [
          { year: 2021, population: 11893 },
          { year: 2022, population: 10326 },
          { year: 2023, population: 13453 },
          { year: 2024, population: 17252 }
        ],
        ethnicity: [
          { name: "White", value: 91.3 },
          { name: "Two+ races", value: 3.1 },
          { name: "Hispanic", value: 1.31 },
          { name: "African American", value: 0.95 },
          { name: "Other", value: 0.91 }
        ],
      },
      details: [
        { icon: FileUser, iconColor: "text-red-500", label: "County Population:", value: "69,000 (Madison County)" },
        { icon: MapPin, iconColor: "text-cyan-500", label: "Nearest City:", value: "Syracuse, New York" },
        { icon: Route, iconColor: "text-amber-500", label: "Distance to Nearest Large City:", value: "30 miles east" },
        { icon: FileUser, iconColor: "text-lime-600", label: "Population of Nearest Large City:", value: "142,000" }
      ]
    }, {
      id: 2,
      title: "Employment & Income",
      icon: Briefcase,
      iconColor: "text-green-600",
      badge: { label: "Sep 2024", variant: "secondary" },
      summary: {
        unemployment: 3.30,
        income: 56044,
        text: "3.30% unemployment, $56k median income"
      },
      chartData: {
          employmentTrend: [
              { period: '2023 Q2', rate: 3.6 },
              { period: '2023 Q3', rate: 3.2 },
              { period: '2023 Q4', rate: 3.3 },
              { period: '2024 Q1', rate: 4.1 },
              { period: '2024 Q2', rate: 3.3 }
            ]
      },
      details: [
        { icon: TrendingUp, iconColor: "text-purple-500", label: "Unemployment Rate:", value: "3.30%" },
        { icon: ChartLine, iconColor: "text-green-500", label: "Unemployment Trend:", value: "Stable, gradual growth" },
        { icon: Factory, iconColor: "text-blue-500", label: "Largest Employer:", value: "Oneida Healthcare" },
        { icon: Users, iconColor: "text-pink-500", label: "Job Sectros:", value: "healthcare, manufacturing, retail, education" },
        { icon: DollarSign, iconColor: "text-yellow-500", label: "Median Income:", value: "$56,044" },
        { icon: Clock, iconColor: "text-red-500", label: "Avg Commute Time:", value: "20.4 min" },
        { icon: Route, iconColor: "text-cyan-500", label: "Avg Commute Distance:", value: "N/A" }
      ]
    }, {
      id: 3,
      title: "Neighborhood Data",
      icon: Home,
      iconColor: "text-purple-600",
      badge: { label: "Feb 2025", variant: "secondary" },
      summary: {
        crime: "Low",
        text: "Low crime, sufficient education resources"
      },
      chartData: null,
      details: [
        { icon: MapPin, iconColor: "text-red-500", label: "Neiborhood Name:", value: address },
        { icon: TrendingUp, iconColor: "text-blue-500", label: "Crime Rating:", value: "Below national average" },
        { icon: School, iconColor: "text-green-500", label: "School District:", value: "Oneida City School District" }
      ]
    }
  ]
  return (
    <div className="p-4 w-full max-w-full mx-auto mb-15 space-y-15">
      <header>
        <h2 className="flex justify-center text-2xl font-bold mt-5">
          {address}
        </h2>
      </header>
      {data.map(section => {
        const Icon = section.icon
        const { collapsedSize, expandedSize } = getCardSizes(section)
        return (
          <Expandable key={section.id} expandDirection="vertical" expandBehavior="replace">
            {({ isExpanded }) => (
              <ExpandableTrigger>
                <ExpandableCard 
                  className="w-full" 
                  collapsedSize={collapsedSize} 
                  expandedSize={expandedSize}>
                  <ExpandableCardHeader>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center">
                        <h2 className={`font-semibold text-3xl flex items-center`}>
                          <Icon className={`w-8 h-8 mr-2 ${section.iconColor}`} />
                          {section.title}
                        </h2>
                        {section.badge && <Badge variant={section.badge.variant}>{section.badge.label}</Badge>}
                      </div>
                      {!isExpanded && 
                      <p className="text-xl dark:text-gray-300 text-gray-800 mt-5">{section.summary.text}</p>}
                    </div>
                  </ExpandableCardHeader>

                  <ExpandableCardContent>
                    <ExpandableContent preset="blur-md">
                      {section.chartData && section.chartData.trend && section.chartData.ethnicity && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="flex items-center text-l font-medium text-gray-700 dark:text-gray-200 mb-2">
                              <TrendingUp className="w-4 h-4 mr-1 text-green-500" /> Population Trend
                            </h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <LineChart data={section.chartData.trend}>
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="population" stroke="#3b82f6" strokeWidth={2} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                          <div>
                            <h4 className="flex items-center text-l font-medium text-gray-700 dark:text-gray-200 mb-2">
                              <Users className="w-4 h-4 mr-1 text-yellow-500" /> Ethnicity
                            </h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <PieChart>
                                <Pie data={section.chartData.ethnicity} dataKey="value" nameKey="name" outerRadius={60} label>
                                  {section.chartData.ethnicity.map((enter, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Legend verticalAlign="bottom" height={10} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}

                      {section.chartData && section.chartData.employmentTrend && (
                        <div className="mb-4">
                          <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <TrendingUp className="w-4 h-4 mr-1 text-green-500" /> Employment Trend
                          </h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={section.chartData.employmentTrend}>
                              <XAxis dataKey="period" />
                              <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} />
                              <Tooltip />
                              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} dot />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}        

                      <ul className="text-sm text-gray-700 space-y-2 ">
                        {section.details.map((d, i) => {
                          const DetailIcon = d.icon
                          return (
                            <li key={i} className="flex items-center">
                              <DetailIcon className={`w-4 h-4 mr-1 ${d.iconColor}`} />
                              <strong className="dark:text-gray-200 text-l ">{d.label}</strong>
                              <span className="text-2xl dark:text-gray-200 font-bold ml-3">{d.value}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </ExpandableContent>
                  </ExpandableCardContent>

                  <ExpandableCardFooter>
                    {!isExpanded && 
                    <span className="text-sm text-gray-500">Tap to view more</span>}
                  </ExpandableCardFooter>
                </ExpandableCard>
              </ExpandableTrigger>
            )}
          </Expandable>
        )
      })}
    </div>
  )
}
