import React, { useEffect, useState } from 'react';
import MapComponent from './Shopmap';
import axios from 'axios';

const Dashboard = () => {
  const [shops, setShops] = useState([]);

  // Fetch shops from API
  useEffect(() => {
    axios.get('http://localhost:8000/api/shops/')
      .then(response => setShops(response.data))
      .catch(error => console.error('Error fetching shop data:', error));
  }, []);

  return (
    <div>
      <h1>Nearby Print Shops</h1>
      
      {/* Adjusting the Map Width and Height */}
      <div style={{ width: '90vw', height: '80vh' }}>
        <MapComponent shops={shops} />
      </div>
    </div>
  );
};

export default Dashboard;
