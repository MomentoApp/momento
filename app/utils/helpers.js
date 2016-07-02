import secret from '../config/secret';

const getHeaders = store => {
  return {
    id: store.getState().user.userId,
    token: store.getState().user.token,
    secret,
  };
};

module.exports = getHeaders;
