const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");
const CartManager = require("../managers/CartManager");

const router = Router();

const productManager = new ProductManager("src/models/products.json");
const cartManager = new CartManager("src/models/cart.json");



router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const cart = await cartManager.getCartById('cart001'); 
    res.render('home', { products, cart });
});



router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
});


router.get("/realtimecarts", async (req, res) => {
    const carts = await cartManager.getCarts();
    res.render("realTimeCarts", { carts });
});

module.exports = router;
