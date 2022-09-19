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
