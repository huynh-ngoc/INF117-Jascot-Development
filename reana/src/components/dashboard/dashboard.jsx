'use client';

import { useState, useEffect } from 'react';
import { 
    FilePlus2, 
    FilePen, 
    ChartNoAxesCombined, 
    ScanSearch, 
    HousePlus 
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    const [profileName, setProfileName] = useState('Investor');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      fetchUserProfile();
    }, []);
  
    const fetchUserProfile = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch('/api/firebase/user-profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok && data.success) {
          setProfileName(data.uesrProfile?.username || '');
        } else {
          setError(data.error || 'Failed to fetch user profile');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="text-lg">Loading ...</div>
        </div>
      );
    }
  
    return (
      <div className="flex flex-1 flex-col gap-4 px-8 p-4 pt-0">
        <header >
            <h1 className="text-5xl font-bold">Hello {profileName}!</h1>
            <p className="mt-1 text-xl">Welcome to Your Reana Dashboard</p>
        </header>
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            style={{ gridAutoRows: '1fr' }}>
            {[{ 
                id: 1,
                icon: <FilePlus2 className="h-6 w-6 text-blue-500" />,
                title: "Create New Investor Profile",
                btn: "Create Now",
                path: "/userinvestmentstrategies"
            }, { 
                id: 2,
                icon: <FilePen className="h-6 w-6 text-green-500" />,
                title: "Edit Existing Investor Profile",
                btn: "Edit Profile",
                // change path to User Investment Strategies page (exist file in database)
                path: "/userinvestmentstrategies"
            }, { 
                id: 3,
                icon: <ChartNoAxesCombined className="h-6 w-6 text-red-500" />,
                title: "Analyze a Property",
                btn: "Analyze Now",
                path: "/prop-analysis-list"
            }, { 
                id: 4,
                icon: <ScanSearch className="h-6 w-6 text-fuchsia-500" />,
                title: "Explore Neighborhoods that Match Your Goals",
                btn: "Explore Now",
                path: "/location-reports"
            }
            ].map(item => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow w-full h-full flex flex-col">
                <CardHeader className="flex justify-center p-4">{item.icon}</CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center">
                    <h2 className="text-xl mb-8 text-center">{item.title}</h2>
                    <Link href={item.path}>
                    <Button as="a" className="mt-auto font-bold">{item.btn}</Button>
                    </Link>
                </CardContent>
                </Card>
            ))}
            {/* Search Properties that Match Your Goals  (Update in future version)*/}
            <Card key="5" className="hover:shadow-lg transition-shadow w-full h-full flex flex-col">
            <CardHeader className="flex justify-center p-4">
                <HousePlus className="h-6 w-6 text-amber-500" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center">
                <h2 className="text-xl mb-8 text-center">
                Search Properties that Match Your Goals
                </h2>
                <Button as="a" className="mt-auto font-bold" variant="disabled">Search Now</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }