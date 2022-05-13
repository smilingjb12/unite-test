import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="p-3 bg-dark text-white mb-2">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            Unite
          </a>
          <ul className="nav col-12 col-lg-auto ms-lg-auto mb-2 justify-content-center text-end mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-white">Карта</Link>
            </li>
            <li>
              <Link to="/stats" className="nav-link px-2 text-white">Статистика</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}