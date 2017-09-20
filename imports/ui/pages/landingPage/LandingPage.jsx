import React from 'react';
import BotFeaturesPage from '/imports/ui/pages/BotsPage/BotFeaturesPage';

import './style.css';

const LandingPage = () => (
  <div>
    <div className="header clearfix" />
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">TS3 TibiaBOT!</h1>
        <p className="lead">
          Free to use, Tibia-related TS3
        </p>
        <p>
          If you wanna help, <a target="_blank" href="https://github.com/ethkat/tibia-ts3-teamspeakbot/wiki/How-to-help%3F">check here</a> (its free)
        </p>
      </div>
      <div className="row marketing">
        <div className="col-lg-12">
          <BotFeaturesPage showButton={false} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <p className="text-center">
            <a target="_blank" href="https://github.com/ethkat/tibia-ts3-teamspeakbot" className="btn">
              <i className="fa fa-2x fa-github" />
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

LandingPage.propTypes = {};

export default LandingPage;
