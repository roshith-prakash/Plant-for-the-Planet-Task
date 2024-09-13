import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prismaClient';
import jwt, { JwtPayload } from 'jsonwebtoken';

// User data returned from API.
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

// Error message sent from API.
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

    // Get data from cookie JWT
    const CookieUser = jwt.verify(
      cookies?.user,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Get user with id stored in cookie
    const getCurrentUser = await prisma.user.findUnique({
      where: {
        id: CookieUser?.id,
      },
    });

    // If username is used by some other user, send conflict error
    if (checkUsername && checkUsername?.id != getCurrentUser?.id) {
      // Send error message
      res.status(409).send({ message: 'Username already in use.' });
      return;
    }

    // Update the user in DB
    const createdUser = await prisma.user.update({
      where: {
        id: CookieUser?.id,
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
    // Return error
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
    return;
  }
}
