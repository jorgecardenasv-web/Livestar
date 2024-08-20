import dotenv from 'dotenv';
import path from 'path';
import { execSync } from 'child_process';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

console.log(`Haciendo push de la base de datos para entorno ${env}`);

try {
  console.log('Ejecutando prisma db push...');
  execSync(`npx prisma db push --schema=./prisma/schema.prisma`, { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: env }
  });
} catch (error) {
  console.error('Error durante el proceso de push:', error);
  process.exit(1);
}