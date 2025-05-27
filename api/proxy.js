export default async function handler(req, res) {
  const { url, referer } = req.query;

  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': '*/*',
        'Referer': referer || '',
        'Origin': new URL(url).origin,
      }
    });

    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType || 'application/octet-stream');

    const body = await response.body;
    if (body) {
      body.pipe(res);
    } else {
      res.status(500).send('Stream body missing');
    }

  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message);
  }
}