import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const ShopMap = () => {
  const [shops, setShops] = useState([]);
  const [userLocation, setUserLocation] = useState([12.9716, 77.5946]); // Default to Bangalore
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch Shops from Backend
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/stores/');
        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }
        const data = await response.json();
        setShops(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  // Get User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (err) => {
          console.warn('Geolocation error:', err.message);
        }
      );
    }
  }, []);

  const handleStoreClick = (e) => {
    e.stopPropagation(); // Prevent Leaflet from closing the popup
    navigate('/payment');
  };

  if (loading) return <p>Loading map and shops...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: '500px', width: '90%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User Marker */}
      <Marker position={userLocation}>
        <Popup>You are here!</Popup>
      </Marker>

      {/* Shop Markers with Tooltip */}
      {shops.length > 0 ? (
        shops.map((shop, index) => (
          shop.latitude && shop.longitude ? (
            <Marker key={index} position={[shop.latitude, shop.longitude]}>
              <Tooltip direction="top" offset={[0, -10]} permanent>
                <span>{shop.name}</span>
              </Tooltip>
              <Popup>
                <div
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  onClick={handleStoreClick}
                >
                  {shop.name}
                </div>
                <br />
                Location: {shop.latitude}, {shop.longitude}
              </Popup>
            </Marker>
          ) : null
        ))
      ) : (
        <p>No nearby shops found</p>
      )}
    </MapContainer>
  );
};

export default ShopMap;
