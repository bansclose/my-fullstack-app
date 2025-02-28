require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Thoát nếu kết nối thất bại
    }
};

// API đơn giản
app.get("/", (req, res) => {
    res.send("Hello from Backend!");
});

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Đóng kết nối MongoDB khi server bị dừng
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed");
    process.exit(0);
});

// Chỉ chạy server khi file này được gọi trực tiếp (tránh lỗi khi import vào Jest)
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    connectDB().then(() => {
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    });
}

module.exports = app; // Export app để Jest có thể import
