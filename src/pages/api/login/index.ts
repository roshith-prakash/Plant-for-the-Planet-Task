import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { prisma } from '@/utils/prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  try {
    // Get user from request.
    const user = req.body?.user;

    // Get User from DB
    const getUserPassword = await prisma.user.findUnique({
      where: {
        username: user?.username,
      },
      select: {
        password: true,
      },
    });

    // If user is present
    if (getUserPassword) {
      // Compare password sent in request body to user's password in DB
      const result = await bcrypt.compare(
        user?.password,
        getUserPassword?.password
      );

      // IF password matches
      if (result) {
        // Retrieve the user object from DB
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
          // Sign JWT with user ID
          const jwtData = jwt.sign(
            {
              id: userInDB?.id,
            },
            process.env.JWT_SECRET as string,
            {
              expiresIn: '1d',
            }
          );

          // Set the user in cookie
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('user', jwtData, {
              path: '/',
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
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
    return;
  }
}

// Roshith@1
