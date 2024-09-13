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
  try {
    // Get user from request.
    const user = req.body?.user;

    //Find if user with email exists in DB
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
    });

    //Find if user with username exists in DB
    const checkUsername = await prisma.user.findUnique({
      where: {
        username: user?.username,
      },
    });

    if (!checkEmail && !checkUsername) {
      // Create a user in DB
      const createdUser = await prisma.user.create({
        data: {
          username: user?.username,
          description: user?.description,
          dateOfBirth: user?.dateOfBirth,
          password: user?.password,
          email: user?.email,
          name: user?.name,
          gender: user?.gender,
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

      // Set the username in cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('user', createdUser?.id as string, {
          path: '/',
          httpOnly: true,
          maxAge: 60 * 60 * 24,
        })
      );

      // Send the createdUser
      res.status(201).send({ user: createdUser });
      return;
    } else if (!checkUsername && checkEmail) {
      // Send error message
      res.status(409).send({ message: 'Email already present in database.' });
      return;
    } else if (checkUsername && !checkEmail) {
      // Send error message
      res.status(409).send({ message: 'Username already in use.' });
      return;
    } else {
      // Send error message
      res.status(409).send({ message: 'Email and username already in use.' });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
  }
}
