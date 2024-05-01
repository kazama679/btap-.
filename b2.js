"use strict";
class Product2 {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class CartProduct extends Product2 {
    constructor(id, name, price, quantity) {
        super(id, name, price);
        this.quantity = quantity;
    }
    calculatePrice() {
        return this.price * this.quantity;
    }
    increaseQuantity(amount) {
        this.quantity += amount;
    }
    decreaseQuantity(amount) {
        this.quantity -= amount;
    }
}
class ShopProduct extends Product2 {
    constructor(id, name, price, stock) {
        super(id, name, price);
        this.stock = stock;
    }
}
let allProduct = [
    new ShopProduct(1, "Máy tính", 10000000, 5),
    new ShopProduct(2, "Chuột", 100000, 55),
    new ShopProduct(3, "Bàn phím", 200000, 50),
    new ShopProduct(4, "Tai nghe", 150000, 20),
];
class Cart {
    constructor() {
        this.items = [];
    }
    addItem(product, quantity) {
        if (product.stock >= quantity) {
            let existingItem = this.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.increaseQuantity(quantity);
            }
            else {
                this.items.push(new CartProduct(product.id, product.name, product.price, quantity));
            }
            product.stock -= quantity;
        }
        else {
            console.log(`Không đủ hàng cho ${product.name}`);
        }
    }
    removeItem(productId, quantity) {
        let index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            const item = this.items[index];
            if (item.quantity <= quantity) {
                this.items.splice(index, 1);
            }
            else {
                item.decreaseQuantity(quantity);
            }
        }
        else {
            console.log(`Sản phẩm có ID ${productId} không tìm thấy trong giỏ hàng.`);
        }
    }
    getTotal() {
        return this.items.reduce((total, item) => total + item.calculatePrice(), 0);
    }
}
let cart = new Cart();
cart.addItem(allProduct[0], 1);
cart.addItem(allProduct[1], 1);
console.log(cart.getTotal());
