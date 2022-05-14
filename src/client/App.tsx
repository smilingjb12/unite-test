import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './shared/components/Layout';

const Map = lazy(() => import('./pages/Map/Map'));
const Stats = lazy(() => import('./pages/Stats/Stats'));

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
