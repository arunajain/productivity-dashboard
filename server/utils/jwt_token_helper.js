import pkg from 'jsonwebtoken';
const { sign } = pkg;

export function signAccessToken(userId) {
  const accessToken = sign(
    { _id: userId },
    jwtSecretKey,
    {
      expiresIn: '1h',
    }
  );
  return accessToken;
}
export function signRefreshToken(userId) {
  const refreshToken = sign(
    { _id: userId },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
}
