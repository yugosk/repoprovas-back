import { response } from "express";
import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/postgre";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "Users"`;
});

const newUser = {
  email: "test@test.com",
  password: "123456",
  confirmPassword: "123456",
};

const loginCredentials = {
  email: "test@test.com",
  password: "123456",
};

describe("POST /sign-up", () => {
  it("Should create new user and return code 201", async () => {
    const result = await supertest(app).post("/sign-up").send(newUser);

    const createdUser = await client.users.findUnique({
      where: {
        email: newUser.email,
      },
    });

    expect(result.status).toBe(201);
    expect(createdUser).not.toBeNull();
  });

  it("Should return status code 409 if email is already in use", async () => {
    await supertest(app).post("/sign-up").send(newUser);
    const result = await supertest(app).post("/sign-up").send(newUser);

    expect(result.status).toBe(409);
  });
});

describe("POST /login", () => {
  it("Should return a jwt token", async () => {
    await supertest(app).post("/sign-up").send(newUser);
    const result = await supertest(app).post("/login").send(loginCredentials);
    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });

  it("Should return code 404 if an invalid email is used", async () => {
    const result = await supertest(app).post("/login").send(loginCredentials);
    expect(result.status).toBe(404);
  });

  it("Should return status code 401 if the password is not correct", async () => {
    await supertest(app).post("/sign-up").send(newUser);
    const result = await supertest(app)
      .post("/login")
      .send({ ...loginCredentials, password: "12345" });
    expect(result.status).toBe(401);
  });
});

afterAll(async () => {
  await client.$disconnect();
});
