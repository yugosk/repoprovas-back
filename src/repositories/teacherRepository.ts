import client from "../dbStrategy/postgre";
import { Teachers } from "@prisma/client";

export async function findTeacherByName(name: string): Promise<number | null> {
  const teacher: Teachers | null = await client.teachers.findUnique({
    where: {
      name,
    },
  });

  if (!teacher) {
    return null;
  }

  return teacher.id;
}
