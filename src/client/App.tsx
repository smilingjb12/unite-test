import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './shared/components/Layout';

const Map = lazy(() => import('./pages/Map/Map'));
const Stats = lazy(() => import('./pages/Stats/Stats'));

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={
            <React.Suspense fallback={<>Loading...</>}>
              <Map />
            </React.Suspense>
          } />
          <Route path="/stats" element={
            <React.Suspense fallback={<>Loading...</>}>
              <Stats />
            </React.Suspense>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
