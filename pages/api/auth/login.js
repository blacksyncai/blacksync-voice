export default function handler(req, res) {
  // Handle user login
  // TODO: authenticate user and return a JWT or session
  return res.status(200).json({ message: 'Login endpoint' });
}
