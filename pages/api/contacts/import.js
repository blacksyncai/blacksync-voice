export default function handler(req, res) {
  // Import contacts in bulk
  // TODO: parse CSV or payload and insert contacts into database
  return res.status(200).json({ message: 'Import contacts endpoint' });
}
