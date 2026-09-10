import * as dotenv from 'dotenv';

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". Copy .env.example to .env and fill it in.`
    );
  }
  return value;
}

export const env = {
  baseURL: required('BASE_URL', 'https://auth.pre.stgrapidusertests.com'),

  basicAuth: {
    username: required('BASIC_AUTH_USERNAME'),
    password: required('BASIC_AUTH_PASSWORD'),
  },

  standardLogin: {
    email: required('STANDARD_LOGIN_EMAIL'),
    password: required('STANDARD_LOGIN_PASSWORD'),
  },

  sso: {
    email: process.env.SSO_EMAIL ?? '',
    password: process.env.SSO_PASSWORD ?? '',
  },
};
