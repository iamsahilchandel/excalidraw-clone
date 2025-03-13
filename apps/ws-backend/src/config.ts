import "dotenv/config";
export { JWT_SECRET } from "@repo/backend-common/config";

export const PORT: number = Number(process.env.WS_PORT) || 3002;
