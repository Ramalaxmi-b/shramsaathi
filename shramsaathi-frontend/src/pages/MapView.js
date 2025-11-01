import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import './MapView.css';

// Fix default icon paths for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DEFAULT_CENTER = [20.5937, 78.9629]; // India center
const BACKEND_URL = 'http://localhost:8083';

function MapView() {
  const [workers, setWorkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const stompClient = useRef(null);
  const mapRef = useRef(null);

  // Function to handle new worker location updates
  const handleWorkerUpdate = useCallback((message) => {
    if (message.body) {
      const worker = JSON.parse(message.body);
      setWorkers(current => {
        // Find if worker already exists
        const index = current.findIndex(w => w.id === worker.id);
        if (index >= 0) {
          // Update existing worker
          const newWorkers = [...current];
          newWorkers[index] = { ...newWorkers[index], ...worker };
          return newWorkers;
        } else {
          // Add new worker
          return [...current, worker];
        }
      });
    }
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${BACKEND_URL}/ws`),
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe('/topic/worker-locations', handleWorkerUpdate);
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      onError: (error) => {
        console.error('WebSocket error:', error);
      },
      // Heartbeat every 30s/20s to keep connection alive
      heartbeatIncoming: 30000,
      heartbeatOutgoing: 20000,
    });

    // Connect
    client.activate();
    stompClient.current = client;

    // Cleanup on unmount
    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [handleWorkerUpdate]);

  // Load initial worker data
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/users`);
        // Only show workers with valid coordinates
        const workersWithLocation = response.data.filter(
          w => w.latitude != null && w.longitude != null
        );
        setWorkers(workersWithLocation);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  // Update bounds when map is moved
  const handleMapMove = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current.target;
      setBounds(map.getBounds());
    }
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={5}
        className="map"
        whenReady={(map) => {
          mapRef.current = map;
          handleMapMove();
        }}
        whenMoved={handleMapMove}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MarkerClusterGroup>
          {workers.map((worker) => (
            <Marker
              key={worker.id}
              position={[worker.latitude, worker.longitude]}
              title={worker.name}
            >
              <Popup>
                <div className="worker-popup">
                  <h3>{worker.name}</h3>
                  <p><strong>Work Type:</strong> {worker.workType}</p>
                  <p><strong>District:</strong> {worker.district}</p>
                  <p><strong>Mandal:</strong> {worker.mandal}</p>
                  {worker.experience && (
                    <p><strong>Experience:</strong> {worker.experience} years</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default MapView;