import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { actions as locationsActions } from '../Locations/locationsSlice';
import { CityList } from './components/CityList';
import { MainStatsTable } from './components/MainStatsTable';
import { SourceStatsModal } from './components/SourceStatsModal';
import { StatsPieChart } from './components/StatsPieChart';
import { useLocationStats } from './hooks/useLocationStats';
import { actions } from './statsSlice';

function Stats() {
  const dispatch = useAppDispatch();
  const stats = useLocationStats();

  useEffect(() => {
    dispatch(locationsActions.fetchLocations());
  }, []);

  const showStatsModal = () => {
    dispatch(actions.showSourceStatsModal());
  };

  return (
    <div className="container">
      <h1>Статистика</h1>
      <div className="text-end">
        <button className="btn btn-link" onClick={showStatsModal}>
          Посмотреть исходные данные
        </button>
      </div>
      <MainStatsTable />
      <CityList />
      <SourceStatsModal />
      <hr />
      <div className="row">
        <div className="col-lg-6 col-12 chart-container">
          <StatsPieChart
            items={stats.countryPieChartItems}
            title="Сотрудники по странам" />
        </div>
        <div className="col-lg-6 col-12 chart-container">
          <StatsPieChart
            items={stats.statusPieChartItems}
            title="Сотрудники по статусу" />
        </div>
      </div>
    </div>
  );
}

export default Stats;