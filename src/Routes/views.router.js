const express = require("express");
const Product = require("../models/productsModels");

const router = express.Router();

router.get("/products", async (req, res) => {
try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query ? { category: query } : {};

    const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    lean: true,
    };

    const result = await Product.paginate(filter, options);

    res.render("home", {
    products: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage
        ? `/products?page=${result.prevPage}`
        : null,
    nextLink: result.hasNextPage
        ? `/products?page=${result.nextPage}`
        : null,
    });
} catch (error) {
    res.status(500).send("Error al cargar productos");
}
});

module.exports = router;