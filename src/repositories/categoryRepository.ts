import client from "../dbStrategy/postgre";
import { Categories } from "@prisma/client";

export async function findCategoryByName(name: string): Promise<number | null> {
  const category: Categories | null = await client.categories.findUnique({
    where: {
      name,
    },
  });

  if (!category) {
    return null;
  }

  return category.id;
}
