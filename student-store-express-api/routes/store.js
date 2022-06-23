const express = require('express');
const router = express.Router();
const Store = require("../model/store")

router.get("/", async (req, res, next) => {
    try {
        const products = await Store.fetchProducts();
        res.status(200).json({ products });
    }
    catch (err) {
        next(err);
    }
});

router.get("/:productId", async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Store.fetchProductById(productId);
        res.status(200).json({ product: product })
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;