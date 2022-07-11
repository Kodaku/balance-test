import request from "supertest";
import { BASE_URL } from "../../constants";

it("get all the app users", async () => {
  const response = await request(BASE_URL)
    .get("/api/users")
    .send({})
    .expect(200);

  console.log(response.body);
});

it("create a user with a given ID, get it and delete it", async () => {
  const appUser = await global.createTestUser();

  const userResponse = await request(BASE_URL)
    .get(`/api/users/${appUser.id}`)
    .expect(200);

  console.log(userResponse.body);

  global.deleteTestUser(appUser.id);
});

it("creates a user and then delete it", async () => {
  const appUser = await global.createTestUser();
  global.deleteTestUser(appUser.id);
});

it("create a user with a given ID, update it and delete it", async () => {
  const appUser = await global.createTestUser();

  console.log("Before Update: ", appUser);

  const userResponse = await request(BASE_URL)
    .put(`/api/users/${appUser.id}`)
    .send({
      name: "Carlone",
    })
    .expect(200);

  console.log("After Update: ", userResponse.body);

  global.deleteTestUser(appUser.id);
});

it("get a 404 for a user not found", async () => {
  const response = await request(BASE_URL).get(`/api/users/${0}`).expect(404);

  console.log(response.body);
});

it("get a 400 for a bad request using invalid user id", async () => {
  const response = await request(BASE_URL)
    .get("/api/users/ferhfkjerh")
    .expect(400);

  console.log(response.body);
});
