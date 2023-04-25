"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
var CreateProductDto = /** @class */ (function () {
    function CreateProductDto(name, description, stock, rate, price, category) {
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.rate = rate;
        this.price = price;
        this.category = category;
    }
    ;
    return CreateProductDto;
}());
exports.CreateProductDto = CreateProductDto;
