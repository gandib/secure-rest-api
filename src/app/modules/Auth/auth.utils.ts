/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';

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

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
