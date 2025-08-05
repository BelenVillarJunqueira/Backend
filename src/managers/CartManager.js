const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

class CartManager {
constructor(path) {
    this.path = path;
}

async getCarts() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
}

async createCart() {
    const carts = await this.getCarts();
    const newCart = { id: uuidv4(), products: [] };
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
}

async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id);
}

async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cid);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product === pid);
    if (existingProduct) {
    existingProduct.quantity += 1;
    } else {
    cart.products.push({ product: pid, quantity: 1 });
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
}
}

module.exports = CartManager;