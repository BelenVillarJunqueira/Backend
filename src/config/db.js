const mongoose = require("mongoose");

const connectDB = async () => {
try {
    await mongoose.connect(
    "mongodb+srv://BelenVillar:codercoder@belenvillar.ttbwsou.mongodb.net/dbEmpresaPrueba?retryWrites=true&w=majority"
    );
    console.log("✅ MongoDB conectado correctamente:", mongoose.connection.name);
} catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
}
};

module.exports = connectDB;
