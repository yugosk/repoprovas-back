import client from "../dbStrategy/postgre";
import { Tests } from "@prisma/client";

export interface TestInsertData {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}

export async function insert(test: Omit<Tests, "id">): Promise<Tests | null> {
  return await client.tests.create({
    data: {
      ...test,
    },
  });
}

export async function read() {
  const tests = await client.terms.findMany({
    select: {
      number: true,
      Disciplines: {
        select: {
          name: true,
          TeachersDisciplines: {
            select: {
              Tests: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: { select: { name: true } },
                  teachersDisciplines: {
                    select: { teacher: { select: { name: true } } },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return tests;
}

export async function readByTeachers() {
  const tests = await client.teachers.findMany({
    select: {
      name: true,
      TeachersDisciplines: {
        select: {
          discipline: { select: { name: true } },
          Tests: {
            select: {
              category: {
                select: {
                  name: true,
                  Tests: { select: { id: true, name: true, pdfUrl: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  return tests;
}
