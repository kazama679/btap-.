class Product2{
    id:number
    name:string
    price:number
    constructor(id:number,name:string,price:number){
        this.id=id
        this.name=name
        this.price=price
    }
}

class CartProduct extends Product2{
    quantity:number;
    constructor(id:number,name:string,price:number,quantity:number){
        super(id,name,price)
        this.quantity=quantity
    }
    calculatePrice(): number{ //Phương thức calculatePrice có tác dụng tính và trả tổng tiền của sản phẩm
        return this.price * this.quantity;
    } 
    increaseQuantity(amount: number):void{ //tăng số lượng sản phẩm trong giỏ hàng.
        this.quantity += amount;
    }
    decreaseQuantity(amount: number):void{ //giảm số lượng sản phẩm trong giỏ hàng.
        this.quantity -= amount;
    } 
}

class ShopProduct extends Product2{
    stock:number 
    constructor(id:number,name:string,price:number,stock:number){
        super(id,name,price)
        this.stock=stock
    }
}
let allProduct = [
    new ShopProduct(1, "Máy tính", 10000000, 5),
    new ShopProduct(2, "Chuột", 100000, 55),
    new ShopProduct(3, "Bàn phím", 200000, 50),
    new ShopProduct(4, "Tai nghe", 150000, 20),
]
class Cart{
    items: CartProduct[];
        constructor() {
            this.items = [];
        }
    addItem(product: ShopProduct, quantity: number):void{ //Lớp cart có các phương thức addItem để thêm sản phẩm vào giỏ hàng
        if (product.stock >= quantity) {
            let existingItem = this.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.increaseQuantity(quantity);
            } else {
                this.items.push(new CartProduct(product.id, product.name, product.price, quantity));
            }
            product.stock -= quantity;
        } else {
            console.log(`Không đủ hàng cho ${product.name}`);
        }
    }
    removeItem(productId: number, quantity: number): void{ //phương thức removeItem để xóa sản phẩm khỏi giỏ hàng
        let index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            const item = this.items[index];
            if (item.quantity <= quantity) {
                this.items.splice(index, 1);
            } else {
                item.decreaseQuantity(quantity);
            }
        } else {
            console.log(`Sản phẩm có ID ${productId} không tìm thấy trong giỏ hàng.`);
        }
    }
    getTotal(): number{ // để tính tổng giá trị giỏ hàng
        return this.items.reduce((total, item) => total + item.calculatePrice(), 0);
    }
}

let cart = new Cart();
cart.addItem(allProduct[0], 1); 
cart.addItem(allProduct[1], 1); 
console.log(cart.getTotal()); 