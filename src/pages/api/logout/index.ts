import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

// Error message sent from API.
type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  // Get cookies from request
  const cookies: { user?: string } = req.cookies;

  //  If cookie is not present
  if (!cookies?.user) {
    // Send error message
    res.status(404).send({ message: 'User not present' });
    return;
  }

  try {
    // Making sure caching is not implemented
    res.setHeader('Cache-Control', 'no-store');

    //Delete the cookie by having a small maxAge
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('user', '', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 20,
      })
    );

    // Return logged out message
    res.status(200).send({ message: 'Logged out.' });
    return;
  } catch (err) {
    // Return error
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
    return;
  }
}
