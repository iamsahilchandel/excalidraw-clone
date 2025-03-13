import "dotenv/config";

export const PORT: number = Number(process.env.WS_PORT) || 3002;
export const JWT_SECRET = process.env.JWT_SECRET;
