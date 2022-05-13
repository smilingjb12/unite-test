import React from 'react';

export function Footer() {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><a target="_blank" href="https://gitlab.com/Jetmix/itransition-unite" className="nav-link px-2 text-muted">Want to contribute?</a></li>
          <li className="nav-item"><a target="_blank" href="https://trello.com/invite/b/MpTVogt3/a8538887e0fa16b5d5859a6cb5c6cb1b/itr-unite" className="nav-link px-2 text-muted">Have an idea?</a></li>
        </ul>
        <p className="text-center text-muted">© 2022, Team Kalganov</p>
      </footer>
    </div>
  );
}