import React from 'react';
import { Link } from 'react-router';

import '/imports/ui/pages/ForgotPassword/style';

const authors = [{
  name: 'Ethan Escareño Rosano',
  email: 'ethan.rosanoo@gmail.com',
}, {
  name: 'Katya Denisse de la Rosa Cadena',
  email: 'katyadelarosa@gmail.com',
}];

export default () => (
  <div className="container">
    <div className="alert alert-success forgot-password__message" role="alert">
      <strong>You are terrible!</strong>
      <p>
        How can you forgot your password? geeez, ahh jk jk, email me
        to.
      </p>
      <div>
        {authors.map(({ email }) => (
          <div>
            <a href={`mailto:${email}?Subject=Forgot%20Password`} target="_top">{email}</a>
          </div>
        ))}
      </div>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  </div>
);
