import "dotenv/config";
// export { JWT_SECRET } from "@repo/backend-common/config";

export const PORT = process.env.HTTP_PORT || 3001;
export const JWT_SECRET =
  process.env.JWT_SECRET || "enter-your-jwt-secret-here";
