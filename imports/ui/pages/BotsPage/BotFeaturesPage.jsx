import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FEATURES } from '/imports/ui/constants';

import './style.css';

const BotFeaturesPage = ({ _id, showButton }) => (
  <div className="container">
    <p className="display-4 text-center">Features Available</p>
    <div className="row">
      {FEATURES.map(({
        id,
        to,
        name,
        image,
        available,
        description,
      }) => (
        <div
          key={id}
          className="col-lg-4 d-flex align-items-stretch"
          style={{
            marginBottom: '1em',
            [available ? '' : 'pointerEvents']: 'none',
            [available ? '' : 'opacity']: '0.4',
          }}
        >
          <div className="card" style={{ width: '20rem' }}>
            {
              available ?
                '' :
                <div className="ribbon-wrapper-green">
                  <div className="ribbon-green">Coomig Soon</div>
                </div>
            }
            <img
              src={image}
              className="card-img-top"
            />
            <div className="card-block" style={{ padding: '1em' }}>
              <h4 className="card-title">{name}</h4>
              <p className="card-text">{description}</p>
              {
                showButton ?
                  <Link to={`${to}${_id}`} className="btn btn-primary">Check it out</Link> :
                  ''
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

BotFeaturesPage.defaultProps = {
  showButton: true,
  _id: '',
};

BotFeaturesPage.propTypes = {
  _id: PropTypes.string,
  showButton: PropTypes.bool,
};

export default BotFeaturesPage;
