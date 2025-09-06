const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
title: { type: String, required: true },
price: { type: Number, required: true },
description: { type: String, default: "" },
stock: { type: Number, default: 0 },
category: { type: String, default: "" },
images: { type: [String], default: [] }
});

{ timestamps: true }

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
