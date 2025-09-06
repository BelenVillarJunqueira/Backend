const socketIo = require('socket.io');
const ProductManager = require('../../managers/ProductManager');
const CartManager = require('../../managers/CartManager');

const productManager = new ProductManager('./src/data/productos.js');
const cartManager = new CartManager('./src/data/cart.js');

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
