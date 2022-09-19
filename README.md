# <p align = "center"> RepoProvas </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-yugosk-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/yugosk/repoprovas-back?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

This project is the back-end of a server that lets students share and see tests from past semesters, divided by teachers, categories and terms.

---

## :computer: Tecnologies

- REST APIs
- JWTs
- Node.js
- TypeScript
- postgreSQL with Prisma

---

## :rocket: Rotas

```yml
POST /sign-up
    - Route to create a new account
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum",
        "confirmPassword": "loremipsum"
    }
```

```yml
POST /login
    - Route to login with created account
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
```

```yml
GET /tests/tems (authenticated)
    - Route to get all tests, ordered by terms
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /tests/teachers (authenticated)
    - Route to get all tests, ordered by teachers
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Using the app

This project was developed using Node.js and npm, to use it, first you clone the repository:

```
git clone https://github.com/yugosk/repoprovas-back
```

Then, install dependencies:

```
npm i #
```

Start up your postgreSQL database using prisma:

```
npx prisma db pull && npx prisma migrate dev
```

Finally, build and start:

```
npm build
npm start
```
