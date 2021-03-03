const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("API Suite Test", () => {
  describe("/contact", () => {
    it("shoudl request the contact page and eturn http status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexisten route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/h1").expect(200);
      assert.deepStrictEqual(response.text, "Hello world");
    });
  });

  describe("/login", () => {
    it("should login succesfuly on the login route and return http status 200 ", async () => {
      const response = await await request(app).post("/login").send({
          username: "Victor Freitas",
          password: "123",
        }).expect(200);
      assert.deepStrictEqual(response.text, "Login has succeeded");
    });

    it("should unauthorize a request when requesting it usgin wrong credentials an return HTTP Status 401", async () => {
      const response = await await request(app).post("/login").send({
          username: "Victor Nóbrega",
          password: "123",
        }).expect(401);
        assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, "Login failed");
    });
  });
});
 