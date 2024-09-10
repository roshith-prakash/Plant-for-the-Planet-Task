import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookies: {} = req.cookies;
  console.log(cookies);

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('name', 'John Doe', {
      httpOnly: true,
      maxAge: 60 * 60,
      secure: true,
    })
  );
  res.status(200).json({ name: 'John Doe' });
}
