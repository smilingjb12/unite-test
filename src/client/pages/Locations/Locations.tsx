import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../store';
import { LocationUpdateModal } from './components/LocationUpdateModal';
import { MainMap } from './components/MainMap';
import { actions } from './locationsSlice';

function Locations() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.fetchLocations());
  }, []);

  const showLocationInfoModal = () => {
    dispatch(actions.showLocationUpdateModal());
  };

  return (
    <React.Fragment>
      <div className="container mb-2">
        <Button
          variant="primary"
          onClick={showLocationInfoModal}>Изменить мои данные</Button>
      </div>
      <div className="container mb-2">
        <i>Кликните на маркер на карте, чтобы узнать, кто именно из Ваших коллег находится в этом месте.</i>
      </div>
      <div className="container">
        <MainMap />
      </div>
      <LocationUpdateModal />
    </React.Fragment>
  );
}

export default Locations;