const express = require('express');
const router = express.Router();


let products = [
{ id: 1, name: 'Producto A', price: 100 },
{ id: 2, name: 'Producto B', price: 200 }
];

router.get('/', (req, res) => {
res.json(products);
});


router.get('/:pid', (req, res) => {
const product = products.find(p => p.id === parseInt(req.params.pid));
product ? res.json(product) : res.status(404).send('Producto no encontrado');
});


router.post('/', (req, res) => {
const newProduct = {
    id: products.length + 1,
    ...req.body
};
products.push(newProduct);
res.status(201).json(newProduct);
});

module.exports = router;