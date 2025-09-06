const express = require("express");
const multer = require("multer");
const router = express.Router();
const Product = require("../models/productsModels");


router.get("/", async (req, res) => {
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

    res.json({
    status: "success",
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
    nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null,
    });
} catch (error) {
    res.status(500).json({ status: "error", error: error.message });
}
});

module.exports = router;
