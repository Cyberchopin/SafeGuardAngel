import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const EmergencyButton = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleEmergency = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        await fetch('/api/incidents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
          },
          body: JSON.stringify({
            type: 'emergency',
            location: { latitude, longitude }
          })
        });
        alert('Emergency services have been notified');
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send emergency alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEmergency}
      disabled={loading}
      className={`fixed bottom-4 right-4 bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition-transform transform ${loading ? 'animate-pulse' : ''}`}
    >
      {loading ? <span>Loading...</span> : <span>SOS</span>}
    </button>
  );
};

export default EmergencyButton; 