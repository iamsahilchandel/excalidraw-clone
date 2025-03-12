import 'dotenv/config';

export const PORT: number = Number(process.env.HTTP_PORT) || 3002;