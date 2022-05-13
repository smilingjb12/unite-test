import React, { useEffect, useState } from 'react';
import { useLocationsApi } from '../Map/hooks/useLocationsApi';
import { LocationInfo } from '../Map/types';
import { CityList } from './components/CityList';
import { MainStatsTable } from './components/MainStatsTable';
import { SourceStatsModal } from './components/SourceStatsModal';
import { StatsPieChart } from './components/StatsPieChart';
import { useLocationStats } from './hooks/useLocationStats';
import { PieChartItem } from './types';

export function Stats() {
  const { fetchLocations } = useLocationsApi();
  const { makeStatusPieChartItems, makeCountryPieChartItems } = useLocationStats();
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [locations, setLocations] = useState<LocationInfo[]>([]);
  const [statusChartItems, setStatusChartItems] = useState<PieChartItem[]>([]);
  const [countryChartItems, setCountryChartItems] = useState<PieChartItem[]>([]);

  useEffect(() => {
    fetchLocations().then(locations => {
      setLocations(locations);
      setStatusChartItems(makeStatusPieChartItems(locations));
      setCountryChartItems(makeCountryPieChartItems(locations));
    });
  }, []);

  const closeStatsModal = () => {
    setStatsModalVisible(false);
  };

  const toggleStatsModal = () => {
    setStatsModalVisible(true);
  };

  return (
    <div className="container">
      <h1>Статистика</h1>
      <div className="text-end">
        <button className="btn btn-link" onClick={toggleStatsModal}>
          Посмотреть исходные данные
        </button>
      </div>
      <MainStatsTable locations={locations} />
      <CityList locations={locations} />
      <SourceStatsModal
        isVisible={statsModalVisible}
        handleClose={closeStatsModal}
        locations={locations} />
      <hr />
      <div className="row">
        <div className="col chart-container">
          <StatsPieChart items={countryChartItems} title="Сотрудники по странам" />
        </div>
        <div className="col chart-container">
          <StatsPieChart items={statusChartItems} title="Сотрудники по статусу" />
        </div>
      </div>
    </div>
  );
}