import React, { createContext, useState, useContext } from 'react';

const PlantContext = createContext();

export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const mockPlants = [
    {
      id: '1',
      name: 'Monstera Deliciosa',
      status: 'Optimal',
      moisture: 68,
      light: 85,
      temperature: 24,
      history: [
        { time: '08:00', moisture: 65, light: 20 },
        { time: '12:00', moisture: 64, light: 85 },
        { time: '16:00', moisture: 62, light: 70 },
        { time: '20:00', moisture: 68, light: 10 },
      ]
    },
    {
      id: '2',
      name: 'Ficus Lyrata',
      status: 'Warning',
      moisture: 32,
      light: 60,
      temperature: 22,
      history: [
        { time: '08:00', moisture: 35, light: 40 },
        { time: '12:00', moisture: 34, light: 60 },
        { time: '16:00', moisture: 33, light: 50 },
        { time: '20:00', moisture: 32, light: 20 },
      ]
    },
    {
      id: '3',
      name: 'Calathea Ornata',
      status: 'Critical',
      moisture: 15,
      light: 40,
      temperature: 18,
      history: [
        { time: '08:00', moisture: 20, light: 30 },
        { time: '12:00', moisture: 18, light: 40 },
        { time: '16:00', moisture: 16, light: 35 },
        { time: '20:00', moisture: 15, light: 15 },
      ]
    }
  ];

  const [plants] = useState(mockPlants);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const value = {
    isAuthenticated,
    login,
    logout,
    selectedProduct,
    setSelectedProduct,
    plants
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};
