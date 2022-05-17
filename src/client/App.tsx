import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './shared/components/Layout';
import { store } from './store';

const Locations = lazy(() => import('./pages/Locations/Locations'));
const Stats = lazy(() => import('./pages/Stats/Stats'));

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<>Loading...</>}>
            <Routes>
              <Route path="/" element={<Locations />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}
