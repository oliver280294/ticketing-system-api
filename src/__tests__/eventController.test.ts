import request from "supertest";
import app from "../app"; // Your main Express app

describe("Events", () => {
  let token: string;

  beforeAll(async () => {
    // Assuming you have a login endpoint to get the token
    const loginResponse = await request(app)
      .post("/api/user/login")
      .send({ email: "example@gmail.com", password: "mySecretPassword" });

    if (loginResponse.status !== 200) {
      throw new Error(`Login failed with status ${loginResponse.status}`);
    }

    token = loginResponse.body.token; // Save the token for future requests
  });

  describe("GET /api/events", () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(app).get("/api/events");
    });

    it("should return status 200", () => {
      expect(response.statusCode).toEqual(200);
    });

    it("should return a list of events", () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
