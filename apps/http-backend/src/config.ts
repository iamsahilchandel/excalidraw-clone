import "dotenv/config";
export { JWT_SECRET } from "@repo/backend-common/config";

export const PORT = process.env.HTTP_PORT || 3001;
