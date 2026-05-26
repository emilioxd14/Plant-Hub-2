import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlantProvider } from './context/PlantContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginView from './views/LoginView';
import HubView from './views/HubView';
import PlantDetailView from './views/PlantDetailView';
import StoreView from './views/StoreView';
import BillingView from './views/BillingView';
import ShippingView from './views/ShippingView';

function App() {
  return (
    <PlantProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <HubView />
            </ProtectedRoute>
          } />
          
          <Route path="/plant/:id" element={
            <ProtectedRoute>
              <PlantDetailView />
            </ProtectedRoute>
          } />
          
          <Route path="/store" element={
            <ProtectedRoute>
              <StoreView />
            </ProtectedRoute>
          } />
          
          <Route path="/billing" element={
            <ProtectedRoute>
              <BillingView />
            </ProtectedRoute>
          } />
          
          <Route path="/shipping" element={
            <ProtectedRoute>
              <ShippingView />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </PlantProvider>
  );
}

export default App;
