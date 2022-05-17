import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocationForm } from '../hooks/useLocationForm';
import { ModalMap } from './ModalMap';

interface Props {
  isVisible: boolean;
  handleClose: () => void;
}

export function LocationUpdateModal() {
  const {
    updateTextField,
    getInvalidClass,
    submitForm,
    setLocation,
    closeModal,
    userFormInfo,
    userInfoModalIsVisible,
    updateUserInfoRequestInProgress
  } = useLocationForm();

  return (
    <Modal show={userInfoModalIsVisible} onHide={closeModal}
      dialogClassName="update-location-modal">
      <Modal.Header closeButton>
        <Modal.Title>Обновить свою локацию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitForm} action="">
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label required">Имя</label>
            <input
              value={userFormInfo.fullName}
              onChange={e => updateTextField(e.target.value, 'fullName')}
              type="text"
              className={`form-control ${getInvalidClass(userFormInfo.fullName)}`}
              id="fullName"
              placeholder="Иван Петров"
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Какие Ваши планы по оформлению в стране
              пребывания?</label>
            <select
              value={userFormInfo.status}
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

          <ModalMap setLocation={setLocation} coordinates={userFormInfo.coords} />

          <div className="mb-3">
            <input
              value={userFormInfo.coords}
              onChange={e => updateTextField(e.target.value, 'coords')}
              type="text"
              className="form-control"
              id="location"
              disabled />
          </div>
          <div className="mb-3 row">
            <div className="col">
              <input
                value={userFormInfo.country}
                onChange={e => updateTextField(e.target.value, 'country')}
                type="text"
                className="form-control"
                id="country"
                disabled />
            </div>
            <div className="col">
              <input
                value={userFormInfo.city}
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
              value={userFormInfo.additionalInfo}
              onChange={e => updateTextField(e.target.value, 'additionalInfo')}
              className="form-control"
              id="additionalInfo"></textarea>
          </div>
          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Закрыть
            </Button>
            <Button type="submit" variant="primary" disabled={updateUserInfoRequestInProgress}>
              Внести изменения
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
