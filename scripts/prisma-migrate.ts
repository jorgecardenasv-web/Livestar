import dotenv from 'dotenv';
import path from 'path';
import { execSync } from 'child_process';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

console.log(`Ejecutando migraciones de Prisma para entorno ${env}`);
const command = env === 'production' ? 'npx prisma migrate deploy' : 'npx prisma migrate dev';
execSync(command, { stdio: 'inherit' });