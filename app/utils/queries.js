require('es6-promise').polyfill();
require('fetch-everywhere');
import SERVER_ADDRESS from '../config/serverAddress';

const radius = 2000000000000;

const getVideos = (headers, location, cb) =>
  fetch(`${SERVER_ADDRESS} + /api/video/${location.latitude}/${location.longitude}/${radius}`,
    {
      method: 'GET',
      headers,
    })
    .then(response => response.json())
    .then(result => cb(result))
    .catch(error => console.log('Error getting videos:', error)
);

const getUserVideos = (headers, cb) => fetch(`${SERVER_ADDRESS} + /api/user_videos/`,
  {
    method: 'GET',
    headers,
  })
  .then(response => response.json())
  .then(result => cb(result))
  .catch(error => console.log('Error getting user videos:', error)
);


const saveVideo = (headers, video, cb) => fetch(`${SERVER_ADDRESS} + /api/video`,
  {
    method: 'POST',
    body: JSON.stringify(video),
    headers: { 'Content-type': 'application/json', headers },
  })
  .then(response => response.json())
  .then(result => cb(result))
  .catch(error => console.log('Error saving videos:', error)
);

const getUserNameEmail = (token, cb) => {
  console.log('I AM HERE');
  return fetch(`https://graph.facebook.com/v2.6/me?fields=name%2Cemail&access_token=${token}`,
    {
      method: 'GET',
    })
  .then(response => response.json())
  .then(result => cb(result.name, result.email))
  .catch(error => console.log('Error getting name and email data from FB', error));
};

const getUserPicture = (token, cb) => {
  console.log('token is', token);
  return fetch(`https://graph.facebook.com/v2.6/me/picture?&height=100&width=100&access_token=${token}`,
    {
      method: 'GET',
    })
  .then(response => response.json())
  .then(result => console.log('this is the result', result))
  .catch(error => console.log('Error getting picture data from FB', error));
};

const saveUserToDb = (headers, name, email, pictureUrl, cb) => (
  fetch(`${SERVER_ADDRESS} + /api/user`,
    {
      method: 'POST',
      body: JSON.stringify({ name, email, pictureUrl }),
      headers: { 'Content-type': 'application/json', headers },
    }
  )
  .then(response => response.json())
  .then(result => { console.log('result is', result); return cb(result); })
  .catch(error => console.log('Error saving user:', error))
);

module.exports.getVideos = getVideos;
module.exports.getUserVideos = getUserVideos;
module.exports.saveVideo = saveVideo;
module.exports.getUserNameEmail = getUserNameEmail;
module.exports.getUserPicture = getUserPicture;
module.exports.saveUserToDb = saveUserToDb;
