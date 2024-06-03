const request = require("supertest");
const app = require("./app.js")
const {items} = require("./seedData.js")

test("can get one item by id", async () => {
    const res = await request(app).get("/api/items/1")
    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res.text)
    expect(data).toEqual(expect.objectContaining(items[0]))
})


