const socketIo = require('socket.io');
const ProductManager = require('./managers/ProductManager');
const CartManager = require('./managers/CartManager');

const productManager = new ProductManager('./src/models/products.json');
const cartManager = new CartManager('./src/models/cart.json');

function initSockets(server) {
    const io = socketIo(server);

    io.on('connection', async (socket) => {
        console.log('Cliente conectado');


        const products = await productManager.getProducts();
        socket.emit('updateProducts', products);


        socket.on('addProduct', async ({ cid, pid }) => {
            await cartManager.addProductToCart(cid, pid);
            const updatedProducts = await productManager.getProducts();
            io.emit('updateProducts', updatedProducts);
        });
    });
}

module.exports = initSockets;
