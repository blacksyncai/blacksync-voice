export default function handler(req, res) {
  // Stop an active campaign
  // TODO: update campaign status to stopped and cease call processing
  return res.status(200).json({ message: 'Stop campaign endpoint' });
}
