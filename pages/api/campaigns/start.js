export default function handler(req, res) {
  // Start a campaign
  // TODO: update campaign status to started and trigger call processing
  return res.status(200).json({ message: 'Start campaign endpoint' });
}
