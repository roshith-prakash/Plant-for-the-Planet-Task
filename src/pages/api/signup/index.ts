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

    // If neither username or email is already present, create the user
    if (!checkEmail && !checkUsername) {
      // Hash the password sent by the user
      const hashedPassword = await bcrypt.hash(user?.password, 5);

      // Create a user in DB
      const createdUser = await prisma.user.create({
        data: {
          username: user?.username,
          description: user?.description,
          dateOfBirth: user?.dateOfBirth,
          password: hashedPassword,
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

      // Sign the JWT with user ID
      const jwtData = jwt.sign(
        {
          id: createdUser?.id,
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

      // Send the createdUser
      res.status(201).send({ user: createdUser });
      return;
    }
    // If Email is already present
    else if (!checkUsername && checkEmail) {
      // Send error message
      res.status(409).send({ message: 'Email already present in database.' });
      return;
    }
    // If username is already present
    else if (checkUsername && !checkEmail) {
      // Send error message
      res.status(409).send({ message: 'Username already in use.' });
      return;
    }
    // If both email and username is already present
    else {
      // Send error message
      res.status(409).send({ message: 'Email and username already in use.' });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong!' });
    return;
  }
}
