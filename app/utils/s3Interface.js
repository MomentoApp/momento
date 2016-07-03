import { RNS3 } from 'react-native-aws3';
import AMAZON_S3 from '../config/apiKeys';

const options = {
  keyPrefix: 'uploads/',
  bucket: AMAZON_S3.BUCKET,
  region: AMAZON_S3.REGION,
  accessKey: AMAZON_S3.ACCESS_KEY,
  secretKey: AMAZON_S3.SECRET_KEY,
  successActionStatus: 201,
};

const saveToS3 = (file, cb, progressCb) => {
  RNS3.put(file, options)
  .then(response => {
    if (response.status !== 201) console.log('Failed to upload to S3');
    cb(response);
    console.log('RESPONSE', JSON.stringify(response));
  })
  .catch((e) => console.log(e))
  .progress((e) => { progressCb(e.loaded, e.total); });
};

module.exports.saveToS3 = saveToS3;
