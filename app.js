const express = require('express');
const productsRouter = require('./src/Routes/products.router');
const cartsRouter = require('./src/Routes/carts.router');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
res.send('Bienvenido a la API. El viejo Manzano');
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const PORT = 3000;
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
