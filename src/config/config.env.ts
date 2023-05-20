export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '',
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port:  parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || 'test',
  },
  default_user: {
    username: process.env.DEFAULT_USER_NAME || '',
    password: process.env.DEFAULT_USER_PASSWORD || '',
  },
});

export const PORT = 'port';

export const JWT_SECRET = 'jwt.secret';
export const JWT_EXPIRES_IN = 'jwt.expiresIn';
export const DATABASE_HOST = 'database.host';
export const DATABASE_PORT = 'database.port';
export const DATABASE_USERNAME = 'database.username';
export const DATABASE_PASSWORD = 'database.password';
export const DATABASE_NAME = 'database.name';
export const DEFAULT_USER_NAME = 'default_user.username';
export const DEFAULT_USER_PASSWORD = 'default_user.password';
