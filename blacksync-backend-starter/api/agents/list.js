import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Use GET' });
  }

  if (req.headers['x-api-key'] !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { client_id } = req.query;

  if (!client_id) {
    return res.status(400).json({ error: 'client_id is required' });
  }

  const { data, error } = await supabaseAdmin
    .from('agents')
    .select('*')
    .eq('client_id', client_id)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ agents: data });
}
