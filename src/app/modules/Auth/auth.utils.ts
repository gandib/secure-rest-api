/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayLoad: { userId: string; role: string },
  secret: string,
  expiresIn: any,
) => {
  return jwt.sign(jwtPayLoad, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
