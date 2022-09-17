import client from "../dbStrategy/postgre";
import { Users } from "@prisma/client";

export type UserInsertData = Omit<Users, "id">;

export async function findByEmail(email: string): Promise<Users | null> {
  const user: Users | null = await client.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function insert(user: UserInsertData) {
  return await client.users.create({
    data: {
      ...user,
    },
  });
}
