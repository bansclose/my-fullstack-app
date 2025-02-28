const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("GET /", () => {
    let server;
    let serverPort;

    beforeAll(async () => {
        server = app.listen(0, () => {
            serverPort = server.address().port; // Lấy cổng thật sự
        });

        // Tăng timeout lên 20s để MongoDB có thời gian kết nối
        jest.setTimeout(20000);

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Đóng kết nối MongoDB
        await server.close(); // Đóng server
    });

    it("should return 200 OK", async () => {
        const res = await request(`http://localhost:${serverPort}`).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe("Hello from Backend!");
    });
});

