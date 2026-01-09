import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id, client_id } = req.query;

  if (!id || !client_id) {
    return res.status(400).json({ error: 'Missing agent id or client_id' });
  }

  const { error } = await supabaseAdmin
    .from('agents')
    .delete()
    .eq('id', id)
    .eq('client_id', client_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}


