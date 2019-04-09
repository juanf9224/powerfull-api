"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaintingSchema = new mongoose_1.Schema({
    name: String,
    url: String,
    technique: String
});
exports.default = mongoose_1.model('Painting', PaintingSchema);
