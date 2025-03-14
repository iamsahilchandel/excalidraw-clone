import z from "zod";

export const UserSchema = z.object({
  avatar: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export type User = z.infer<typeof UserSchema>;

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type Signin = z.infer<typeof SigninSchema>;

export const CreateRoomSchema = z.object({
  name: z.string(),
});

export type CreateRoom = z.infer<typeof CreateRoomSchema>;

export const ChatSchema = z.object({
  roomId: z.string(),
  userId: z.string(),
  message: z.string(),
});

export type Chat = z.infer<typeof ChatSchema>;
