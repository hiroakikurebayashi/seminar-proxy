export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;

  const response = await fetch('https://script.google.com/macros/s/AKfycbydlT7E7o4Sl82DPv7GetaCxxeLczkcYUnQSWpytFNjMAYdF0cuT4xpUh8cxpkXlTsL_Q/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to forward data' });
  }

  const result = await response.text();
  res.status(200).json({ message: 'Success', result });
}
