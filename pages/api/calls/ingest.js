import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import { apiGuard } from '../../../lib/apiGuard';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const guard = apiGuard(req, res);
  if (!guard) return;
  const { client_id } = guard;

  const {
    agent_id,
    phone,
    duration,
    recording_url,
    transcript,
    outcome,
    started_at
  } = req.body;

  if (!agent_id || !phone || !started_at) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert call
  const { data: call, error: callError } = await supabaseAdmin
    .from('calls')
    .insert({
      client_id,
      agent_id,
      phone,
      duration: duration ?? null,
      recording_url: recording_url ?? null,
      transcript: transcript ?? null,
      outcome: outcome ?? null,
      started_at
    })
    .select()
    .single();

  if (callError) {
    return res.status(500).json({ error: callError.message });
  }

  // Minimal analytics (stub)
  const sentiment =
    transcript && transcript.toLowerCase().includes('angry')
      ? 'negative'
      : 'neutral';

  const intent_score =
    outcome === 'booked' ? 90 :
    outcome === 'interested' ? 70 :
    30;

  const { error: analyticsError } = await supabaseAdmin
    .from('call_analytics')
    .insert({
      call_id: call.id,
      client_id,
      sentiment,
      intent_score,
      success: outcome === 'booked'
    });

  if (analyticsError) {
    return res.status(500).json({ error: analyticsError.message });
  }

  return res.status(200).json({ success: true, call_id: call.id });
}


