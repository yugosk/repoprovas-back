import client from "../dbStrategy/postgre";
import { TeachersDisciplines } from "@prisma/client";

export async function findTeacherDiscipline(
  teacherId: number,
  disciplineId: number
): Promise<number | null> {
  const teacherDisciplineId: TeachersDisciplines | null =
    await client.teachersDisciplines.findUnique({
      where: {
        teacherId_disciplineId: {
          teacherId,
          disciplineId,
        },
      },
    });

  if (!teacherDisciplineId) {
    return null;
  }

  return teacherDisciplineId.id;
}
