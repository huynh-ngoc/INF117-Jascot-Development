"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  Calculator,
  Save,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import RehabRenovateForm, {
  RehabRenovateData,
} from "../forms/rehab-renovate-form";
import { auth, db } from "@/lib/firebase";
import { generatePropertyId } from "@/lib/propertyUtils";

// Get address image from Google Street View
const getStreetViewUrl = (address) => {
  const size = "550x300";
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const loc = encodeURIComponent(address);
  return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${loc}&key=${key}`;
};

// Helper functions
function parseAddressString(addressString) {
  const parts = addressString.split(",").map((s) => s.trim());
  return {
    street: parts[0],
    city: parts[1],
    state: parts[2]?.split(" ")[0],
    zip: parts[2]?.split(" ")[1],
  };
}

function toPctString(valueDecimal) {
  const num = Number(valueDecimal ?? 0);
  return (num * 100).toFixed(2) + "%";
}

async function checkPropertyExists(propertyId) {
  try {
    const response = await fetch(`/api/properties/${propertyId}`);
    if (response.ok) {
      const { property } = await response.json();
      return property;
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchAIPropertyData(address) {
  try {
    const response = await fetch(
      `/api/property-data?address=${encodeURIComponent(
        address.street +
          ", " +
          address.city +
          ", " +
          address.state +
          " " +
          address.zip
      )}`
    );
    const data = await response.json();

    console.log("Raw AI property data:", data);

    return {
      askingPrice: data.askingPrice || 0,
      propertyMetrics: {
        daysOnMarket: data.propertyMetrics?.daysOnMarket || 0,
        numberOfUnits: data.propertyMetrics?.numberOfUnits || 1,
        propertySize: data.propertyMetrics?.propertySize || 0,
        propertyAge: data.propertyMetrics?.propertyAge || 0,
        numberOfbedrooms: data.propertyMetrics?.numberOfbedrooms || 0,
        numberOfbathrooms: data.propertyMetrics?.numberOfbathrooms || 0,
        lotSize: data.propertyMetrics?.lotSize || 0,
        yearBuilt:
          data.propertyMetrics?.yearBuilt ||
          new Date().getFullYear() - (data.propertyMetrics?.propertyAge || 10),
        parking: data.propertyMetrics?.parking || "Unknown",
        propertyType: data.propertyMetrics?.propertyType || "Residential",
        // Add any other fields from your AI response
      },
      mlsNumber: data.mlsNumber || null,
      // Include any other data fields your AI provides
    };
  } catch (error) {
    console.error("Error fetching AI data:", error);
    return {
      askingPrice: 0,
      propertyMetrics: {
        daysOnMarket: 0,
        numberOfUnits: 1,
        propertySize: 0,
        propertyAge: 0,
        numberOfbedrooms: 0,
        numberOfbathrooms: 0,
      },
      mlsNumber: null,
    };
  }
}
export default function PropAnalysisDashboard({ address: propAddress }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Core state
  const [propertyId, setPropertyId] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [address, setAddress] = useState(propAddress);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Analysis state
  const [analysisState, setAnalysisState] = useState({
    unitMix: [],
    ruleOfThumb: {},
    financing: {},
    operatingBudget: {},
    rehabData: {},
    hasUnsavedChanges: false,
  });

  // Loan scenarios
  const [loanScenarios, setLoanScenarios] = useState([]);
  const [activeLoanScenario, setActiveLoanScenario] = useState(null);

  // UI state
  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingDatabase, setLoadingDatabase] = useState(false);
  const [selectedInvestmentType, setSelectedInvestmentType] = useState(
    "Long Term Rental(LTR)"
  );
  const [selectedFinancingType, setSelectedFinancingType] = useState(
    "Pay Cash(No Financing)"
  );
  const [rehabData, setRehabData] = useState({ totalBudget: 0, cashPaid: 0 });
  const [open, setOpen] = useState(false);
  const [hasInitialDataLoaded, setHasInitialDataLoaded] = useState(false);

  // Property management integration
  useEffect(() => {
    const addressParam = searchParams.get("address");
    const propertyIdParam = searchParams.get("propertyId");

    if (propertyIdParam) {
      // Direct property access
      loadExistingProperty(propertyIdParam);
    } else if (addressParam || propAddress) {
      // New address from search
      handleNewAddressFlow(addressParam || propAddress);
    } else {
      setError("No property specified");
      setIsLoading(false);
    }
  }, [searchParams, propAddress]);

  const handleNewAddressFlow = async (addressString) => {
    try {
      setLoadingAI(true);
      const parsedAddress = parseAddressString(addressString);
      const propertyId = generatePropertyId(parsedAddress);

      // Fetch AI data first
      const aiData = await fetchAIPropertyData(parsedAddress);
      console.log("AI Data received:", aiData);

      // Create comprehensive temporary property data
      const tempPropertyData = {
        id: propertyId,
        address: parsedAddress,
        originalAddress: addressString,
        isTemporary: true,
        createdAt: new Date().toISOString(),

        // Basic Info from AI
        basicInfo: {
          numberOfUnits: aiData.propertyMetrics?.numberOfUnits || 1,
          propertySize: aiData.propertyMetrics?.propertySize || 0,
          propertyAge: aiData.propertyMetrics?.propertyAge || 0,
          numberOfbedrooms: aiData.propertyMetrics?.numberOfbedrooms || 0,
          numberOfbathrooms: aiData.propertyMetrics?.numberOfbathrooms || 0,
          lotSize: aiData.propertyMetrics?.lotSize || 0,
          yearBuilt:
            aiData.propertyMetrics?.yearBuilt ||
            new Date().getFullYear() -
              (aiData.propertyMetrics?.propertyAge || 10),
          parking: aiData.propertyMetrics?.parking || "Unknown",
          propertyType: aiData.propertyMetrics?.propertyType || "Residential",
        },

        // Keep original property metrics for backward compatibility
        propertyMetrics: aiData.propertyMetrics || {},

        // Market Data
        marketData: {
          listPrice: aiData.askingPrice || 0,
          daysOnMarket: aiData.propertyMetrics?.daysOnMarket || 0,
          pricePerSqFt:
            aiData.askingPrice && aiData.propertyMetrics?.propertySize
              ? Math.round(
                  aiData.askingPrice / aiData.propertyMetrics.propertySize
                )
              : 0,
          mlsNumber: aiData.mlsNumber || null,
        },

        // Financial defaults for analysis pages
        financialData: {
          offerPrice: aiData.askingPrice || 0,
          arv: Math.round((aiData.askingPrice || 0) * 1.1), // Estimate 10% above asking
          downPaymentPercent: 25,
          interestRate: 6.5,
          loanTerm: 30,
          rehabBudget: 0,
          closingCosts: Math.round((aiData.askingPrice || 0) * 0.03), // 3% estimate
        },

        // Operating data for operating budget pages
        operatingData: {
          gsi: 32000,
          operatingExpenses: 12960,
          noi: 19000,
          cashFlow: 3000,
          vacancy: 5, // 5% default
          operatingExpenseRatio: 35, // 35% default
          propertyTaxRate: 1.2, // 1.2% default
          insurance: Math.round((aiData.askingPrice || 0) * 0.005), // 0.5% of value
          maintenance: Math.round((aiData.askingPrice || 0) * 0.01), // 1% of value
          capEx: Math.round((aiData.askingPrice || 0) * 0.005), // 0.5% of value
        },

        // Local market rules of thumb
        localRuleOfThumb: {
          areaAppreciationRate: 0.04, // 4% default
          rentAppreciationRate: 0.03, // 3% default
          dscrRequirement: 1.25,
          propertyTaxRate: 0.012,
          vacancyRate: 0.05,
          operatingExpenses: 0.35,
          operatingCostsChange: 0.03,
          contingency: 0.1,
        },

        // Standard unit mix
        standardUnitMix: {
          currentRevenue: 18600,
          scheduledRevenue: 24600,
          projectedRevenue: 33000,
        },

        // Rehab data
        rehab: {
          totalRehabBudget: 0,
          amountPaid: 0,
          condition: "Good",
          rehabItemized: {
            kitchen: 0,
            bathrooms: 0,
            flooring: 0,
            paint: 0,
            hvac: 0,
            plumbing: 0,
            electrical: 0,
            roofing: 0,
            other: 0,
          },
        },

        // Data source tracking
        dataSource: {
          aiGenerated: true,
          lastUpdated: new Date().toISOString(),
          confidence: 0.85,
        },
      };

      // Store comprehensive data
      localStorage.setItem(
        `temp_property_${propertyId}`,
        JSON.stringify(tempPropertyData)
      );
      console.log(
        "Stored comprehensive temporary property data:",
        tempPropertyData
      );

      // Set component state
      setDefaultData(tempPropertyData);
      setPropertyId(propertyId);
      setError("");

      // Navigate with propertyId
      const currentPath = window.location.pathname;
      const newUrl = `${currentPath}?propertyId=${propertyId}`;
      window.history.pushState({}, "", newUrl);
    } catch (error) {
      console.error("Error in new address flow:", error);
      setError("Failed to analyze property");
    } finally {
      setLoadingAI(false);
    }
  };

  const loadExistingProperty = async (propertyId) => {
    try {
      setIsLoading(true);

      // Try to load from database first
      const response = await fetch(`/api/properties/${propertyId}`);
      console.log(response);

      if (response.ok) {
        const { property } = await response.json();
        console.log(property);
        setPropertyData(property);
        setPropertyId(propertyId);
        setData(property); // For backward compatibility
        setAddress(
          property.originalAddress ||
            `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zip}`
        );

        // Load user's analysis if exists
        await loadUserAnalysis(propertyId);
      } else {
        // Property not in database - check localStorage
        const tempData = localStorage.getItem(`temp_property_${propertyId}`);

        if (tempData) {
          const tempProperty = JSON.parse(tempData);
          setPropertyData(tempProperty);
          setPropertyId(propertyId);
          setAddress(tempProperty.originalAddress);

          // Load saved analysis state
          const savedAnalysis = localStorage.getItem(
            "current_property_analysis"
          );
          if (savedAnalysis) {
            const parsed = JSON.parse(savedAnalysis);
            if (parsed.propertyId === propertyId) {
              setAnalysisState(parsed.analysisState);
            }
          }

          // Also fetch AI data for display
          await fetchInitialPropertyData(tempProperty.originalAddress);
        } else {
          // Property doesn't exist anywhere
          setError("Property not found");
        }
      }
    } catch (error) {
      console.error("Error loading property:", error);
      setError("Failed to load property");
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserAnalysis = async (propertyId) => {
    try {
      const response = await fetch(`/api/properties/${propertyId}/analysis`);
      if (response.ok) {
        const { analysis } = await response.json();
        setAnalysisState(analysis);
        setLoanScenarios(analysis.loanScenarios || []);
        setActiveLoanScenario(
          analysis.loanScenarios?.find((s) => s.isPrimary) ||
            analysis.loanScenarios?.[0] ||
            null
        );
      }
    } catch (error) {
      console.error("Error loading user analysis:", error);
    }
  };

  const fetchInitialPropertyData = async (addressString) => {
    if (hasInitialDataLoaded) return; // Prevent duplicate calls

    try {
      setLoadingAI(true);
      setHasInitialDataLoaded(true);
      const response = await fetch(
        `/api/property-data?address=${encodeURIComponent(addressString)}`
      );
      const aiData = await response.json();
      setData(aiData);
    } catch (error) {
      setHasInitialDataLoaded(false); // Reset on error
      console.error("Error fetching AI data:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  // Create property in database when user starts analysis
  const ensurePropertyInDatabase = async () => {
    if (!propertyData?.isTemporary) {
      return propertyId; // Already in database
    }

    try {
      // Get AI data for the property
      const aiData = await fetchAIPropertyData(propertyData.address);
      const propertyPayload = {
        address: propertyData.address,
        propertyMetrics: aiData.propertyMetrics,
        askingPrice: aiData.askingPrice,
        standardUnitMix: aiData.unitMix,
        mlsNumber: aiData.mlsNumber || null,
      };
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyPayload),
      });

      if (response.ok) {
        const { property } = await response.json();

        // Update local state
        setPropertyData({ ...property, isTemporary: false });

        // Clean up localStorage
        localStorage.removeItem(`temp_property_${propertyId}`);

        console.log("Property created in database:", propertyId);
        return propertyId;
      } else {
        throw new Error("Failed to create property");
      }
    } catch (error) {
      console.error("Error creating property in database:", error);
      throw error;
    }
  };

  // Save analysis state to localStorage + database
  const saveAnalysisState = async (newState = {}) => {
    try {
      // Update local state
      const updatedState = {
        ...analysisState,
        ...newState,
        hasUnsavedChanges: true,
      };
      setAnalysisState(updatedState);

      // Save to localStorage immediately
      localStorage.setItem(
        "current_property_analysis",
        JSON.stringify({
          propertyId,
          analysisState: updatedState,
          lastUpdated: new Date().toISOString(),
        })
      );

      // Ensure property exists in database
      await ensurePropertyInDatabase();

      // Save user analysis to database
      const response = await fetch(`/api/properties/${propertyId}/analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysisData: updatedState,
          address: address,
        }),
      });

      if (response.ok) {
        setAnalysisState((prev) => ({ ...prev, hasUnsavedChanges: false }));
        console.log("Analysis saved to database");
      }
    } catch (error) {
      console.error("Error saving analysis:", error);
      // Keep local changes even if database save fails
    }
  };

  // Handle navigation away - warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (analysisState.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [analysisState.hasUnsavedChanges]);

  // Load existing data
  // useEffect(() => {
  //   if (data) {
  //     fetchProperty();
  //   }
  // }, [data]);

  const streetViewUrl = address ? getStreetViewUrl(address) : "";
  const offerPrice = data?.askingPrice || 0;
  const metrics = data?.propertyMetrics || {};

  // Sample card data
  const cardData = {
    title: address || "Property Address",
    description: "✅ This property meets your investment strategy",
    image: "/api/placeholder/600/400",
  };

  const investmentTypes = [
    "Long Term Rental(LTR)",
    "Short Term Rental(STR)",
    "Fix & Flip",
    "Brrr",
  ];
  const financingTypes = [
    "Pay Cash(No Financing)",
    "Conventional Loan",
    "DSCR Bridge Loan(Fix & Flip)",
    "DSCR Bridge Loan + Permanent Loan(Brrr)",
    "Seller Financing",
  ];

  const arv = 175000;
  const incomeData = {
    current: analysisState?.unitMix?.scheduled ?? defaultData?.standardUnitMix?.currentRevenue ?? 0,
    scheduled:  analysisState?.unitMix?.current ?? defaultData?.standardUnitMix?.scheduledRevenue ?? 0,
    projected: analysisState?.unitMix?.projected ?? defaultData?.standardUnitMix?.projectedRevenue ?? 0,
  };

  const ruleOfThumb = {
    appreciation: analysisState?.ruleOfThumb?.appreciation ?? defaultData?.localRuleOfThumb.areaAppreciationRate ?? 0,
    rentAppreciation: analysisState?.ruleOfThumb?.rentAppreciation ?? defaultData?.localRuleOfThumb.rentAppreciationRate?? 0,
    dscr: analysisState?.ruleOfThumb?.dscr ?? defaultData?.localRuleOfThumb.dscrRequirement ?? 0,
    taxRate: analysisState?.ruleOfThumb?.taxRate ?? defaultData?.localRuleOfThumb.propertyTaxRate ?? 0,
    vacancy: analysisState?.ruleOfThumb?.vacancy ?? defaultData?.localRuleOfThumb.vacancyRate ?? 0,
    operatingExpenses: analysisState?.ruleOfThumb?.operatingExpenses ?? defaultData?.localRuleOfThumb.operatingExpenses ?? 0,
    opCostChange: analysisState?.ruleOfThumb?.opCostChange ?? defaultData?.localRuleOfThumb.operatingCostsChange ?? 0,
    contingency: analysisState?.ruleOfThumb?.contingency ?? defaultData?.localRuleOfThumb.contingency ?? 0,
  };

  const operatingBudget = {
    gsi: analysisState?.operatingBudget?.gsi ?? defaultData?.operatingData.gsi ?? 0,
    expenses: analysisState?.operatingBudget?.expenses ?? defaultData?.operatingData.operatingExpenses ?? 0,
    noi: analysisState?.operatingBudget?.noi ?? defaultData?.operatingData.noi ?? 0,
    cashFlow: analysisState?.operatingBudget?.cashFlow ?? defaultData?.operatingData.cashFlow ?? 0,
  };

  // Only display Financing type: conventional financing 
  const financingTerms = {
    annualDebtService: analysisState?.financing?.annualDebtService ?? 0,
    totalBorrowed: analysisState?.financing?.totalBorrowed ?? 0
  };

  const rehabActions = ["Light-Rehab", "Medium Rehab", "Heavy Rehab"];

  const settlementActions = ["Edit Rule of Thumb", "Use Detailed Costs"];

  const offerStructure = {
    desiredMarginPct: 0.7,
    profitMargin: "65.71%",
    desiredPrice: 122500,
    myOffer: 115000,
    profit: 28720,
    profitPct: 20.23,
  };

  const cashConsider = {
    close: 18055,
    investment: 35813,
  };

  // Updated button navigation with propertyId
  const buttons = [
    {
      label: "Unit Mix & Rent Variables",
      icon: <ClipboardPlus className="w-4 h-4" />,
      onClick: () => router.push(`/income-unit-mix?propertyId=${propertyId}`),
    },
    {
      label: "Rental Comps",
      icon: <MapPinHouse className="w-4 h-4" />,
      onClick: () => router.push(`/rental-comps?propertyId=${propertyId}`),
    },
  ];

  // More actions
  const PropertyActions = [
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "More Photos",
      action: () => console.log("Showing More Photos"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Main Building Features",
      action: () => console.log("Showing Main Building Features"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Appliance Count",
      action: () => console.log("Showing Appliance Count"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Additional Structures",
      action: () => console.log("Showing Additional Structures"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Utilities",
      action: () => console.log("Showing Utilities"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Lot Characteristics",
      action: () => console.log("Showing Lot Characteristics"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
    label: "Lot Characteristics",
    action: () => console.log("Showing Lot Characteristics"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Condition Assessment",
      action: () => console.log("Showing Condition Assessment"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Zoning & Easements",
      action: () => console.log("Showing Zoning & Easements"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: " Property History",
      action: () => console.log("Showing Property History"),
    },
  ];

  const NeiborhoodActions = [
    {
      icon: <Map className="w-4 h-4" />,
      label: "Map",
      variant: "default",
      action: () => {
        router.push(`/neighborhood-map?address=${encodeURIComponent(address)}`);
      },
    },
    {
      icon: <ChartColumn className="w-4 h-4" />,
      label: "Demographics",
      variant: "default",
      action: () => {
        router.push(
          `/neighborhood-demographics?address=${encodeURIComponent(address)}`
        );
      },
    },
    {
      icon: null,
      label: "Environmental Risks",
      action: () => console.log("Showing Environmental Risks"),
    },
    {
      icon: null,
      label: "Location Risk Audit",
      action: () => console.log("Showing Location Risk Audit"),
    },
    {
      icon: null,
      label: "Walkability Score",
      action: () => console.log("Showing Walkability Score"),
    },
    {
      icon: null,
      label: "School Ratings",
      action: () => console.log("Showing School Ratings"),
    },
  ];

  // Animation variants
  const cardVariants = {
    collapsed: {
      maxWidth: "27rem",
      width: "100%",
      x: 0,
      y: 0,
    },
    expanded: {
      maxWidth: "42rem",
      width: "80%",
      x: 0,
      y: 0,
    },
  };

  const MotionCard = motion.create(Card);
  const MotionCardContent = motion.create(CardContent);
  const MotionCardHeader = motion.create(CardHeader);
  const MotionCardTitle = motion.create(CardTitle);
  const MotionCardDescription = motion.create(CardDescription);
  const MotionCardFooter = motion.create(CardFooter);

  // Structure Your Offer Calculations
  const calculations = useMemo(() => {
    if (!data || !offerPrice) {
      return {
        onePctCurrentRents: 0,
        onePctARRents: 0,
        grmOffer: 0,
        grmArv: 0,
        pricePerUnitAsIs: 0,
        pricePerUnitArv: 0,
        pricePerSqFtAsIs: 0,
        pricePerSqFtArv: 0,
        capRateAsIs: 0,
        capRateArv: 0,
        desiredPrice: 0,
        dscrRatio: 0,
        cashReturn: 0,
        rehabFinanced: 0,
      };
    }
    const onePctCurrentRents = Math.round(
      incomeData.current / 12 / 0.01
    ).toLocaleString();
    const onePctARRents = Math.round(
      incomeData.projected / 12 / 0.01
    ).toLocaleString();
    const grmOffer = (offerPrice / incomeData.current).toFixed(2);
    const grmArv = (arv / incomeData.projected).toFixed(2);
    const pricePerUnitAsIs = Math.round(
      offerPrice / metrics.numberOfUnits
    ).toLocaleString();
    const pricePerUnitArv = Math.round(
      arv / metrics.numberOfUnits
    ).toLocaleString();
    const pricePerSqFtAsIs = (offerPrice / metrics.propertySize).toFixed(2);
    const pricePerSqFtArv = (arv / metrics.propertySize).toFixed(2);
    const capRateAsIs = (incomeData.current / 2 / offerPrice).toFixed(2) * 100;
    const capRateArv = (incomeData.projected / 2 / arv).toFixed(2) * 100;
    const desiredPrice = Math.round(
      offerStructure.desiredMarginPct * offerPrice
    ).toLocaleString();
    const dscrRatio = Math.round(
      operatingBudget.noi / financingTerms.annualDebtService
    ).toLocaleString();
    const cashReturn = (
      operatingBudget.cashFlow / cashConsider.investment
    ).toFixed(2);
    const rehabFinanced = (
      parseInt(rehabData.totalBudget) - parseInt(rehabData.cashPaid)
    ).toLocaleString();
    return {
      onePctCurrentRents,
      onePctARRents,
      grmOffer,
      grmArv,
      pricePerUnitAsIs,
      pricePerUnitArv,
      pricePerSqFtAsIs,
      pricePerSqFtArv,
      capRateAsIs,
      capRateArv,
      desiredPrice,
      dscrRatio,
      cashReturn,
      rehabFinanced,
    };
  }, [
    data,
    offerPrice,
    metrics,
    incomeData,
    arv,
    offerStructure,
    operatingBudget,
    financingTerms,
    cashConsider,
    rehabData,
  ]);

  // Loading and error states
  const loading = isLoading || loadingAI || loadingDatabase;
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading property details…</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  if (!data && !propertyData)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Unable to load property details</p>
      </div>
    );

  const {
    onePctCurrentRents,
    onePctARRents,
    grmOffer,
    grmArv,
    pricePerUnitAsIs,
    pricePerUnitArv,
    pricePerSqFtAsIs,
    pricePerSqFtArv,
    capRateAsIs,
    capRateArv,
    desiredPrice,
    dscrRatio,
    cashReturn,
    rehabFinanced,
  } = calculations;

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setTimeout(() => setIsExpanded(false), 200);
    }
  };

  const handleInvestmentSelect = (value) => {
    setSelectedInvestmentType(value);
    saveAnalysisState({ investmentType: value });
  };

  const handleFinancingSelect = (value) => {
    setSelectedFinancingType(value);
    saveAnalysisState({ financingType: value });
  };

  const handleScenarioChange = (scenarioId) => {
    const scenario = loanScenarios.find((s) => s.scenarioId === scenarioId);
    setActiveLoanScenario(scenario);
    saveAnalysisState({ activeLoanScenarioId: scenarioId });
  };

  const handleDone = () => {
    setOpen(false);
    const amountPaid = RehabRenovateData[0].amountPaid;
    const total = RehabRenovateData[0].totalBudget;
    setRehabData({ totalBudget: total, cashPaid: amountPaid });
    saveAnalysisState({
      rehabData: { totalBudget: total, cashPaid: amountPaid },
    });
  };

  const handleSave = () => {
    const newState = {
      unitMix:      incomeData,
      ruleOfThumb:  ruleOfThumb,
      operatingBudget: operatingBudget,
      financing:    financingTerms,
      rehabData:    rehabData,
    };
    saveAnalysisState(newState);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 relative">
      {console.log(analysisState)}
      {/* Property Status Indicators */}
      {propertyData?.isTemporary && (
        <div className="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          ⚠️ This analysis is stored locally. Make changes to save permanently.
        </div>
      )}

      {analysisState.hasUnsavedChanges && (
        <div className="mb-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg flex items-center">
          <Save className="w-5 h-5 mr-2" />
          You have unsaved changes
        </div>
      )}

      <div className="flex mb-8 h-[700px]">
        {/* Left Column - 1/3 width */}
        <div className="w-1/3 pr-4 flex flex-col justify-between">
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
                  height: "27rem",
                  width: "100%",
                }}
              />
            )}
            <MotionCard
              className={`overflow-visible ${
                isExpanded
                ? "z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg"
                : "self-start mb-6 bg-white"
              }`}
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
                  className={`w-full object-cover transition-all duration-500 ${
                    isExpanded ? "h-64" : "h-48"
                  }`}
                  layoutId="card-image"
                  style={{
                    scale: isExpanded ? 1.15 : 1,
                    transition: "scale 0.6s ease",
                  }}
                />
              </motion.div>

              {/* Card Header */}
              <MotionCardHeader
                className="flex flex-row items-start justify-between space-y-0 -mb-5"
                layout="position"
              >
                <div>
                  <MotionCardTitle
                    layoutId="card-title"
                    className={`transition-all duration-300 ${
                      isExpanded ? "text-2xl" : "text-xl"
                    }`}
                  >
                    {cardData.title}
                  </MotionCardTitle>
                  <MotionCardDescription layout="position" className="mt-5">
                    {cardData.description}
                  </MotionCardDescription>
                </div>

                <motion.div layout="position">
                  <Button
                    size="icon"
                    onClick={handleToggle}
                    className="rounded-full text-black dark:text-black"
                    asChild
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-[#E5E5E5]"
                    >
                      {isExpanded ? (
                        <Minimize2 size={18} />
                      ) : (
                        <Maximize2 size={18} />
                      )}
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
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-visible space-y-6"
                    >
                      <Separator className="my-4" />

                      {/* Dropdowns and price field */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Type of Investment
                          </label>
                          <Select
                            value={selectedInvestmentType || ""}
                            onValueChange={handleInvestmentSelect}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {investmentTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Select Financing Type
                          </label>
                          <Select
                            value={selectedFinancingType || ""}
                            onValueChange={handleFinancingSelect}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Financing" />
                            </SelectTrigger>
                            <SelectContent>
                              {financingTypes.map((f) => (
                                <SelectItem key={f} value={f}>
                                  {f}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Asking / List Price
                          </label>
                          <div className="text-lg font-semibold">
                            ${offerPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* ARV + Sale Comps button */}
                      <div className="flex items-end space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">
                            After Rehab Value (ARV)
                          </label>
                          <Input defaultValue={arv} />
                        </div>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            router.push(`/sales-comps?propertyId=${propertyId}`)
                          }
                        >
                          Sale Comps
                        </Button>
                      </div>

                      {/* Metrics grid */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Days on Market
                          </label>
                          <div>{metrics.daysOnMarket}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            # of Units
                          </label>
                          <div>{metrics.numberOfUnits}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Sq Ft Total
                          </label>
                          <div>{metrics.propertySize}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Building Age
                          </label>
                          <div>{metrics.propertyAge} yrs</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Tot Bedrooms
                          </label>
                          <div>{metrics.numberOfbedrooms}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Tot Bathrooms
                          </label>
                          <div>{metrics.numberOfbathrooms}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </MotionCardContent>

              {/* Card Footer */}
              <MotionCardFooter
                className={`flex justify-${isExpanded ? "end" : "start"} pt-0`}
                layout="position"
              >
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
                          <div className="flex justify-between items-center gap-2 font-montserrat font-bold">
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
                              <PopoverButton
                                key={index}
                                onClick={action.action}
                              >
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
                  <Home className="w-6 h-6 mr-2" />
                  The Neighborhood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {NeiborhoodActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={action.action}
                      variant={`${action.variant || "disabled"}`}
                      className="text-xs"
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
        <div className="w-2/3 flex flex-col">
          <div className="overflow-y-auto flex-1 space-y-4">
            {/* Income */}
            <SectionCard
              title="Income"
              icon={<HandCoins className="text-blue-500" />}
              items={[
                {
                  title: "Total Current Revenue (Annual)",
                  content: "$ " + incomeData.current.toLocaleString(),
                },
                {
                  title: "Total Scheduled Revenue (Annual)",
                  content: "$ " + incomeData.scheduled.toLocaleString(),
                },
                {
                  title: "Total Projected Revenue (Annual)",
                  content: "$ " + incomeData.projected.toLocaleString(),
                },
              ]}
              buttons={[
                {
                  label: "Unit Mix & Rent Variables",
                  icon: <ClipboardPlus className="w-4 h-4" />,
                  onClick: () =>
                    router.push(`/income-unit-mix?propertyId=${propertyId}`),
                },
                {
                  label: "Tenancy Details",
                  icon: <Plus className="w-4 h-4" />,
                  onClick: () => console.log("Tenancy Details"),
                  variant: "disabled",
                },
                {
                  label: "Rental Comps",
                  icon: <MapPinHouse className="w-4 h-4" />,
                  onClick: () =>
                    router.push(`/rental-comps?propertyId=${propertyId}`),
                },
              ]}
            />

            {/* Rule of Thumb */}
            <SectionCard
              title="Local Rule of Thumb (Know Your Market)"
              icon={
                <PencilRuler className="text-slate-500 dark:text-neutral-400" />
              }
              items={[
                {
                  title: "Area Appreciation Rate (5 yr running avg.)",
                  content: toPctString(ruleOfThumb.appreciation),
                },
                {
                  title: "Rent Appreciation Rate (5 yr running avg.)",
                  content: toPctString(ruleOfThumb.rentAppreciation),
                },
                {
                  title: "DSCR Requirement (Check with your Lender)",
                  content: ruleOfThumb.dscr,
                },
                {
                  title: "Area Property Tax Rate",
                  content: toPctString(ruleOfThumb.taxRate),
                },
                {
                  title: "Area Vacancy Rate (Current)",
                  content: toPctString(ruleOfThumb.vacancy),
                },
                {
                  title: "Operating Expenses",
                  content: toPctString(ruleOfThumb.operatingExpenses),
                },
                {
                  title: "Annual change in Operating Costs",
                  content: toPctString(ruleOfThumb.opCostChange),
                },
                {
                  title: "Less Contingency for unexpected Costs (10-15%)",
                  content: toPctString(ruleOfThumb.contingency),
                },
              ]}
              buttons={[
                {
                  label: "Detail Your Projections",
                  icon: <ClipboardPlus className="w-4 h-4" />,
                  onClick: () => router.push(`/rule-of-thumb-metrics?propertyId=${propertyId}`),
                },
              ]}
            />

            {/* Operating Budget */}
            <SectionCard
              title="Operating Budget"
              icon={<CircleDollarSign className="text-lime-500" />}
              items={[
                {
                  title: "Gross Scheduled Inc. (GSI)",
                  content: "$ " + operatingBudget.gsi.toLocaleString(),
                },
                {
                  title: "Operating Expenses",
                  content: "$ " + operatingBudget.expenses.toLocaleString(),
                },
                {
                  title: "Net Operating Inc. (NOI)",
                  content: "$ " + operatingBudget.noi.toLocaleString(),
                },
                {
                  title: "Cash Flow Yr 1",
                  content: "$ " + operatingBudget.cashFlow.toLocaleString(),
                },
                {
                  title: "Operating Budget Option",
                  content: (
                    <span className="flex space-x-2">
                      <Button
                        variant="secondary"
                        // onClick={() =>
                        //   saveAnalysisState({
                        //     operatingBudgetMethod: "rule-of-thumb",
                        //   })
                        // }
                      >
                        Use "Rule of Thumb"
                      </Button>
                      <Button
                        variant="secondary"
                        // onClick={() =>
                        //   saveAnalysisState({
                        //     operatingBudgetMethod: "detailed",
                        //   })
                        // }
                      >
                        Use "Detailed"
                      </Button>
                    </span>
                  ),
                },
              ]}
              buttons={[
                {
                  label: "Detail Your Projections",
                  icon: <ClipboardPlus className="w-4 h-4" />,
                  onClick: () =>
                    router.push(`/rule-of-thumb-opr-budget?propertyId=${propertyId}`),
                },
              ]}
            />

            {/* Financing Terms */}
            <SectionCard
              title="Financing Terms"
              icon={<PiggyBank className="text-red-500" />}
              items={[
                {
                  title: "Payment Amount (Annual Debt Service)",
                  content: "$ " + financingTerms.annualDebtService.toLocaleString(),
                },
                {
                  title: "Total Amount Borrowed",
                  content: "$ " + financingTerms.totalBorrowed.toLocaleString(),
                },
                {
                  title: "Loan Cost Method",
                  content: (
                    <span className="flex space-x-2">
                      <Button
                        variant={
                          activeLoanScenario?.loanCostMethod === "rule-of-thumb"
                            ? "default"
                            : "secondary"
                        }
                        // onClick={() =>
                        //   saveAnalysisState({ loanCostMethod: "rule-of-thumb" })
                        // }
                      >
                        Use "Rule of Thumb"
                      </Button>
                      <Button
                        variant={
                          activeLoanScenario?.loanCostMethod === "detailed"
                            ? "default"
                            : "secondary"
                        }
                        // onClick={() =>
                        //   router.push(
                        //     `/detailed-lender-fees/${propertyId}/${activeLoanScenario?.scenarioId}`
                        //   )
                        // }
                      >
                        Use "Detailed"
                      </Button>
                    </span>
                  ),
                },
              ]}
              buttons={[
                {
                  label: "Detail Loan Terms",
                  icon: <ClipboardPlus className="w-4 h-4" />,
                  onClick: () =>
                    router.push(`/conventional-financing?propertyId=${propertyId}`),
                },
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
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ),
                },
                {
                  title: "Total Rehab Budget",
                  content: "$ " + rehabData.totalBudget,
                },
                {
                  title: "Amount of Rehab to be Paid with Cash",
                  content: "$ " + rehabData.cashPaid,
                },
                {
                  title: "Amount of Rehab Financed",
                  content: "$ " + rehabFinanced,
                },
                {
                  title: "",
                  content: (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant="secondary">
                          <Wallet className="w-4 h-4" />
                          Quick Calculate
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                        <DialogHeader>
                          <DialogTitle>
                            Rehab & Renovation Quick Calculation
                          </DialogTitle>
                        </DialogHeader>
                        <RehabRenovateForm
                          amountFinanced={financingTerms.annualDebtService}
                          arv={arv}
                        />

                        <DialogFooter>
                          <Button
                            variant="outline"
                            className="bg-gray-300"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleDone}>Done</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ),
                },
              ]}
              buttons={[
                {
                  label: "DSCR Loan Rehab Calculator",
                  icon: <Calculator className="w-4 h-4" />,
                  variant: "disabled",
                  onClick: () => console.log("DSCR Loan Rehab Calculator"),
                },
                {
                  label: "Initial Rehab Estimater",
                  icon: <Calculator className="w-4 h-4" />,
                  variant: "disabled",
                  onClick: () => console.log("Initial Rehab Estimater"),
                },
              ]}
            />

            {/* Settlement */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Settlement / Escrow / Attorney Costs</CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-2">
                {settlementActions.map((action) => (
                  <Button variant="disabled" key={action}>
                    {action}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Structure Your Offer */}
      <div className="w-full mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-slate-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Structure Your Offer
          </h2>
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <div className="flex justify-between text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">
                <h3>Current List Price:</h3>
                <span className="font-medium">
                  ${offerPrice.toLocaleString()}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    1% Rule Current Rents:
                  </span>
                  <span className="font-medium">
                    ${onePctCurrentRents.toLocaleString("en")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    GRM @ Offer Price:
                  </span>
                  <span className="font-medium">{grmOffer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Price per Unit (As-Is):
                  </span>
                  <span className="font-medium">
                    ${pricePerUnitAsIs.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Price per Sq Ft (As-Is):
                  </span>
                  <span className="font-medium">${pricePerSqFtAsIs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Cap Rate (As-Is):
                  </span>
                  <span className="font-medium">{capRateAsIs}%</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <div className="flex justify-between text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">
                <h3>After Rehab Value:</h3>
                <span className="font-medium">${arv.toLocaleString()}</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    1% Rule AR Rents:
                  </span>
                  <span className="font-medium">
                    ${onePctARRents.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    GRM ARV:
                  </span>
                  <span className="font-medium">{grmArv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Price per Unit (ARV):
                  </span>
                  <span className="font-medium">
                    ${pricePerUnitArv.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Price per Sq Ft (ARV):
                  </span>
                  <span className="font-medium">${arv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Cap Rate (ARV):
                  </span>
                  <span className="font-medium">{capRateArv}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-inner mb-4">
            <div className="flex justify-between items-center mb-2 text-xl border-b">
              <span className="text-gray-600 dark:text-gray-300 mb-2">
                Desired Acquisition Margin (% of ARV):
              </span>
              <div className="flex gap-2 items-center">
                <Input
                  className="font-medium w-12 h-min"
                  defaultValue={70}
                ></Input>{" "}
                %
              </div>
            </div>
            <div className="flex justify-between items-center mb-2 text-xl border-b">
              <span className="text-gray-600 dark:text-gray-300 mb-2">
                Desired Acquisition Price:
              </span>
              <span className="font-medium">
                ${desiredPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-xl border-b">
              <span className="text-gray-600 dark:text-gray-300 mb-2">
                Profit Margin @ 1 yr:{" "}
              </span>
              <div className="flex gap-2 items-center">
                <span className="font-medium">
                  ${offerStructure.profit.toLocaleString()}
                </span>
                <span className="font-medium text-gray-500 dark:text-gray-300">
                  |
                </span>
                <span className="font-medium">{offerStructure.profitPct}%</span>
              </div>
            </div>
            <div className="items-center text-right mt-4">
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(`/deal-structure?propertyId=${propertyId}`)
                }
              >
                View Profit Margin Calculation
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-center bg-[#00A3E0] dark:bg-blue-700 text-white px-12 py-4 rounded-lg shadow-lg mt-2">
              <p className="text-lg">My Offer</p>
              <p className="text-3xl font-bold">
                ${offerStructure.myOffer.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Considerations & Cash Flow Metrics */}
      <div className="w-full mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-slate-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">
                Cash Considerations (My Investment)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Cash to Close:
                  </span>
                  <span className="font-medium">
                    ${cashConsider.close.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Cash Investment Through Year One:
                  </span>
                  <span className="font-medium">
                    ${cashConsider.investment.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">
                Cash Flow Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Net Operating Inc. (NOI)
                  </span>
                  <span className="font-medium">
                    ${operatingBudget.noi.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    DSCR Ratio{" "}
                  </span>
                  <span className="font-medium">
                    {dscrRatio.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Cash on Cash Return w/One Yr. hold{" "}
                  </span>
                  <span className="font-medium">{cashReturn}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b pb-2">
              Additional Notes
            </h3>
            <Input className="h-30" />
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button
              className="text-center px-12 py-4"
              onClick={() => handleSave()}
              // disabled={!analysisState.hasUnsavedChanges}
            >
              Save Analysis
            </Button>
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100">
            {title}
          </h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-gray-500" />
        ) : (
          <ChevronDown className="text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="border-t border-gray-300 dark:border-gray-500">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 border-b border-gray-200 dark:border-gray-500 last:border-b-0"
            >
              <h3 className="font-medium dark:text-zinc-100 text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-800 dark:text-zinc-300 text-xl">
                {item.content}
              </p>
            </div>
          ))}
          {buttons.length > 0 && (
            <div className="p-4 flex flex-wrap gap-2 justify-center bg-gray-50 dark:bg-zinc-800">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={`${button.variant || "default"}`}
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
