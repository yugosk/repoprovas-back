import { findCategoryByName } from "../repositories/categoryRepository";
import { findDisciplineByName } from "../repositories/disciplineRepository";
import { findTeacherByName } from "../repositories/teacherRepository";
import { findTeacherDiscipline } from "../repositories/teacherDisciplineRepository";
import * as testRepository from "../repositories/testRepository";

export async function newTest(test: testRepository.TestInsertData) {
  const { name, pdfUrl, category, discipline, teacher } = test;
  try {
    const disciplineId = await findDisciplineByName(discipline);
    const teacherId = await findTeacherByName(teacher);

    if (!disciplineId) {
      throw "invalid_discipline";
    }
    if (!teacherId) {
      throw "invalid_teacher";
    }

    const teacherDisciplineId = await findTeacherDiscipline(
      teacherId,
      disciplineId
    );

    if (!teacherDisciplineId) {
      throw "invalid_teacher_discipline";
    }

    const categoryId = await findCategoryByName(category);

    if (!categoryId) {
      throw "invalid_category";
    }

    await testRepository.insert({
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId,
    });
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}

export async function getTests() {
  try {
    const tests = await testRepository.read();
    return tests;
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}

export async function getTestsByTeachers() {
  try {
    const tests = await testRepository.readByTeachers();
    return tests;
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}
