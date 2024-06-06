const request = require("supertest");
const app = require("./app.js");
const {items} = require("./seedData.js");
const api = require("./api.js");
const {seed} = require("./seed.js");

beforeAll(async () => {
    await seed();
});

describe('GET /api/items', () => {
    it('responds with json', async () => {
        const res = await request(app)
            .get('/api/items')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('responds with array of all item objects', async () => {
        const res = await request(app)
            .get('/api/items')
        expect(res.body[0]).toEqual(expect.objectContaining(items[0]))
        expect(res.body[5]).toEqual(expect.objectContaining(items[5]))
    })
});

describe('GET /api/items/:id', () => {
    it('responds with JSON', async () => {
        const res = await request(app)
            .get(`/api/items/1`)
            .expect('Content-Type', /json/)
            .expect(200);
    });
    
    it("responds with correct item", async () => {
        const res = await request(app)
            .get(`/api/items/1`)
        expect(res.body).toEqual(expect.objectContaining(items[0]))
    })
});

describe('POST /api/items', () => {
    it('creates a new item and responds with JSON', async () => {
        const testData = {
            "name":"Pepsi Max",
            "price":10000,
            "description":"It's so good oh my god I love pepsi so much",
            "category":"Food & Drink",
            "image":"https://images.ctfassets.net/6jpeaipefazr/3j7ws11awGUi9qwjXXafhj/c61fe3fbd0ca029ff81dd0a5359c5c0e/P9-4060800103307.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale"
        }
        const res = await request(app)
            .post('/api/items')
            .send(testData)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(res.body).toEqual(expect.objectContaining(testData))
    });
});

describe('PUT /api/items/:id', () => {
    it('updates an item and responds with JSON', async () => {
        const testData = {
            "name":"Fjallraven - A new Pepsi Max Flavor",
            "price":109.95,
            "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category":"Food & Drink",
            "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        }
        // you will need to know an id from your seed data
        const res = await request(app)
            .put(`/api/items/1`)
            .send(testData)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(res.body).toEqual(expect.objectContaining(testData))
    });
});

describe('DELETE /api/items/:id', () => {
    it('deletes an item and responds with JSON', async () => {
        // you will need to know an id from your seed data
        const res = await request(app)
            .delete(`/api/items/2`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(res.body.message).toBe("Item deleted successfully");
    });
});