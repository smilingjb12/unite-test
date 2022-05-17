import React from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch } from "../../../store";
import { useLocationStats } from "../hooks/useLocationStats";
import { actions } from '../statsSlice';

export function SourceStatsModal() {
  const dispatch = useAppDispatch();
  const stats = useLocationStats();
  const isVisible = stats.sourceStatsModalIsVisible;

  const handleClose = () => {
    dispatch(actions.closeSourceStatsModal());
  };

  return (
    <Modal show={isVisible} onHide={handleClose}
      dialogClassName="source-stats-modal">
      <Modal.Header closeButton>
        <Modal.Title>Данные о сотрудниках</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-default table-hover table-stripped">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Страна</th>
              <th>Город</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {stats.sourceStatItems.map((i, index) => (
              <tr key={index}>
                <td>{i.fullName}</td>
                <td>{i.country}</td>
                <td>{i.city}</td>
                <td>{i.statusName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={handleClose}
          className="btn btn-secondary">
          Закрыть
        </button>
      </Modal.Footer>
    </Modal>
  );
}