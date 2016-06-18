const getVideos = (host, cb) => fetch(host + '/api/video', { method: 'GET' })
  .then(response => response.json())
  .then(result => cb(result))
  .catch(error => console.log('Error getting videos:', error));

const saveVideo = (host, video, cb) => fetch(host + '/api/video', {
  method: 'POST',
  body: JSON.stringify(video),
  headers: { 'Content-type': 'application/json' },
})
  .then(response => response.json())
  .then(result => cb(result))
  .catch(error => console.log('Error saving videos:', error));


module.exports.getVideos = getVideos;
module.exports.saveVideo = saveVideo;
