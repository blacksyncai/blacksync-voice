import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });

  const { client_id, name, vapi_agent_id = null, voice = 'marissa', prompt = null, status = 'inactive' } = req.body || {};
  if (!client_id || !name) return res.status(400).json({ error: 'client_id and name are required' });

  const { data, error } = await supabaseAdmin
    .from('agents')
    .insert([{ client_id, name, vapi_agent_id, voice, prompt, status }])
    .select('*')
    .single();

  if (error) return res.status(400).json({ error: error.message });

  return res.status(200).json({ agent: data });
}
