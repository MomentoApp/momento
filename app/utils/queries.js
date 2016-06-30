require('es6-promise').polyfill();
require('fetch-everywhere');
import SERVER_ADDRESS from '../config/serverAddress';

const getVideos = (cb) => fetch(SERVER_ADDRESS + '/api/video/100/200/50000000', { method: 'GET' })
  .then(response => response.json())
  .then(result => cb(result))
  .catch(error => console.log('Error getting videos:', error));

const saveVideo = (video, cb) => fetch(SERVER_ADDRESS + '/api/video', {
  method: 'POST',
  body: JSON.stringify(video),
  headers: { 'Content-type': 'application/json' },
})
  .then(response => response.json())
  .then(result => cb(result))
  .catch(error => console.log('Error saving videos:', error));


module.exports.getVideos = getVideos;
module.exports.saveVideo = saveVideo;
