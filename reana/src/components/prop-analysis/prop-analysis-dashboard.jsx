"use client"
import { useState } from 'react';
import {
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Paintbrush,
  Plus,
  Map,
  Home,
  ChartColumn,
  ChevronDown,
  ChevronUp,
  BarChart2,
  MapPin,
  Download,
  MapPinHouse,
  HandCoins,
  CircleDollarSign,
  DollarSign,
  PencilRuler,
  PiggyBank,
  ClipboardPlus,
  Wallet,
  Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PopoverBody,
  PopoverButton,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation'

// Get address image from Google Street View  
const getStreetViewUrl = (address) => {
  const size = "550x300";
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const loc = encodeURIComponent(address);
  return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${loc}&key=${key}`;
};

export default function PropAnalysisDashboard({ address }) {
  const router = useRouter()
  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const streetViewUrl = getStreetViewUrl(address);

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setTimeout(() => setIsExpanded(false), 200);
    }
  };
  const [isExpanded, setIsExpanded] = useState(false);

  // Sample card data
  const cardData = {
    title: address,
    description: "A brief overview of the property.",
    image: "/api/placeholder/600/400"
  };

  const investmentTypes = ["Long Term Rental(LTR)", "Short Term Rental(STR)", "Fix & Flip", "Brrr"];
  const financingTypes = ["Pay Cash(No Financing)",
    "Conventional Loan",
    "DSCR Bridge Loan(Fix & Flip)",
    "DSCR Bridge Loan + Permanent Loan(Brrr)",
    "Seller Financing"];
  const askingPrice = "$149,900";
  const arvDefault = "17500";
  const metrics = {
    daysOnMarket: 45,
    units: 4,
    sqft: 2400,
    age: 15,
    beds: 3,
    baths: 2,
    photo: "/api/placeholder/300/200",
  };

  const incomeData = {
    current: 18600,
    scheduled: 24600,
    projected: 33000,
  };

  const ruleOfThumb = {
    appreciation: "6.00%",
    rentAppreciation: "4.50%",
    dscr: 1.15,
    taxRate: "2.16%",
    vacancy: "9.90%",
    operatingExpenses: "50%",
    opCostChange: "3%",
    contingency: "12.50%",
  };

  const operatingBudgetActions = ["Use \"Rule of Thumb\"", "Detail Your Projections"];

  const operatingBudget = {
    gsi: 32400,
    expenses: 12960,
    noi: 19440,
    cashFlow: -3120,
  };

  const financingActions = ["Use \"Rule of Thumb\"", "Use \"Detailed\""]
  const financingTerms = {
    annualDebtService: 9055,
    totalBorrowed: 103500,
  };

  const rehabActions = ["Light-Rehab", "Medium Rehab", "Heavy Rehab"];

  const rehabData = {
    condition: "Light-Rehab",
    totalBudget: 18315,
    cashPaid: 18315,
    financed: 0,
  };

  const settlementActions = ["Edit Rule of Thumb", "Use Detailed Costs"];

  const offerStructure = {
    listPrice: 149900,
    arValue: 175000,
    onePctCurrentRents: 155000,
    onePctARRents: 275000,
    grmOffer: 6.18,
    grmArv: 5.30,
    pricePerUnitAsIs: 38333,
    pricePerUnitArv: 58333,
    pricePerSqFtAsIs: 53.24,
    pricePerSqFtArv: 81.02,
    capRateAsIs: "3.22%",
    capRateArv: "7.01%",
    desiredMarginPct: "70%",
    profitMargin: "65.71%",
    desiredPrice: 122500,
    myOffer: 115000,
    profit: 28720,
    profitPct: "20.23%",
  };

  const cashConsider = {
    close: 18055,
    investment: 35813
  };

  const cashFlow = {
    netOp: 19440,
    dscr: 1.73,
    cashReturn: "100.85%"
  }

  // More actions
  const PropertyActions = [{
    icon: <ImageIcon className="w-4 h-4" />,
    label: "More Photos",
    action: () => console.log("Showing More Photos"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Main Building Features",
    action: () => console.log("Showing Main Building Features"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Appliance Count",
    action: () => console.log("Showing Appliance Count"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Additional Structures",
    action: () => console.log("Showing Additional Structures"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Utilities",
    action: () => console.log("Showing Utilities"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Lot Characteristics",
    action: () => console.log("Showing Lot Characteristics"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Lot Characteristics",
    action: () => console.log("Showing Lot Characteristics"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Condition Assessment",
    action: () => console.log("Showing Condition Assessment"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Zoning & Easements",
    action: () => console.log("Showing Zoning & Easements"),
  }, {
    icon: <ImageIcon className="w-4 h-4" />,
    label: " Property History",
    action: () => console.log("Showing Property History"),
  },
  ]
  const NeiborhoodActions = [{
    icon: <Map className="w-4 h-4" />,
    label: "Map",
    variant: "default",
    action: () => {
      router.push(`/neighborhood-map?address=${encodeURIComponent(address)}`);
    }
  }, {
    icon: <ChartColumn className="w-4 h-4" />,
    label: "Demograpphics",
    variant: "default",
    action: () => {
      router.push(`/neighborhood-demographics?address=${encodeURIComponent(address)}`);
    }
  }, {
    icon: null,
    label: "Environmental Risks",
    action: () => console.log("Showing Environmental Risks"),
  }, {
    icon: null,
    label: "Location Risk Audit",
    action: () => console.log("Showing Location Risk Audit"),
  }, {
    icon: null,
    label: "Walkabiliity Score",
    action: () => console.log("Showing Walkabiliity Score"),
  }, {
    icon: null,
    label: "School Ratings",
    action: () => console.log("Showing School Ratings"),
  }
  ]

  // Animation variants
  const cardVariants = {
    collapsed: {
      maxWidth: "27rem",
      width: "100%",
      x: 0,
      y: 0
    },
    expanded: {
      maxWidth: "42rem",
      width: "80%",
      x: 0,
      y: 0,
    }
  };

  const MotionCard = motion.create(Card);
  const MotionCardContent = motion.create(CardContent);
  const MotionCardHeader = motion.create(CardHeader);
  const MotionCardTitle = motion.create(CardTitle);
  const MotionCardDescription = motion.create(CardDescription);
  const MotionCardFooter = motion.create(CardFooter);

  return (
    <div className="flex flex-col min-h-screen p-4 relative">
      <div className="flex flex-grow mb-8">
        {/* Left Column - 1/3 width */}
        <div className="w-1/3 pr-4">
          {/* Backdrop when expanded */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          <div>
            {isExpanded && (
              <div 
                className="invisible mb-5" 
                style={{ 
                  height: '27rem',
                  width: '100%'
                }}
              />
            )}
            <MotionCard
              className={`overflow-visible ${isExpanded ?
                'z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                : 'self-start mb-6'}`}
              initial="collapsed"
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={cardVariants}
              layoutId="expandable-card"
              transition={{ type: "spring", duration: 0.6 }}
            >
              {/* Card Image */}
              <motion.div 
                layoutId="card-image-container" 
                className="overflow-hidden"
              >
                <motion.img
                  src={streetViewUrl} 
                  alt="Street View"
                  className={`w-full object-cover transition-all duration-500 ${isExpanded ? 'h-64' : 'h-48'}`}
                  layoutId="card-image"
                  style={{
                    scale: isExpanded ? 1.15 : 1,
                    transition: "scale 0.6s ease"
                  }}
                />
              </motion.div>

              {/* Card Header */}
              <MotionCardHeader className="flex flex-row items-start justify-between space-y-0 -mb-5" layout="position">
                <div>
                  <MotionCardTitle layoutId="card-title" className={`transition-all duration-300 ${isExpanded ? 'text-2xl' : 'text-xl'}`}>
                    {cardData.title}
                  </MotionCardTitle>
                  <MotionCardDescription layout="position" className="mt-5">
                    {cardData.description}
                  </MotionCardDescription>
                </div>

                <motion.div layout="position">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleToggle}
                    className="rounded-full"
                    asChild
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-[#E5E5E5] text-secondary-foreground"
                    >
                      {isExpanded ? 
                        <Minimize2 className="text-secondary-foreground" size={18} /> 
                        : <Maximize2 className="text-secondary-foreground" size={18} />}
                    </motion.button>
                  </Button>
                </motion.div>
              </MotionCardHeader>

              {/* Card Content */}
              <MotionCardContent className="pt-0" layout="position">
                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-visible space-y-6"
                    >
                      <Separator className="my-4" />

                      {/* Dropdowns and price field */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Type of Investment</label>
                          <Select defaultValue={investmentTypes[0]}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {investmentTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Select Financing Type</label>
                          <Select defaultValue={financingTypes[0]}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Financing" />
                            </SelectTrigger>
                            <SelectContent>
                              {financingTypes.map((f) => (
                                <SelectItem key={f} value={f}>{f}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Asking / List Price</label>
                          <div className="text-lg font-semibold">{askingPrice}</div>
                        </div>
                      </div>

                      {/* ARV + Sale Comps button */}
                      <div className="flex items-end space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">After Rehab Value (ARV)</label>
                          <Input defaultValue={arvDefault} />
                        </div>
                        <Button variant="secondary">
                          Sale Comps
                        </Button>
                      </div>

                      {/* Metrics grid */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">Days on Market</label>
                          <div>{metrics.daysOnMarket}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1"># of Units</label>
                          <div>{metrics.units}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Sq Ft Total</label>
                          <div>{metrics.sqft}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Building Age</label>
                          <div>{metrics.age} yrs</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Tot Bedrooms</label>
                          <div>{metrics.beds}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Tot Bathrooms</label>
                          <div>{metrics.baths}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </MotionCardContent>

              {/* Card Footer */}
              <MotionCardFooter className={`flex justify-${isExpanded ? 'end' : 'start'} pt-0`} layout="position">
                <AnimatePresence mode="wait">
                  {!isExpanded && (
                    <motion.div
                      key="collapsed-action"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PopoverRoot>
                        <PopoverTrigger>
                          <div className="flex justify-between items-center gap-2">
                            <Plus /> More Actions
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          side="top"
                          sideOffset={8}
                          align="end"
                          className="w-100 h-60 z-50"
                        >
                          <PopoverBody className="grid grid-cols-2 gap-2">
                            {PropertyActions.map((action, index) => (
                              <PopoverButton key={index} onClick={action.action}>
                                {action.icon}
                                <span>{action.label}</span>
                              </PopoverButton>
                            ))}
                          </PopoverBody>
                        </PopoverContent>
                      </PopoverRoot>
                    </motion.div>
                  )}
                </AnimatePresence>
              </MotionCardFooter>
            </MotionCard>
          </div>

          <div>
            <Card className="w-full mb-6">
              <CardHeader className="flex flex-col w-full">
                <CardTitle className="flex justify-between items-center">
                  <Home className="w-6 h-6 mr-2" />The Neighborhood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {NeiborhoodActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={action.action}
                      variant={`${action.variant|| 'disabled' }`}
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Right Column - 2/3 width */}
        <div className="w-2/3 space-y-4 overflow-y-auto max-h-screen">
          <div className="grid grid-cols-1 gap-4">
            {/* Income */}
            <SectionCard
              title="Income"
              icon={<HandCoins className="text-blue-500" />}
              items={[{
                title: "Total Current Revenue (Annual)",
                content: "$" + incomeData.current
              }, {
                title: "Total Scheduled Revenue (Annual)",
                content: "$" + incomeData.scheduled
              }, {
                title: "Total Projected Revenue (Annual)",
                content: "$" + incomeData.projected
              }
              ]}
              buttons={[
                {
                  label: "Unit Mix & Rent Variables",
                  icon: <ClipboardPlus className="w-4 h-4" />,
                  onClick: () => router.push(`/income-unit-mix`),
                },
                {
                  label: "Tennancy Details",
                  icon: <Plus className="w-4 h-4" />,
                  onClick: () => console.log("Tennancy Details"),
                  variant: "disabled"
                },
                {
                  label: "Rental Comps",
                  icon: <MapPinHouse className="w-4 h-4" />,
                  onClick: () => router.push(`/rental-comps?address=${encodeURIComponent(address)}`)
                }
              ]}
            />
            {/* Rule of Thumb */}
            <SectionCard
              title="Local Rule of Thumb (Know Your Market)"
              icon={<PencilRuler className="text-slate-500 dark:text-neutral-400" />}
              items={[{
                title: "Area Appreciation Rate (5 yr running avg.)",
                content: ruleOfThumb.appreciation
              }, {
                title: "Rent Appreciation Rate (5 yr running avg.)",
                content: ruleOfThumb.rentAppreciation
              }, {
                title: "DSCR Requirement (Check with your Lender)",
                content: ruleOfThumb.dscr
              }, {
                title: "Area Property Tax Rate",
                content: ruleOfThumb.taxRate
              }, {
                title: "Area Vacancy Rate (Current)",
                content: ruleOfThumb.vacancy
              }, {
                title: "Operating Expenses",
                content: ruleOfThumb.operatingExpenses
              }, {
                title: "Annual change in Operating Costs",
                content: ruleOfThumb.opCostChange
              }, {
                title: "Less Contingency for unexpected Costs (10-15%)",
                content: ruleOfThumb.contingency
              },
              ]}
              buttons={[]}
            />
            {/* Operating Budget */}
            <SectionCard
              title="Operating Budget"
              icon={<CircleDollarSign className="text-lime-500" />}
              items={[
                {
                  title: "Gross Scheduled Inc. (GSI)",
                  content: "$" + operatingBudget.gsi
                }, {
                  title: "Operating Expenses",
                  content: "$" + operatingBudget.expenses
                }, {
                  title: "Net Operating Inc. (NOI)",
                  content: "$" + operatingBudget.noi
                }, {
                  title: "Cash Flow Yr 1",
                  content: "$" + operatingBudget.cashFlow
                }, {
                  title: "Operating Budget Choices",
                  content: (
                    <Select defaultValue={operatingBudgetActions[0]}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Financing" />
                      </SelectTrigger>
                      <SelectContent>
                        {operatingBudgetActions.map((f) => (
                          <SelectItem key={f} value={f}>{f}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                }
              ]}
              buttons={[]}
            />
            {/* Financing */}
            <SectionCard
              title="Financing Terms"
              icon={<PiggyBank className="text-red-500" />}
              items={[
                {
                  title: "Payment Amount (Annual Debt Service)",
                  content: "$" + financingTerms.annualDebtService
                }, {
                  title: "Total Amount Borrowed",
                  content: "$" + financingTerms.totalBorrowed
                },{
                  title: "Loan Costs",
                  content: (
                    <Select defaultValue={financingActions[0]}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Financing" />
                      </SelectTrigger>
                      <SelectContent>
                        {financingActions.map((f) => (
                          <SelectItem key={f} value={f}>{f}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                }
              ]}
              buttons={[
                {
                  label: "Detail Loan Terms",
                  icon: <ClipboardPlus className="w-4 h-4" />,
                  onClick: () => console.log("Detail Loan Terms"),
                }
              ]}
            />
            {/* Rehab/Renovate */}
            <SectionCard
              title="Rehab/Renovate"
              icon={<DollarSign className="text-purple-500" />}
              items={[
                {
                  title: "Property Condition ",
                  content: (
                    <Select defaultValue={rehabActions[0]}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Financing" />
                      </SelectTrigger>
                      <SelectContent>
                        {rehabActions.map((f) => (
                          <SelectItem key={f} value={f}>{f}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                }, {
                  title: "Total Rehab Budget",
                  content: "$" + rehabData.totalBudget
                }, {
                  title: "Amount of Rehab to be Paid with Cash",
                  content: "$" + rehabData.cashPaid
                }, {
                  title: "Amount of Rehab Financed",
                  content: "$" + rehabData.financed
                }
              ]}
              buttons={[
                {
                  label: "Quick Calculate",
                  icon: <Wallet className="w-4 h-4" />,
                  onClick: () => router.push(`/rehab-renovation`)
                }, {
                  label: "DSCR Loan Rehab Calculator",
                  icon: <Calculator className="w-4 h-4" />,
                  variant: "disabled",
                  onClick: () => console.log("DSCR Loan Rehab Calculator"),
                }, {
                  label: "Initial Rehab Estimater",
                  icon: <Calculator className="w-4 h-4" />,
                  variant: "disabled",
                  onClick: () => console.log("Initial Rehab Estimater"),
                }
              ]}
            />
          </div>
          {/* Settlement */}
          <Card>
            <CardHeader><CardTitle>Settlement / Escrow / Attorney Costs</CardTitle></CardHeader>
            <CardContent className="flex space-x-2">
              {settlementActions.map(action => <Button variant="disabled" key={action}>{action}</Button>)}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Structure Your Offer */}
      <div className="w-full mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-slate-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Structure Your Offer</h2>
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">Current Property Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Current List Price:</span>
                  <span className="font-medium">${offerStructure.listPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">1% Rule Current Rents:</span>
                  <span className="font-medium">${offerStructure.onePctCurrentRents.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">GRM @ Offer Price:</span>
                  <span className="font-medium">{offerStructure.grmOffer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Price per Unit (As-Is):</span>
                  <span className="font-medium">${offerStructure.pricePerUnitAsIs.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Price per Sq Ft (As-Is):</span>
                  <span className="font-medium">${offerStructure.pricePerSqFtAsIs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">As-Is Cap Rate:</span>
                  <span className="font-medium">{offerStructure.capRateAsIs}</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">After Rehab Projections</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">After Rehab Value:</span>
                  <span className="font-medium">${offerStructure.arValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">1% Rule AR Rents:</span>
                  <span className="font-medium">${offerStructure.onePctARRents.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">GRM ARV:</span>
                  <span className="font-medium">{offerStructure.grmArv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Price per Unit (ARV):</span>
                  <span className="font-medium">${offerStructure.pricePerUnitArv.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Price per Sq Ft (ARV):</span>
                  <span className="font-medium">${offerStructure.pricePerSqFtArv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Cap Rate (ARV):</span>
                  <span className="font-medium">{offerStructure.capRateArv}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Desired Acquisition Margin: <span className="font-medium">{offerStructure.desiredMarginPct}</span></p>
                <p className="text-gray-600 dark:text-gray-300">Profit Margin @ 1 yr: <span className="font-medium">{offerStructure.profitMargin}</span></p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300 mb-2">Desired Price: <span className="font-medium">${offerStructure.desiredPrice.toLocaleString()}</span></p>
                <p className="text-gray-600 dark:text-gray-300">Profit: <span className="font-medium">${offerStructure.profit.toLocaleString()} ({offerStructure.profitPct})</span></p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-center bg-[#00A3E0] dark:bg-blue-700 text-white px-12 py-4 rounded-lg shadow-lg">
                <p className="text-lg">My Offer</p>
                <p className="text-3xl font-bold">${offerStructure.myOffer.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cash Considerations & Cash Flow Metrics */}
      <div className="w-full mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-slate-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">Cash Considerations (My Investment)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Cash to Close :</span>
                  <span className="font-medium">${cashConsider.close.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Cash Investment Through Year One:</span>
                  <span className="font-medium">${cashConsider.investment.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">Cash Flow Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Net Operating Inc. (NOI)</span>
                  <span className="font-medium">${cashFlow.netOp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">DSCR Ratio </span>
                  <span className="font-medium">{cashFlow.dscr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Cash on Cash Return w/One Yr. hold </span>
                  <span className="font-medium">{cashFlow.cashReturn}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">Additional Notes</h3>
              <Input className="h-30"/>
            </div>
          <div className="flex justify-center items-center mt-4">  
            <Button className="text-center px-12 py-4 ">Save</Button>
          </div>
        </div>
      </div>
    </div>

  );
}
function SectionCard({ title, icon, items, buttons }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border border-zinc-950/10 dark:border-zinc-50/10 bg-white dark:bg-zinc-900 dark:boarder rounded-lg shadow-md overflow-hidden">
      <div
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100">{title}</h2>
        </div>
        {isExpanded ?
          <ChevronUp className="text-gray-500" /> :
          <ChevronDown className="text-gray-500" />
        }
      </div>

      {isExpanded && (
        <div className="border-t border-gray-300 dark:border-gray-500">
          {items.map((item, index) => (
            <div key={index} className="p-4 border-b border-gray-200 dark:border-gray-500 last:border-b-0">
              <h3 className="font-medium dark:text-zinc-100 text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-800 dark:text-zinc-300 text-xl">{item.content}</p>
            </div>
          ))}
          {buttons.length > 0 && (
            <div className="p-4 flex flex-wrap gap-2 justify-center bg-gray-50 dark:bg-zinc-800">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={`${button.variant|| 'default'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    button.onClick();
                  }}
                >
                  {button.icon && button.icon}
                  <span>{button.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}