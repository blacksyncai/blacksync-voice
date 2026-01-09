import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export default async function handler(req, res) {
  // ---- Method guard ----
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST' });
  }

  // ---- Internal API key guard ----
  if (req.headers['x-api-key'] !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // ---- Parse body ----
  const {
    client_id,
    name,
    vapi_agent_id = null,
    voice = 'marissa',
    prompt = null,
    status = 'inactive',
  } = req.body || {};

  // ---- Validation ----
  if (!client_id || !name) {
    return res.status(400).json({
      error: 'client_id and name are required',
    });
  }

  // ---- Insert into Supabase ----
  const { data, error } = await supabaseAdmin
    .from('agents')
    .insert([
      {
        client_id,
        name,
        vapi_agent_id,
        voice,
        prompt,
        status,
      },
    ])
    .select('*')
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // ---- Success ----
  return res.status(200).json({ agent: data });
}

