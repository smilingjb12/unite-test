import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { LocationUpdateModal } from './components/LocationUpdateModal';
import { MainMap } from './components/MainMap';
import { useLocationsApi } from './hooks/useLocationsApi';
import { useLocationsMap } from './hooks/useLocationsMap';
import { LocationMarker } from './types';

function Map() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [markers, setMarkers] = useState<LocationMarker[]>([]);
  const { makeMarkers } = useLocationsMap();
  const { fetchLocations } = useLocationsApi();

  useEffect(() => {
    drawMarkers();
  }, []);

  const drawMarkers = () => {
    fetchLocations().then(locations => {
      setMarkers(makeMarkers(locations));
    });
  };

  const handleClose = () => {
    setModalIsVisible(false);
    drawMarkers();
  };

  const showModal = () => {
    setModalIsVisible(true);
  };

  return (
    <React.Fragment>
      <div className="container mb-2">
        <Button variant="primary" onClick={showModal}>Изменить мои данные</Button>
      </div>
      <div className="container mb-2">
        <i>Кликните на маркер на карте, чтобы узнать, кто именно из Ваших коллег находится в этом месте.</i>
      </div>
      <div className="container">
        <MainMap markers={markers} />
      </div>
      <LocationUpdateModal isVisible={modalIsVisible} handleClose={handleClose} />
    </React.Fragment>
  );
}

export default Map;