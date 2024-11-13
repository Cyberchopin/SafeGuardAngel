import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('/api/incidents', {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    };

    fetchIncidents();
  }, [currentUser]);

  const handleAnalyzeText = async (text) => {
    try {
      const response = await fetch('/api/monitoring/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Safety Status Card */}
        <div className="bg-white rounded-lg shadow p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-4">Safety Status</h2>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span>Safe</span>
          </div>
        </div>
        
        {/* Emergency Contacts Card */}
        <div className="bg-white rounded-lg shadow p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
            Add Contact
          </button>
        </div>
        
        {/* Recent Incidents Card */}
        <div className="bg-white rounded-lg shadow p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-4">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident._id} className="border-b pb-2">
                <p className="font-medium">{incident.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(incident.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Safety Recommendations</h2>
        <ul className="list-disc pl-5">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-gray-700">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard; 