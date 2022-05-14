import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { ComponentLoader } from './shared/components/ComponentLoader';
import { Layout } from './shared/components/Layout';

const Map = lazy(() => import('./pages/Map/Map'));
const Stats = lazy(() => import('./pages/Stats/Stats'));

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={
            <ComponentLoader component={<Map />} />
          } />
          <Route path="/stats" element={
            <ComponentLoader component={<Stats />} />
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
