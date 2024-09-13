import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const cookies: { username?: string } = req.cookies;

  //  If cookie is not present
  if (!cookies?.username) {
    // Send error message
    res.status(404).send({ message: 'User not present' });
    return;
  }

  try {
    //Delete the cookie by having a small maxAge
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('username', '', {
        httpOnly: true,
        expires: new Date('1970-1-1'),
        secure: true,
      })
    );

    res.status(200).send({ message: 'Logged out.' });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
  }
}
