import {
  comparePassword,
  createToken,
  hashPassword,
  verifyToken,
} from './auth.utils';
import config from '../../config';
import { describe, expect, test } from '@jest/globals';

describe('JWT Token Utilities', () => {
  const payload = { userId: 'user123', role: 'user' };
  const secret = config.jwt_access_secret;

  test('should generate a valid token', () => {
    const token = createToken(
      payload,
      secret as string,
      config.jwt_access_expire_in,
    );
    expect(typeof token).toBe('string');
  });

  test('should verify a valid token', () => {
    const token = createToken(
      payload,
      secret as string,
      config.jwt_access_expire_in,
    );
    const decoded = verifyToken(token, secret as string);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.role).toBe(payload.role);
  });

  test('should throw error for invalid token', () => {
    expect(() => verifyToken('invalid.token.here', secret as string)).toThrow();
  });
});

describe('Password Utilities', () => {
  const plainPassword = 'mypassword123';

  test('should hash the password', async () => {
    const hash = await hashPassword(plainPassword);
    expect(hash).not.toEqual(plainPassword);
    expect(hash).toMatch(/^\$2[aby]\$.{56}$/); // bcrypt format
  });

  test('should compare the password correctly', async () => {
    const hash = await hashPassword(plainPassword);
    const isMatch = await comparePassword(plainPassword, hash);
    expect(isMatch).toBe(true);
  });

  test('should fail comparison with wrong password', async () => {
    const hash = await hashPassword(plainPassword);
    const isMatch = await comparePassword('wrongpass', hash);
    expect(isMatch).toBe(false);
  });
});
