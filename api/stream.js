const request = require('request');

export default function handler(req, res) {
  const { query } = req;
  const streamPath = query.path;

  if (!streamPath) {
    return res.status(400).send('Missing stream path');
  }

  const fullUrl = `http://125.209.88.166:45793/${streamPath}`;
  console.log('Proxying:', fullUrl);

  req.pipe(request(fullUrl)).pipe(res);
}