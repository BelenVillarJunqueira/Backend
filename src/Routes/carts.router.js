const express = require('express');
const router = express.Router();


let carts = [
{ id: 1, products: [] }
];


router.get('/', (req, res) => {
res.json(carts);
});


router.get('/:cid', (req, res) => {
const cart = carts.find(c => c.id === parseInt(req.params.cid));
cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});


router.post('/', (req, res) => {
const newCart = {
    id: carts.length + 1,
    products: []
};
carts.push(newCart);
res.status(201).json(newCart);
});

router.post('/:cid/product/:pid', (req, res) => {
const cart = carts.find(c => c.id === parseInt(req.params.cid));
if (!cart) return res.status(404).send('Carrito no encontrado');

const pid = parseInt(req.params.pid);
const existingProduct = cart.products.find(p => p.product === pid);

if (existingProduct) {
    existingProduct.quantity++;
} else {
    cart.products.push({ product: pid, quantity: 1 });
}

res.json(cart);
});

module.exports = router;