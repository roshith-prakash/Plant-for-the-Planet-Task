import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { prisma } from '@/utils/prismaClient';

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

  //  If cookie is not present
  if (!cookies?.username) {
    // Send error message
    res.status(404).send({ message: 'User not present' });
    return;
  }

  try {
    //Find if user with email exists in DB
    const userInDB = await prisma.user.findUnique({
      where: {
        username: cookies?.username,
      },
    });

    if (userInDB) {
      res.status(200).send({ user: userInDB });
      return;
    } else {
      // Send error message
      res.status(404).send({ message: 'User not present' });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
  }
}
