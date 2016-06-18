const getVideos = (host, cb) => fetch(host + '/api/video', { method: 'GET' })
  .then(response => response.json())
  .then(result => cb(result))
  .catch(error => console.log('Error getting videos:', error));

module.exports.getVideos = getVideos;
