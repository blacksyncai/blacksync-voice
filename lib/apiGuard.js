export function apiGuard(req, res) {
  const apiKey = req.headers['x-api-key'];
  const clientId =
    req.query.client_id ||
    req.body?.client_id ||
    req.headers['x-client-id'];

  if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  if (!clientId) {
    res.status(400).json({ error: 'Missing client_id' });
    return null;
  }

  return { client_id: clientId };
}

