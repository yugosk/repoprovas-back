import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/postgre";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "Tests"`;
});

const userForToken = {
  email: "test@test.com",
  password: "123456",
  confirmPassword: "123456",
};

const loginCredentials = {
  email: "test@test.com",
  password: "123456",
};

const newTest = {
  name: "test insertion of teste",
  pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
  category: "Projeto",
  discipline: "HTML e CSS",
  teacher: "Diego Pinho",
};

describe("POST /tests", () => {
  it("Should create a new test and return code 201", async () => {
    const token = await getToken();

    const result = await supertest(app)
      .post("/tests")
      .set({ Authorization: `Bearer ${token}` })
      .send(newTest);

    const createdPost = await client.tests.findFirst({
      where: {
        name: newTest.name,
      },
    });

    expect(result.status).toBe(201);
    expect(createdPost).not.toBeNull();
  });

  it("Should return status code 401, in case token is not sent", async () => {
    const result = await supertest(app)
      .post("/tests")
      .send({ ...newTest, category: "test" });

    expect(result.status).toBe(401);
  });

  it("Should return status code 404, in case an invalid category is sent", async () => {
    const token = await getToken();

    const result = await supertest(app)
      .post("/tests")
      .set({ Authorization: `Bearer ${token}` })
      .send({ ...newTest, category: "test" });

    expect(result.status).toBe(404);
  });

  it("Should return status code 404, in case an invalid teacher is sent", async () => {
    const token = await getToken();

    const result = await supertest(app)
      .post("/tests")
      .set({ Authorization: `Bearer ${token}` })
      .send({ ...newTest, teacher: "test" });

    expect(result.status).toBe(404);
  });

  it("Should return status code 404, in case an invalid discipline is sent", async () => {
    const token = await getToken();
    console.log(token);

    const result = await supertest(app)
      .post("/tests")
      .set({ Authorization: `Bearer ${token}` })
      .send({ ...newTest, discipline: "test" });

    expect(result.status).toBe(404);
  });
});

async function getToken() {
  await supertest(app).post("/sign-up").send(userForToken);
  const { text: token } = await supertest(app)
    .post("/login")
    .send(loginCredentials);
  return token;
}

afterAll(async () => {
  await client.$disconnect();
});
