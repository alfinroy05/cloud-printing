import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useNavigate } from 'react-router-dom';

// Fix marker issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const shopIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3347/3347435.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Haversine Formula for Distance Calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const R = 6371; // Radius of Earth in km

  const dLat = toRadian(lat2 - lat1);
  const dLon = toRadian(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Distance in km
};

const MapComponent = ({ shops }) => {
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  // Get User Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        console.warn('Location permission denied. Using fallback location.');
        setUserLocation([9.9312, 76.2673]); // Fallback to Kochi
      }
    );
  }, []);

  const handleShopSelect = (shop) => {
    navigate('/upload', { state: { selectedStore: shop.id } });
  };

  return (
    <MapContainer
      center={userLocation || [9.9312, 76.2673]}
      zoom={13}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />

      {userLocation && <MapCenter position={userLocation} />}

      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>You are here!</Popup>
        </Marker>
      )}

      {shops.map((shop) => (
        <Marker key={shop.id} position={[shop.latitude, shop.longitude]} icon={shopIcon}>
          <Popup>
            <b>{shop.name}</b>
            <br />
            Latitude: {shop.latitude}, Longitude: {shop.longitude}
            {userLocation && (
              <>
                <br />Distance: {calculateDistance(userLocation[0], userLocation[1], shop.latitude, shop.longitude)} km
              </>
            )}
            <br />
            <button style={{ marginTop: '8px', padding: '8px', cursor: 'pointer' }} onClick={() => handleShopSelect(shop)}>
              Select This Shop
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Center Map when User Location is Updated
const MapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [position, map]);
  return null;
};

export default MapComponent;
