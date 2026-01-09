export default function handler(req, res) {
  // List contacts for the authenticated client
  // TODO: query contacts from database filtered by client_id
  return res.status(200).json({ message: 'List contacts endpoint' });
}
