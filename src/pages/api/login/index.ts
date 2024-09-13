import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { prisma } from '@/utils/prismaClient';
import bcrypt from 'bcrypt';

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
  try {
    // Get user from request.
    const user = req.body?.user;

    const getUserPassword = await prisma.user.findUnique({
      where: {
        username: user?.username,
      },
      select: {
        password: true,
      },
    });

    if (getUserPassword) {
      const result = await bcrypt.compare(
        user?.password,
        getUserPassword?.password
      );

      if (result) {
        const userInDB = await prisma.user.findUnique({
          where: {
            username: user?.username,
          },
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            dateOfBirth: true,
            gender: true,
            description: true,
          },
        });

        // If user is found, set the username in cookie
        if (userInDB) {
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('user', userInDB?.id as string, {
              path: '/',
              httpOnly: true,
              maxAge: 60 * 60 * 24,
            })
          );

          // Return the user object
          res.status(200).send({ user: userInDB });
          return;
        }
      } else {
        // Send error message
        res.status(404).send({ message: 'Invalid Credentials.' });
        return;
      }
    } else {
      // Send error message
      res.status(404).send({ message: 'Invalid Credentials.' });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
  }
}

// Roshith@1
