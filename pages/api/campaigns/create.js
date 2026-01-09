export default function handler(req, res) {
  // Create a new campaign
  // TODO: create campaign in database and associate with client and agent
  return res.status(200).json({ message: 'Create campaign endpoint' });
}
