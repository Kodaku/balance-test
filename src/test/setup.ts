import request from "supertest";
import { BASE_URL } from "../constants";
import { AppUser } from "../types";

declare global {
  var createTestUser: () => Promise<AppUser>;
  var deleteTestUser: (id: number) => void;
}

beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
});

global.createTestUser = async () => {
  const name = "Test User";

  const response = await request(BASE_URL)
    .post("/api/users")
    .send({
      name: name,
    })
    .expect(201);

  const user = response.body as AppUser;

  return user;
};

global.deleteTestUser = async (id: number) => {
  await request(BASE_URL).delete(`/api/users/${id}`).expect(200);
};
