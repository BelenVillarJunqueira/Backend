const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");


router.post("/", async (req, res) => {
try {
    const cart = new Cart({ products: [] });
    await cart.save();
    res.json(cart);
} catch (error) {
    res.status(500).json({ error: "Error al crear carrito" });
}
});


router.get("/:cid", async (req, res) => {
try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate("products.product");

    if (req.headers.accept?.includes("application/json")) {
    return res.json(cart);
    }

    res.render("cart", { 
    cart: cart.products.map(p => ({
        _id: p.product._id,
        title: p.product.title,
        description: p.product.description,
        price: p.product.price,
        quantity: p.quantity,
         subtotal: p.product.price * p.quantity
    }))
    });

    total: cart.products.reduce((acc, p) => acc + p.product.price * p.quantity, 0)

    
} catch (error) {
    res.status(500).send("Error al obtener el carrito");
}
});


router.post("/:cid/product/:pid", async (req, res) => { 
    try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const existingProduct = cart.products.find(p => p.product.toString() === req.params.pid);

    if (existingProduct) {
    existingProduct.quantity += 1;
    } else {
    cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
} catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito" });
}
});

router.delete("/:cid/products/:pid", async (req, res) => {
try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();

    res.json({ message: "Producto eliminado del carrito", cart });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


router.put("/:cid", async (req, res) => {
try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await Cart.findByIdAndUpdate(
    cid,
    { products },
    { new: true }
    ).populate("products.product");

    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    res.json(cart);
} catch (error) {
    res.status(500).json({ error: "Error al actualizar el carrito" });
}
});


router.put("/:cid/products/:pid", async (req, res) => {
try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const product = cart.products.find(p => p.product.toString() === pid);
    if (!product) return res.status(404).json({ error: "Producto no encontrado en el carrito" });

    product.quantity = quantity;
    await cart.save();

    res.json(cart);
} catch (error) {
    res.status(500).json({ error: "Error al actualizar cantidad del producto" });
}
});


router.delete("/:cid", async (req, res) => {
try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);

    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = [];
    await cart.save();

    res.json({ message: "Carrito vacio", cart });
} catch (error) {
    res.status(500).json({ error: "Error al vaciar carrito" });
}
});




module.exports = router;
