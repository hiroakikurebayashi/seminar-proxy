export default async function handler(req, res) {
  // CORSのプリフライトリクエスト対応
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end(); // 空のレスポンスを返す
  }

  // POST 以外は拒否
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS 許可ヘッダー
  res.setHeader('Access-Control-Allow-Origin', '*');

  // フォームから受け取ったデータ
  const data = req.body;

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbydlT7E7o4Sl82DPv7GetaCxxeLczkcYUnQSWpytFNjMAYdF0cuT4xpUh8cxpkXlTsL_Q/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to forward data' });
    }

    const result = await response.text();
    res.status(200).json({ message: 'Success', result });

  } catch (error) {
    res.status(500).json({ error: 'Unexpected error', detail: error.message });
  }
}
