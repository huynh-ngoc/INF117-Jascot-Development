"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Plus, Trash2, FileChartColumn } from "lucide-react";
import { useRouter } from "next/navigation";

const LIBRARIES = ["places", "geometry"];

export default function PropAnalysisList() {
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [autoComplete, setAutoComplete] = useState(null);
  const router = useRouter();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  // Fetch existing properties
  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/property-list");
        if (!res.ok) {
          throw new Error(`Failed to fetch data from /api/property-list. Error: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data.properties)) {
          const properties = data.properties.map((p) => ({
            id: p.id,
            text: p.address,
          }));
          setAddressList(properties);
        } else {
          console.warn("GET /api/property-list returned unexpected formate:", data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load properties.");
      }
    }

    fetchProperties();
  }, []);

  const onLoadAutocomplete = useCallback((autocompleteInstance) => {
    setAutoComplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autoComplete !== null) {
      const place = autoComplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setAddress(place.formatted_address || address);
        setError("");
      } else {
        setError("Address not find: '" + address + "'");
      }
    }
  }, [autoComplete, address]);

  const handleAddAddress = () => {
    if (address.trim() !== "") {
      const newAddress = { id: Date.now().toString(), text: address };
      setAddressList([...addressList, newAddress]);
      setAddress("");
    } else {
      setError("Please enter an address");
    }
  };

  const handleAnalysis = (addr) => {
    const encodedAddress = encodeURIComponent(addr.text);
    router.push(`/prop-analysis-dashboard?address=${encodedAddress}`);
  };

  const handleRemove = (id) => {
    setAddressList(addressList.filter((addr) => addr.id !== id));
  };

  if (!isLoaded) {
    return <div className="max-w-4xl mx-auto p-4">Loading ...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-10">
      <Card>
        <CardContent className="p-6 -mb-4">
          <div className="flex items-center justify-between space-x-2">
            <Autocomplete
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
              className="flex-grow"
            >
              <Input
                placeholder="Enter the property's address to start analysis"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-grow"
              />
            </Autocomplete>
            <Button onClick={handleAddAddress}>
              <Plus />
              Add
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-4">Error: {error}</p>}
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {addressList.map((addr) => (
          <Card key={addr.id} className="hover:scale-103 transition-transform">
            <CardContent className="p-6 -mb-6">
              <div className="flex items-center justify-between">
                <div className="flex-grow text-xl">{addr.text}</div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleAnalysis(addr)}
                  >
                    <FileChartColumn /> Analysis
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemove(addr.id)}
                  >
                    <Trash2 /> Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
