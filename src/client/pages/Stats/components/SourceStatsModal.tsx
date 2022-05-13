import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { LocationInfo } from "../../Map/types";
import { useLocationStats } from "../hooks/useLocationStats";
import { SourceStatItem } from "../types";

interface Props {
  isVisible: boolean;
  handleClose: () => void;
  locations: LocationInfo[];
}

export function SourceStatsModal({ isVisible, handleClose, locations }: Props) {
  const [sourceItems, setSourceItems] = useState<SourceStatItem[]>([]);
  const { makeSourceStatItems } = useLocationStats();

  useEffect(() => {
    setSourceItems(makeSourceStatItems(locations));
  }, [locations]);

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
            {sourceItems.map((i, index) => (
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