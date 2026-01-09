export default function handler(req, res) {
  // List campaigns for the authenticated client
  // TODO: retrieve campaigns from database filtered by client_id
  return res.status(200).json({ message: 'List campaigns endpoint' });
}
