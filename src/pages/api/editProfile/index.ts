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

  if (!cookies?.username) {
    res.status(409).send({ message: 'User already signed in.' });
    return;
  }

  try {
    // Get user from request.
    const user = req.body?.user;

    // Create a user in DB
    const createdUser = await prisma.user.update({
      where: {
        username: cookies?.username,
      },
      data: {
        username: user?.username,
        description: user?.description,
        dateOfBirth: user?.dateOfBirth,
        email: user?.email,
        name: user?.name,
        gender: user?.gender,
      },
      select: {
        name: true,
        username: true,
        email: true,
        dateOfBirth: true,
        gender: true,
        description: true,
      },
    });

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('username', createdUser?.username as string, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: true,
      })
    );

    // Send the createdUser
    res.status(201).send({ user: createdUser });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
  }
}
