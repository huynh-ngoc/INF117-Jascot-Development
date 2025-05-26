"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const LIBRARIES = ['places', 'geometry'];
const DEFAULT_CENTER = { lat: 40.7685, lng: -73.9822 };

export default function NeighborhoodMap({ address, range }) {
    const [coords, setCoords] = useState(DEFAULT_CENTER);
    const [zipCenter, setZipCenter] = useState(null);
    const [distanceInfo, setDistanceInfo] = useState("");
    const [zipCode, setZipCode] = useState("");

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: LIBRARIES
    });
    
    const calculateDistance = useCallback((origin, destination) => {
        if (!isLoaded || !origin || !destination) return;
        try {
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
            const distanceInMiles = (distance * 0.000621371).toFixed(2);
            const distanceValue = parseFloat(distanceInMiles);
            setDistanceInfo({
                text: `Property is Located within ${distanceInMiles} miles from the center of zip code ${zipCode}.`,
                value: distanceValue
            });
        } catch (error) {
            console.error("Distance calculation failed:", error);
            setDistanceInfo("Unable to calculate distance.");
        }
    }, [isLoaded, zipCode]);

    const extractZipCode = useCallback((addressComponents) => {
        const zipComponent = addressComponents.find(c =>
            c.types.includes("postal_code")
        );
        if (zipComponent) {
            return zipComponent.long_name;
        }
        return null;
    }, []);

    // Address geocoding
    useEffect(() => {
        if (!isLoaded || !address) return;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const locationCoords = results[0].geometry.location.toJSON();
                setCoords(locationCoords);
                
                const extractedZipCode = extractZipCode(results[0].address_components);
                if (extractedZipCode) {
                    setZipCode(extractedZipCode);
                } else {
                    setDistanceInfo("Could not find a zip code in the address.");
                }
            } else {
                console.error("Address geocoding failed:", status);
            }
        });
    }, [isLoaded, address, extractZipCode]);

    // Find zip code center
    useEffect(() => {
        if (!isLoaded || !zipCode) return;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: zipCode }, (results, status) => {
            if (status === "OK" && results[0]) {
                const zipCenterCoords = results[0].geometry.location.toJSON();
                setZipCenter(zipCenterCoords);
            } else {
                console.error("Zip code center lookup failed:", status);
                setDistanceInfo(`Could not determine the center of zip code ${zipCode}.`);
            }
        });
    }, [isLoaded, zipCode]);

    // Calculate distance
    useEffect(() => {
        if (!isLoaded || !coords || !zipCenter) return;
        
        const originLatLng = new window.google.maps.LatLng(coords.lat, coords.lng);
        const destLatLng = new window.google.maps.LatLng(zipCenter.lat, zipCenter.lng);
        calculateDistance(originLatLng, destLatLng);
    }, [isLoaded, coords, zipCenter, calculateDistance]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                {address}
            </h1>
            <div className="h-[500px] w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={coords}
                        zoom={16}
                    >
                        <Marker position={coords} />
                        {zipCenter && (
                            <Marker
                                position={zipCenter}
                                icon={{
                                    path: window.google.maps.SymbolPath.CIRCLE,
                                    scale: 10,
                                    fillColor: "#0000FF",
                                    fillOpacity: 1,
                                    strokeWeight: 1,
                                    strokeColor: "#FFFFFF"
                                }}
                            />
                        )}
                    </GoogleMap>
                ) : (
                    <p>Loading map...</p>
                )}
            </div>
            {coords && (
                <Card className="max-w-4xl mx-auto mt-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
                    <CardTitle className="font-semibold text-gray-900 dark:text-white">Distance Information:</CardTitle>
                    <CardContent className="text-gray-700 dark:text-gray-300">
                        {distanceInfo.text ? (
                            <>
                                Property is Located within  <span className={`px-2 py-1 rounded ${distanceInfo.value > range ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                    {distanceInfo.value.toFixed(2)}
                                </span> miles from the center of zip code {zipCode}.
                            </>
                        ) : (
                            "Unable to calculating distance from zip code center to the current address"
                        )}
                        {zipCenter && (
                            <div className="mt-5">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Zip code center shown as blue point
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}