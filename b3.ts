/*
Định nghĩa lớp MenuItem có các thuộc tính id, name và price;

lớp Table có các thuộc tính id, capacity và available;

lớp Reservation có các thuộc tính id, customerName, tableId;

Định nghĩa lớp Order có các thuộc tính id, tableId và items, thuộc tính items là mảng các menuItem. 
Lớp có phương thức getTotal để tính tổng tiền.

Định nghĩa lớp Restaurant có thuộc tính menu là mảng các menuItem, thuộc tính tables là mảng các table, 
thuộc tính reservations là mảng các reservation và orders là mảng các order. 
Lớp có các phương thức addMenuItem, addTable, makeReservation, placeOrder và generateBill.

Phương thức addMenuItem dùng để thêm item vào menu, phương thức addTable dùng để thêm bàn vào cửa hàng.

Phương thức makeReservation dùng để đặt bàn trước, 
sau khi đặt bàn thì thuộc tính available của bàn được đặt sẽ đổi thành false và lưu thông tin vào mảng reservation.
Nếu bàn đã được đặt trước thì in thông báo.

Phương thức placeOrder dùng để đặt món trong nhà hàng, sau khi đặt món thì lưu order vào mảng orders của nhà hàng.

Phương thức generateBill sẽ tìm đến order của bàn và in ra tổng tiền cần phải trả cho bàn đó. 
Sau khi thanh toán xong thì đặt lại trạng thái cho bàn đã thanh toán là available.
*/

class MenuItem {
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Table {
    id: number;
    capacity: number;
    available: boolean;

    constructor(id: number, capacity: number) {
        this.id = id;
        this.capacity = capacity;
        this.available = true;
    }
}

class Reservation {
    id: number;
    customerName: string;
    tableId: number;

    constructor(id: number, customerName: string, tableId: number) {
        this.id = id;
        this.customerName = customerName;
        this.tableId = tableId;
    }
}

class Order {
    id: number;
    tableId: number;
    items: MenuItem[];

    constructor(id: number, tableId: number, items: MenuItem[]) {
        this.id = id;
        this.tableId = tableId;
        this.items = items;
    }

    getTotal(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}

class Restaurant {
    menu: MenuItem[];
    tables: Table[];
    reservations: Reservation[];
    orders: Order[];

    constructor() {
        this.menu = [];
        this.tables = [];
        this.reservations = [];
        this.orders = [];
    }

    addMenuItem(item: MenuItem): void {
        this.menu.push(item);
    }

    addTable(table: Table): void {
        this.tables.push(table);
    }

    makeReservation(reservation: Reservation): void {
        const table = this.tables.find(t => t.id === reservation.tableId);
        if (table) {
            if (table.available) {
                table.available = false;
                this.reservations.push(reservation);
            } else {
                console.log(`Bàn ${table.id} đã được đặt trước.`);
            }
        } else {
            console.log(`bàn ${reservation.tableId} k có.`);
        }
    }

    placeOrder(order: Order): void {
        this.orders.push(order);
    }

    generateBill(tableId: number): void {
        const order = this.orders.find(o => o.tableId === tableId);
        if (order) {
            const total = order.getTotal();
            console.log(`Tổng hóa đơn cho bàn ${tableId}: ${total}`);
            const table = this.tables.find(t => t.id === tableId);
            if (table) {
                table.available = true; 
            }
        } else {
            console.log(`Không tìm thấy đơn hàng nào cho bàn ${tableId}.`);
        }
    }
}
const restaurant = new Restaurant();
restaurant.addMenuItem(new MenuItem(1, "Bán mình dân tổ", 10));
restaurant.addMenuItem(new MenuItem(2, "Bún chả", 12));
restaurant.addMenuItem(new MenuItem(3, "Cơm rang", 8));
restaurant.addTable(new Table(1, 4));
restaurant.addTable(new Table(2, 6));
restaurant.makeReservation(new Reservation(1, "Quang", 1));
restaurant.placeOrder(new Order(1, 1, [restaurant.menu[0], restaurant.menu[1]]));
restaurant.generateBill(1);