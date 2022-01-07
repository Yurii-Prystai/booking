import { JsonWebTokenError } from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../utils';

describe('Jwt utils tests', () => {
  it('generateToken function returns jwt token for provided data as object', () => {
    const jwtSecret = 'secret';
    const data = { data: true };
    const jwtToken = generateToken(data, jwtSecret);

    expect(typeof jwtToken).toBe('string');
    expect(jwtToken).not.toEqual(data);
  });

  it('verifyToken function verifies that token is valid and returns corresponding data', () => {
    const jwtSecret = 'secret';
    const data = { data: true };
    const jwtToken = generateToken(data, jwtSecret);
    const verifiedToken = verifyToken(jwtToken, jwtSecret);

    expect(typeof verifiedToken).toBe('object');
    expect(verifiedToken).toEqual(expect.objectContaining(data));
  });

  it('verifyToken function errors with jwt error if pass non jwt string', () => {
    try {
      const jwtSecret = 'secret';
      const jwtToken = 'fdhgsjhsdhjg';
      
      verifyToken(jwtToken, jwtSecret);
    } catch (err) {
      expect(err).toBeInstanceOf(JsonWebTokenError);
      expect(err.message).toBe('jwt malformed');
    }
  });
});
