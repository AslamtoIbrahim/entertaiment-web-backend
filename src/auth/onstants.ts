export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'topSecrestKey',
  expiresIn: '1h',
};
