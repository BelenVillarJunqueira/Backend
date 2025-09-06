const fs = require("fs").promises;

const { v4: uuidv4 } = require("uuid");


class ProductManager {
    constructor(path) {
        this.path = path; 
    }

async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error al leer productos:", error);
            return [];
        }
    }

    async addProduct(product) {

        if (!product.title || !product.price || !product.stock) {
            throw new Error("Faltan campos obligatorios: title, price, stock");
        }
        if (typeof product.price !== "number" || product.price <= 0) {
            throw new Error("El precio debe ser un número mayor que 0");
        }
        if (!Number.isInteger(product.stock) || product.stock < 0) {
            throw new Error("El stock debe ser un número entero positivo");
        }

        const products = await this.getProducts();
        product.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return product;
    }
}

module.exports = ProductManager;