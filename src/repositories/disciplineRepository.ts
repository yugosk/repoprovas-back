import client from "../dbStrategy/postgre";
import { Disciplines, TeachersDisciplines } from "@prisma/client";

export async function findDisciplineByName(
  name: string
): Promise<number | null> {
  const discipline: Disciplines | null = await client.disciplines.findUnique({
    where: {
      name,
    },
  });

  if (!discipline) {
    return null;
  }

  return discipline.id;
}

export async function findRelation(disciplineId: number, teacherId: number) {
  const teachersDisciplines = await client.teachersDisciplines.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });

  if (!teachersDisciplines) {
    return null;
  }

  return teachersDisciplines.id;
}
