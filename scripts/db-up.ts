import { execSync } from 'child_process';

const env = process.env.NODE_ENV || 'development';
const dockerComposeFile = env === 'test' ? 'docker-compose.test.yaml' : 'docker-compose.dev.yaml';

console.log(`Iniciando la base de datos para el entorno: ${env}`);
console.log(`Usando el archivo Docker Compose: ${dockerComposeFile}`);

try {
  execSync(`docker-compose -f ${dockerComposeFile} up -d`, { stdio: 'inherit' });
  console.log('Base de datos iniciada con éxito');
} catch (error) {
  console.error('Error al iniciar la base de datos:', error);
  process.exit(1);
}