import { isEmpty } from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocationsApi } from '../hooks/useLocationsApi';
import { useLocationsMap } from '../hooks/useLocationsMap';
import { LocationInfoForm } from '../types';
import { ModalMap } from './ModalMap';

interface Props {
  isVisible: boolean;
  handleClose: () => void;
}

export function LocationUpdateModal({ isVisible, handleClose }: Props) {
  const [userInfo, setUserInfo] = useState<LocationInfoForm>({} as LocationInfoForm);
  const { updateLocation } = useLocationsApi();
  const { getCurrentUserInfo } = useLocationsMap();

  useEffect(() => {
    setUserInfo(getCurrentUserInfo());
  }, [isVisible]);

  const updateTextField = <TProp extends keyof LocationInfoForm>(newValue: string, property: TProp) => {
    setUserInfo({ ...userInfo, [property]: newValue });
  };

  const valueIsPopulated = (value: string): boolean => {
    return !isEmpty(value);
  }

  const formIsValid = (): boolean => {
    return valueIsPopulated(userInfo.fullName) && valueIsPopulated(userInfo.coords);
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid()) {
      return;
    }

    updateLocation(userInfo).then(() => {
      handleClose();
    });
  };

  const getInvalidClass = (value: string): string => {
    return !valueIsPopulated(value) ? 'invalid' : '';
  };

  const setLocation = (coordinates: string, city: string, country: string): void => {
    setUserInfo({ ...userInfo, coords: coordinates, city, country });
  };

  return (
    <Modal show={isVisible} onHide={handleClose}
      dialogClassName="update-location-modal">
      <Modal.Header closeButton>
        <Modal.Title>Обновить свою локацию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitForm} action="">
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label required">Имя</label>
            <input
              value={userInfo.fullName}
              onChange={e => updateTextField(e.target.value, 'fullName')}
              type="text"
              className={`form-control ${getInvalidClass(userInfo.fullName)}`}
              id="fullName"
              placeholder="Иван Петров"
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Какие Ваши планы по оформлению в стране
              пребывания?</label>
            <select
              value={userInfo.status}
              onChange={e => updateTextField(e.target.value, 'status')}
              className="form-control"
              id="status">
              <option value="0">Уже оформлен в офис</option>
              <option value="1">Планирую оставаться и оформиться в офис</option>
              <option value="2">Нахожусь здесь временно</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label required">Ваша локация</label>
            <div><i>Выберите Ваше местоположение на карте</i></div>
          </div>

          <ModalMap setLocation={setLocation} coordinates={userInfo.coords} />

          <div className="mb-3">
            <input
              value={userInfo.coords}
              onChange={e => updateTextField(e.target.value, 'coords')}
              type="text"
              className="form-control"
              id="location"
              disabled />
          </div>
          <div className="mb-3 row">
            <div className="col">
              <input
                value={userInfo.country}
                onChange={e => updateTextField(e.target.value, 'country')}
                type="text"
                className="form-control"
                id="country"
                disabled />
            </div>
            <div className="col">
              <input
                value={userInfo.city}
                onChange={e => updateTextField(e.target.value, 'city')}
                type="text"
                className="form-control"
                id="city"
                disabled />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="additionalInfo" className="form-label">Дополнительная информация</label>
            <textarea
              value={userInfo.additionalInfo}
              onChange={e => updateTextField(e.target.value, 'additionalInfo')}
              className="form-control"
              id="additionalInfo"></textarea>
          </div>
          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <Button type="submit" variant="primary">
              Внести изменения
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
