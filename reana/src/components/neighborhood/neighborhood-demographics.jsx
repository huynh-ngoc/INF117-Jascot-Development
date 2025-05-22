"use client"

import React, { useState, useEffect } from "react"
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
  Legend,
  BarChart,
  Bar,
  CartesianGrid } from "recharts"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function NeighborhoodDemographics({ address }) {
    const [data, setData] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [censusData, setCensusData] = useState(null);
    const [loadingCensus, setLoadingCensus] = useState(false);

    // Fetch data from openAI API
    useEffect(() => {
    setLoadingData(true);
    fetch(`/api/demographics-data?address=${encodeURIComponent(address)}`)
        .then((res) => res.json())
        .then(fullData => {   
            setData(fullData)
        })
        .catch((err) => {
        console.error('Failed to fetch property data:', err);
        })
        .finally(() => setLoadingData(false));
    }, [address]);

    // Fetch data from Census API
    useEffect(() => {
        if (!address) return
        setLoadingCensus(true)  
        fetch(`/api/demographics-census-data?address=${encodeURIComponent(address)}`)
          .then(async (res) => {
            const json = await res.json()
            if (!res.ok) {
              throw new Error(json.error || 'Failed to fetch demographics data')
            }
            setCensusData(json)
          })
          .catch((err) => {console.error('Failed to fetch property data:', err);})
          .finally(() => setLoadingCensus(false))
      }, [address])
    
    const loading = loadingData || loadingCensus;
    if (loading) return <p>Loading demographics details…</p>;
    if (!data || !censusData)   return <p className="text-red">Unable to load demographics details.</p>;

    const { nearestCity, employment, neighborhood } = data.demographics;
    const { acsResJson, population, addressMatch, employmentTrend, schoolDistricts } = censusData;

    const totalPop = acsResJson.B01003_001E
    const white = acsResJson.B02001_002E
    const black = acsResJson.B02001_003E
    const aian = acsResJson.B02001_004E
    const asian = acsResJson.B02001_005E
    const other = acsResJson.B02001_006E
    const twoOrMore = acsResJson.B02001_008E
    const medianIncome = acsResJson.B19013_001E
    const unemployed = acsResJson.B23025_005E
    const laborForce = acsResJson.B23025_003E
    const unemploymentRate = laborForce > 0 ? ((unemployed / laborForce) * 100).toFixed(1) : null
    const popHistory = [
        { year: 2020, Population: Number(population['2020']) },
        { year: 2021, Population: Number(population['2021']) },
        { year: 2022, Population: Number(population['2022']) },
        { year: 2023, Population: Number(population['2023']) }
    ]
    const ethnicityData = [
        { name: 'White',   value: Number(((white/totalPop)*100).toFixed(1)) },
        { name: 'Black',   value: Number(((black/totalPop)*100).toFixed(1)) },
        { name: 'AIAN',    value: Number(((aian/totalPop)*100).toFixed(1)) },
        { name: 'Asian',   value: Number(((asian/totalPop)*100).toFixed(1)) },
        { name: 'Other',   value: Number(((other/totalPop)*100).toFixed(1)) },
        { name: 'Two+',    value: Number(((twoOrMore/totalPop)*100).toFixed(1)) },
      ]
    const employHistory =[
        { year: '2020', Employed: Number(employmentTrend['2020']) },
        { year: '2021', Employed: Number(employmentTrend['2021']) },
        { year: '2022', Employed: Number(employmentTrend['2022']) },
        { year: '2023', Employed: Number(employmentTrend['2023']) },
      ]
  

function getCardSizes(section) {
    const collapsedHeight = 210

    if (section.chartData?.trend || section.chartData?.ethnicity) {
        return { collapsedSize: { height: collapsedHeight }, expandedSize: { height: 540 } }
    }
    if (section.chartData?.employmentTrend) {
        return { collapsedSize: { height: collapsedHeight }, expandedSize: { height: 600 } }
    }
    // default
    return { collapsedSize: { height: collapsedHeight }, expandedSize: { height: 300 } }
    }

const demographicCard = [
    {
      id: 1,
      title: "Population Data",
      icon: Users,
      iconColor: "text-blue-600",
      badge: { label: "2023", variant: "secondary" },
      summary: {
        text: "There are approximately "+totalPop+" residents"
      },
      chartData: {
        trend: popHistory,
        ethnicity: ethnicityData
      },
      details: [
        { icon: FileUser, iconColor: "text-red-500", label: "County Population:", value: totalPop },
        { icon: MapPin, iconColor: "text-cyan-500", label: "Nearest Large City:", value: nearestCity.name },
        { icon: Route, iconColor: "text-amber-500", label: "Distance to Nearest Large City:", value: nearestCity.distance+" mi" },
        { icon: FileUser, iconColor: "text-lime-600", label: "Population of Nearest Large City:", value: nearestCity.population }
      ]
    }, {
      id: 2,
      title: "Employment & Income",
      icon: Briefcase,
      iconColor: "text-green-600",
      badge: { label: "2024", variant: "secondary" },
      summary: {
        unemployment: unemployed,
        income: medianIncome,
        text: unemploymentRate+" unemployment, "+medianIncome+" median income"
      },
      chartData: {
          employmentTrend: employHistory
      },
      details: [
        { icon: TrendingUp, iconColor: "text-purple-500", label: "Unemployment Rate:", value: unemploymentRate+ " %" },
        { icon: Factory, iconColor: "text-blue-500", label: "Largest Employer:", value: employment.largestEmployer },
        { icon: Users, iconColor: "text-pink-500", label: "Job Sectros:", value: employment.jobSectors },
        { icon: DollarSign, iconColor: "text-yellow-500", label: "Median Income:", value: medianIncome },
        { icon: Clock, iconColor: "text-red-500", label: "Avg Commute Time:", value: employment.averageCommuteTime+" min"  },
        { icon: Route, iconColor: "text-cyan-500", label: "Avg Commute Distance:", value: employment.averageCommuteDistance+" mi"}
      ]
    }, {
      id: 3,
      title: "Neighborhood Data",
      icon: Home,
      iconColor: "text-purple-600",
      badge: { label: "2025", variant: "secondary" },
      summary: {
        text: "The property at this address is located in  "+neighborhood.name
      },
      chartData: null,
      details: [
        { icon: MapPin, iconColor: "text-red-500", label: "Neiborhood Rating:", value: neighborhood.letterRating },
        { icon: TrendingUp, iconColor: "text-blue-500", label: "Crime Rating:", value: neighborhood.crimeRate },
        { icon: School, iconColor: "text-green-500", label: "School District:", value: schoolDistricts }
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
      {demographicCard.map(section => {
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
                            <div style={{ width: '100%', height: 200 }}>
                            <h4 className="…">Population Trend</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={section.chartData.trend}>
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Population" fill="#3b82f6" />
                                </BarChart>
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
                        <div style={{ width: '100%', height: 200 }} className="mb-4">
                        <h4 className="…">Employment Trend</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={section.chartData.employmentTrend}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Employed" fill="#10b981" />
                            </BarChart>
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
