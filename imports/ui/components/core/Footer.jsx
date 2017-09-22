import React from 'react';

export default props => (
  <div className="footer-container">
    <footer className="footer" style={{ position: props.position }}>
      <span>
        <a target="_blank" href="https://github.com/ethkat/tibia-ts3-teamspeakbot" className="btn">
          <i className="fa fa-2x fa-github" />
        </a>
        &copy; Ethkat, 2017.
      </span>
    </footer>
  </div>
);
