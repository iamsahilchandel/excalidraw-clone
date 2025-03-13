import z from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
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
