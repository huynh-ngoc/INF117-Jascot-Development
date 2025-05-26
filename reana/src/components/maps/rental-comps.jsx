import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { DollarSign, LayoutGrid, Percent, Bath, MapPin, BedDouble } from 'lucide-react';

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

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: LIBRARIES
  });

  const [subjectPos, setSubjectPos] = useState(defaultCenter);
  const [compPositions, setCompPositions] = useState([]);
  const [activeInfo, setActiveInfo] = useState(null);
  const [distances, setDistances] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compsProps, setCompsProps] = useState(null);
  const [mainProp, setMainProp ] = useState(null);

  const renderFields = ({ distance, rent, sqft, rate, bath, bed }) => (
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
        <BedDouble className="h-5 w-5 text-yellow-600" />
        <p>Bedrooms: {' '}
        <span className="text-xl font-semibold">{bed}</span>
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

  useEffect(() => {
    setLoading(true);
    fetch(`/api/rental-comps-data?address=${encodeURIComponent(address)}`)
      .then((res) => res.json())
      .then(fullData => {   
        setData(fullData)
        setCompsProps(
          Object.entries(fullData.comparableProperties).map(([key, comp]) => ({
            id: key,
            ...comp
          }))
        );
        setMainProp(fullData.mainProperty)
      })
      .catch((err) => {
        console.error('Failed to fetch property data:', err);
      })
      .finally(() => setLoading(false));
  }, [address]);


  // Geocode addresses
  useEffect(() => {
    if (!isLoaded || !data) return;

    // const { comparableProperties } = data;
    // setCompsProps(comparableProperties);
    const geocoder = new window.google.maps.Geocoder();

    setCompPositions([]);
    setSubjectPos(defaultCenter);

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setSubjectPos(results[0].geometry.location.toJSON());
      }
    });
    compsProps.forEach((comp) => {
      geocoder.geocode({ address: comp.address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setCompPositions((prev) => [...prev, { ...comp, position: results[0].geometry.location.toJSON() }]);
        }
      });
    });
  }, [isLoaded, data, address]);

  // Compute distances
  useEffect(() => {
    if (
      !isLoaded ||
      !data ||
      !subjectPos || 
      subjectPos === defaultCenter || 
      compPositions.length === 0 ||
      compPositions.length !== compsProps.length
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

  if (loading) return <p>Loading property details…</p>;
  if (!data)    return <p>Unable to load property details.</p>;

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
                rent: mainProp.monthlyRent,
                sqft: mainProp.propertySize,
                rate: (mainProp.monthlyRent / mainProp.propertySize).toFixed(2),
                bath: mainProp.numberOfbathrooms,
                bed: mainProp.numberOfbedrooms,
              })}
            </CardContent>
          </Card>
          {/* Comps */}
          
          {compsProps.map((comp, idx) => (
            <Card key={idx} className="col-span-1">
              <CardContent className="space-y-4">
                <img 
                  src={getStreetViewUrl(comp.address)} 
                  alt="Street View" 
                  className="w-full h-32 bg-gray-100 flex items-center justify-center object-cover rounded" 
                />
                <p className="font-medium">{comp.address}</p>
                {console.log(compsProps)}
                {renderFields({ 
                  distance: distances[comp.id] ?? 'N/A',
                  rent: comp.monthlyRent, 
                  sqft: comp.propertySize, 
                  rate: (comp.monthlyRent / comp.propertySize).toFixed(2), 
                  bath: comp.numberOfbathrooms,
                  bed: comp.numberOfbedrooms,
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
                  <div>{address}</div>
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
