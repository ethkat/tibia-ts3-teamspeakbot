import { push } from 'react-router-redux';

export const redirectTo = ({ to }) => (
  (dispatch) => {
    dispatch(push(to));
  }
);
