import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { DollarSign, LayoutGrid, Percent, Bath, MapPin } from 'lucide-react';

const mapContainerStyle = { width: '100%', height: '400px' };
const defaultCenter = { lat: 40.7685, lng: -73.9822 };
const LIBRARIES = ['places', 'geometry'];

// Get address image from Google Street View
const getStreetViewUrl = (address) => {
    const size = "200x180";
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const loc = encodeURIComponent(address);
    return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${loc}&key=${key}`;
};

export default function RentalComps({ address }) {
  // Example addresses
  const SUBJECT_ADDRESS = [{
    id: 'sub1', 
    address: address,
    rent: 700,
    area: 550,
    rate: 1.27,
    baths: 3 
  }];
  const COMP_ADDRESSES = [{ 
    id: 'comp1', 
    address: '463 W 4th St S, Fulton, NY 13069',
    rent: 700,
    area: 550,
    rate: 1.27,
    baths: 3 
  },{ 
    id: 'comp2', 
    address: '201 Chestnut St, Fulton, NY 13069',
    rent: 700,
    area: 550,
    rate: 1.27,
    baths: 3 
  },{ 
    id: 'comp3', 
    address: '156 W 3rd St S, Fulton, NY 13069',
    rent: 700,
    area: 550,
    rate: 1.27,
    baths: 3 
  }];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: LIBRARIES
  });

  const [subjectPos, setSubjectPos] = useState(defaultCenter);
  const [compPositions, setCompPositions] = useState([]);
  const [activeInfo, setActiveInfo] = useState(null);
  const [distances, setDistances] = useState({});

  // Geocode addresses
  useEffect(() => {
    if (!isLoaded) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setSubjectPos(results[0].geometry.location.toJSON());
      }
    });
    COMP_ADDRESSES.forEach((comp) => {
      geocoder.geocode({ address: comp.address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setCompPositions((prev) => [...prev, { ...comp, position: results[0].geometry.location.toJSON() }]);
        }
      });
    });
  }, [isLoaded]);

  // Compute distances
  useEffect(() => {
    if (
      !isLoaded ||
      compPositions.length !== COMP_ADDRESSES.length ||
      subjectPos === defaultCenter
    ) {
      return;
    }
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [subjectPos],
        destinations: compPositions.map((c) => c.position),
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      },
      (response) => {
        const newDistances = {};
        response.rows[0].elements.forEach((elem, idx) => {
          newDistances[compPositions[idx].id] = elem.distance.text;
        });
        setDistances(newDistances);
      }
    );
  }, [isLoaded, subjectPos, compPositions]);

  const renderFields = ({ distance, rent, sqft, rate, bath }) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-amber-600" />
        <p>Distance: {' '}
          <span className="text-xl font-semibold">{distance}</span>
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <DollarSign className="h-5 w-5 text-blue-500" />
        <p>Monthly Rent: {' '}
          <span className="text-xl font-semibold">${rent}</span>
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <LayoutGrid className="h-5 w-5 text-lime-500" />
        <p>Size: {' '}
          <span className="text-xl font-semibold">{sqft}</span>
          {' '} ft<sup>2</sup>
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Percent className="h-5 w-5 text-red-500" />
        <p>Rent/ft<sup>2</sup>: {' '}
        <span className="text-xl font-semibold">${rate}</span>
        {' '}/ ft<sup>2</sup>
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Bath className="h-5 w-5 text-purple-500" />
        <p>Bathrooms: {' '}
        <span className="text-xl font-semibold">{bath}</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Subject Property */}
          <Card className="col-span-1">
            <CardContent className="space-y-4">
              <img 
                src={getStreetViewUrl(address)} 
                alt="Street View" 
                className="w-full h-32 bg-gray-100 flex items-center justify-center object-cover rounded" 
              />
              <p className="font-medium">{address}</p>
              {renderFields({ 
                distance: "Center",
                rent: SUBJECT_ADDRESS[0].rent, 
                sqft: SUBJECT_ADDRESS[0].area, 
                rate: SUBJECT_ADDRESS[0].rate, 
                bath: SUBJECT_ADDRESS[0].baths})}
            </CardContent>
          </Card>
          {/* Comps */}
          {COMP_ADDRESSES.map((comp, idx) => (
            <Card key={comp.id} className="col-span-1">
              <CardContent className="space-y-4">
                <img 
                  src={getStreetViewUrl(comp.address)} 
                  alt="Street View" 
                  className="w-full h-32 bg-gray-100 flex items-center justify-center object-cover rounded" 
                />
                <p className="font-medium">{comp.address}</p>
                {renderFields({ 
                  distance: distances[comp.id],
                  rent: comp.rent, 
                  sqft: comp.area, 
                  rate: comp.rate, 
                  bath: comp.baths
                })}
            </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      {/* Map */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Comp Map</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoaded ? (
            <GoogleMap mapContainerStyle={mapContainerStyle} center={subjectPos} zoom={14}>
              {/* Subject Pin */}
              <Marker
                position={subjectPos}
                label={{ text: ' ', color: 'white' }}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                }}
                onClick={() => setActiveInfo('subject')}
              />

              {/* Comp Pins */}
              {compPositions.map((comp) => (
                <Marker
                  key={comp.id}
                  position={comp.position}
                  label={{ text: ' ', color: 'white' }}
                  icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
                  onClick={() => setActiveInfo(comp.id)}
                />
              ))}

              {/* InfoWindow for subject */}
              {activeInfo === 'subject' && (
                <InfoWindow position={subjectPos} onCloseClick={() => setActiveInfo(null)}>
                  <div>{SUBJECT_ADDRESS}</div>
                </InfoWindow>
              )}

              {/* InfoWindows for comps */}
              {compPositions.map((comp) =>
                activeInfo === comp.id && (
                  <InfoWindow key={comp.id} position={comp.position} onCloseClick={() => setActiveInfo(null)}>
                    <div>{comp.title}</div>
                  </InfoWindow>
                )
              )}
            </GoogleMap>
          ) : (
            <p>Loading map...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
