/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TUser } from './auth.interface';
import { User } from './auth.model';
import AppError from '../../errors/appError';
import { comparePassword, createToken, verifyToken } from './auth.utils';
import config from '../../config';

const createUser = async (payload: TUser) => {
  const isUserExists = await User.findOne({ email: payload?.email });
  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!');
  }

  const result = await User.create(payload);

  return result;
};

const getUser = async (user: any) => {
  const userData = await User.findById(user?._id);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
  }

  return userData;
};

const loginUser = async (payload: { email: string; password: string }) => {
  //checking if the user is exists
  const user = await User.findOne({ email: payload?.email }).select('password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
  }

  // checking user is already deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted!');
  }

  // checking if password is correct
  if (!(await comparePassword(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched!');
  }

  // create token and send to the user
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  // create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId } = decoded;

  //checking if the user is exists
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
  }

  // checking user is already deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted!');
  }

  // create token and send to the user
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  return {
    accessToken,
  };
};

export const authServices = {
  createUser,
  loginUser,
  refreshToken,
  getUser,
};
