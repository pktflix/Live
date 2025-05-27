const request = require('request');

export default function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).send('Invalid or missing URL');
  }

  console.log('Proxying:', targetUrl);
  req.pipe(request(targetUrl)).pipe(res);
}