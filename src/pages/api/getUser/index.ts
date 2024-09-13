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

export const revalidate = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Message>
) {
  // Get the cookies from the request
  const cookies: { user?: string } = req.cookies;

  //  If cookie is not present
  if (!cookies?.user) {
    // Send error message
    res.status(404).send({ message: 'User not present' });
    return;
  }

  try {
    // Get data from cookie JWT
    const user = jwt.verify(
      cookies?.user,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    //Find if user with email exists in DB
    const userInDB = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    // If user is present, return user object
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
    return;
  }
}
