import { readFileSync } from 'fs';

export const privateKey =
  readFileSync('keys/private.pem') ?? process.env.PRIVATE_KEY;

export const publicKey =
  readFileSync('keys/public.pem') ?? process.env.PUBLIC_KEY;
