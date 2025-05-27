const request = require('request');

export default function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).send('Missing or invalid URL');
  }

  const options = {
    url: targetUrl,
    headers: {
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
      'Referer': targetUrl,
      'Origin': targetUrl
    }
  };

  req.pipe(request(options)).on('error', (err) => {
    console.error('Stream error:', err.message);
    res.status(500).send('Proxy Error');
  }).pipe(res);
}
