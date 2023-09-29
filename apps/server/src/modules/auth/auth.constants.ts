import { readFileSync } from 'fs';

export const privateKey = readFileSync('keys/private.pem');

export const publicKey = readFileSync('keys/public.pem');
