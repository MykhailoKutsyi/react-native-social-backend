const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
// const { User } = require("../../models/user");

// const { DB_TEST_HOST, PORT } = process.env;

describe("test auth routes", () => {
  //   jest.setTimeout(20000);

  let server;
  beforeAll((done) => {
    server = app.listen(PORT);
    done();
  });
  afterAll((done) => {
    server.close();
    // mongoose.connection.close();
    mongoose.disconnect();
    done();
  });

  beforeEach((done) => {
    // mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    //   mongoose.connection.db.dropCollection(() => {
    //     mongoose.connection.close(() => done());
    //   });
    mongoose.disconnect();
    done();
  });

  test("test register route", async () => {
    const newUserCredentials = {
      email: "awd11@awd.com",
      password: "1234567",
      name: "Mykhailo",
    };
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send(newUserCredentials);
    // console.log(registerResponse);
    expect(registerResponse.statusCode).toBe(201);
  });

  test("test login route", async () => {
    const loginUserCredentials = {
      email: "awd11@awd.com",
      password: "1234567",
    };
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send(loginUserCredentials);
    // console.log(loginResponse);
    expect(loginResponse.statusCode).toBe(200);
    const { body } = loginResponse;
    expect(body.token).toBeTruthy();
  });
});
