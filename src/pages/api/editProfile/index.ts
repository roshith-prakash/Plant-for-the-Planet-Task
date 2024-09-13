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
  const cookies: { user?: string } = req.cookies;

  if (!cookies?.user) {
    res.status(404).send({ message: 'User not signed in.' });
    return;
  }

  try {
    // Get user from request.
    const user = req.body?.user;

    //Find if user with email exists in DB
    const checkUsername = await prisma.user.findUnique({
      where: {
        username: user?.username,
      },
    });

    const getCurrentUser = await prisma.user.findUnique({
      where: {
        id: cookies?.user,
      },
    });

    // If username is used by some other user, send conflict error
    if (checkUsername && checkUsername?.id != getCurrentUser?.id) {
      // Send error message
      res.status(409).send({ message: 'Username already in use.' });
      return;
    }

    // Create a user in DB
    const createdUser = await prisma.user.update({
      where: {
        id: cookies?.user,
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

    // Send the updated User object
    res.status(201).send({ user: createdUser });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
  }
}
