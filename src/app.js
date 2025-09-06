const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products.router");
const cartRoutes = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");

const app = express();


app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewsRouter);


app.get("/", (req, res) => {
res.send("API funcionando. En /products esta el carrito. Probá en /api/products");
});


const PORT = 3000;

connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`🚀 Server escuchando en http://localhost:${PORT}`);
});
});
