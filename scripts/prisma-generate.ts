import dotenv from 'dotenv';
import path from 'path';
import { execSync } from 'child_process';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

console.log(`Generando Prisma para entorno ${env}`);
execSync('npx prisma generate', { stdio: 'inherit' });