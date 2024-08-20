import dotenv from 'dotenv';
import path from 'path';
import { execSync } from 'child_process';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

console.log(`Reseteando la base de datos para entorno ${env}`);
execSync('npx prisma db push --force-reset', { stdio: 'inherit' });