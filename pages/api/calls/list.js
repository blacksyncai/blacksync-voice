export default function handler(req, res) {
  // List calls for the authenticated client
  // TODO: retrieve call records joined with related tables filtered by client_id
  return res.status(200).json({ message: 'List calls endpoint' });
}
