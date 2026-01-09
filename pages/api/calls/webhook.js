export default function handler(req, res) {
  // Handle webhook from call provider
  // TODO: process call status updates and store call records
  return res.status(200).json({ message: 'Webhook endpoint' });
}
