import * as jwt from 'jsonwebtoken';

export const generateToken = (
  data: Record<string, any>,
  secret: string,
  expiresIn: number | string = '1h',
): string => {
  return jwt.sign({ ...data }, secret, { expiresIn });
};

export const verifyToken = (
  token: string,
  secret: string,
): string | jwt.JwtPayload => {
  return jwt.verify(token, secret);
};
