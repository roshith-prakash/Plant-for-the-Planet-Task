import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

type Data = {
  user: {
    name: string;
    dateOfBirth: string;
    username: string;
    gender: string;
    email: string;
    description: string | null;
  };
};

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Message>
) {
  const cookies: { username?: string } = req.cookies;
  console.log(cookies);

  //  If cookie is not present
  if (!cookies?.username) {
    // Send error message
    res.status(404).send({ message: 'User not present' });
    return;
  }

  try {
    //Find if user with email exists in DB

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('username', '', {
        httpOnly: true,
        maxAge: 0.5,
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
