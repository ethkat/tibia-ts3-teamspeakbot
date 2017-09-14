import React from 'react';
import { Link } from 'react-router';

const FEATURES = [{
  id: 1,
  to: '/dashboard/bot/list/',
  name: 'Lists',
  image: '/images/features/lists.png',
  available: true,
  description: 'Create Bot lists that are created as channels',
}, {
  id: 2,
  to: '/dashboard/bot/poke/',
  name: 'Poke',
  image: '/images/features/poke.png',
  available: false,
  description: 'Send poke to everyone on your TS',
}, {
  id: 3,
  to: '/dashboard/bot/drag/',
  name: 'Mass Drag',
  image: '/images/features/mass-drag.png',
  available: false,
  description: 'Dragg all clients to the server',
}, {
  id: 4,
  to: '/dashboard/bot/scanner/',
  name: 'Scann Character',
  image: '/images/features/scanner.jpg',
  available: false,
  description: 'Analize Hidden character',
}, {
  id: 5,
  to: '/dashboard/bot/statics/',
  name: 'War Statics',
  image: '/images/features/war.jpg',
  available: false,
  description: 'Checkout information, like who die most, how frag more, whos winning',
}];

const BotFeaturesPage = ({ _id }) => (
  <div className="container">
    <p className="display-4 text-center">Features Available</p>
    <div className="row">
      {FEATURES.map(({
        id,
        to,
        name,
        image,
        description,
      }) => (
        <div
          key={id}
          className="col-lg-4 d-flex align-items-stretch"
          style={{ marginBottom: '1em' }}
        >
          <div className="card" style={{ width: '20rem' }}>
            <img
              src={image}
              className="card-img-top"
            />
            <div className="card-block" style={{ padding: '1em' }}>
              <h4 className="card-title">{name}</h4>
              <p className="card-text">{description}</p>
              <Link to={`${to}${_id}`} className="btn btn-primary">Check it out</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

BotFeaturesPage.propTypes = {};

export default BotFeaturesPage;
