const express = require('express');
const router = express.Router();
const path = require('path');
const CartManager = require('../managers/CartManager');



router.get('/', async (req, res) => {
const carts = await cartManager.getCarts();
res.json(carts);
});

router.get('/:cid', async (req, res) => {
const cart = await cartManager.getCartById(req.params.cid);
cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});

router.post('/', async (req, res) => {
const newCart = await cartManager.createCart();
res.status(201).json(newCart);
});

router.post('/:cid/product/:pid', async (req, res) => {
const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
if (!updatedCart) return res.status(404).send('Carrito no encontrado');
res.json(updatedCart);
});

module.exports = router;
