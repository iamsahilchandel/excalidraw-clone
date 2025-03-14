import "dotenv/config";
export { JWT_SECRET } from "@repo/backend-common/config";

export const PORT = process.env.HTTP_PORT || 3001;
export const ENCRYPTION_SALT = process.env.ENCRYPTION_SALT || "my-secret-salt";