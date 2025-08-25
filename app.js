const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const exphbs = require("express-handlebars");
const path = require("path");

const productsRouter = require("./src/Routes/products.router");
const cartsRouter = require("./src/Routes/carts.router");
const viewsRouter = require("./src/Routes/views.router");
const ProductManager = require("./src/managers/ProductManager");
const CartManager = require("./src/managers/CartManager")

const app = express();
const server = createServer(app);
const io = new Server(server);

const manager = new ProductManager("src/models/products.json");
const cartManager = new CartManager("src/models/cart.json");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


io.on("connection", async (socket) => {
    console.log("🟢 Cliente conectado");


    const carts = await cartManager.getCarts();
    socket.emit("updateCarts", carts);


    socket.on("createCart", async () => {
        await cartManager.createCart();
        io.emit("updateCarts", await cartManager.getCarts());
    });


    socket.on("addProductToCart", async ({ cid, pid }) => {
        await cartManager.addProductToCart(cid, pid);
        io.emit("updateCarts", await cartManager.getCarts());
    });


    socket.on("removeProductFromCart", async ({ cid, pid }) => {
        await cartManager.removeProductFromCart(cid, pid);
        io.emit("updateCarts", await cartManager.getCarts());
    });
});



const PORT = 3000;
server.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
