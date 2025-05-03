"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export default function NeighborhoodMap({ address, range }) {
    const [coords, setCoords] = useState(null);
    const [zipCenter, setZipCenter] = useState(null);
    const [distanceInfo, setDistanceInfo] = useState("");
    const [zipCode, setZipCode] = useState("");

    const calculateDistance = (origin, destination) => {
        if (!window.google || !origin || !destination) return;
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
    };

    const extractZipCode = (addressText) => {
        const zipRegex = /\b\d{5}(?:-\d{4})?\b/g;
        const matches = addressText.match(zipRegex);
        if (matches) {
            setZipCode(matches[0])
            return matches[0];
        }
        return null;
    };

    const findZipCodeCenter = (zipCode) => {
        if (!zipCode) return null;
        
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: zipCode }, (results, status) => {
            if (status === "OK" && results[0]) {
                const centerLat = results[0].geometry.location.lat();
                const centerLng = results[0].geometry.location.lng();
                setZipCenter({ lat: centerLat, lng: centerLng });
                if (coords) {
                    const originLatLng = new window.google.maps.LatLng(coords.lat, coords.lng);
                    const destLatLng = new window.google.maps.LatLng(centerLat, centerLng);
                    calculateDistance(originLatLng, destLatLng);
                }
            } else {
                console.error("Zip code center lookup failed:", status);
                setDistanceInfo(`Could not determine the center of zip code ${zipCode}.`);
            }
        });
    };

    const geocodeAddress = useCallback(async (addressToGeocode) => {
        if (!addressToGeocode || addressToGeocode.trim() === "") {
            setGeocodeError("Please enter an address to search");
            setShowPopup(true);
            return;
        }

        try {
            const geocoder = new window.google.maps.Geocoder();
            
            geocoder.geocode({ address: addressToGeocode }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const { lat, lng } = results[0].geometry.location;
                    const newCoords = { lat: lat(), lng: lng() };
                    setCoords(newCoords);

                    const zipCode = extractZipCode(results[0].formatted_address);
                    if (zipCode) {
                        findZipCodeCenter(zipCode, results[0].formatted_address);
                    } else {
                        setDistanceInfo("Could not find a zip code in the address.");
                    }
                    
                } else {
                    console.error("Geocoding failed:", status);
                    setGeocodeError(`Could not find coordinates for: ${addressToGeocode}`);
                }
            });
        } catch (error) {
            console.error("Error geocoding address:", error);
            setGeocodeError("Error while trying to find coordinates");
        }
    }, [coords]);

    useEffect(() => {
        if (address && typeof address === 'string') {
            const checkGoogleMapsLoaded = setInterval(() => {
                if (window.google && window.google.maps) {
                    clearInterval(checkGoogleMapsLoaded);
                    geocodeAddress(address);
                }
            }, 300);
            setTimeout(() => clearInterval(checkGoogleMapsLoaded), 5000);
        }
    }, [address, geocodeAddress]);

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            libraries={["places", "geometry"]}
        >
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                    {address}
                </h1>

                <div className="h-[500px] w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
                    {coords && (
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={coords}
                            zoom={16}
                        >
                            <Marker 
                                position={coords} 
                            />
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
        </LoadScript>
    );
}