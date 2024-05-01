class Transaction {
    id: number;
    type: string;
    amount: number;
    newBalance: number;

    constructor(id: number, type: string, amount: number, newBalance: number) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.newBalance = newBalance;
    }
}

class Account {
    accountNumber: string;
    balance: number;
    history: Transaction[];

    constructor(accountNumber: string, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.history = [];
    }

    deposit(amount: number): void {
        this.balance += amount;
        const transaction = new Transaction(this.history.length + 1, "Nạp tiền", amount, this.balance);
        this.history.push(transaction);
    }

    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log("Không đủ số dư");
            return;
        }
        this.balance -= amount;
        const transaction = new Transaction(this.history.length + 1, "Rút tiền", amount, this.balance);
        this.history.push(transaction);
    }

    transfer(amount: number, destinationAccount: Account): void {
        if (amount > this.balance) {
            console.log("Không đủ tiền trong tài khoản");
            return;
        }
        this.balance -= amount;
        destinationAccount.balance += amount;

        const transaction1 = new Transaction(this.history.length + 1, "Chuyển đi", amount, this.balance);
        const transaction2 = new Transaction(destinationAccount.history.length + 1, "Chuyển vào", amount, destinationAccount.balance);

        this.history.push(transaction1);
        destinationAccount.history.push(transaction2);
    }

    showHistory(): void {
        console.log(`Lịch sử giao dịch cho tài khoản ${this.accountNumber}:`);
        this.history.forEach(transaction => {
            console.log(`ID: ${transaction.id}, Loại: ${transaction.type}, Số tiền: ${transaction.amount}, Số dư mới: ${transaction.newBalance}`);
        });
    }
}

const accounts: Account[] = [];

const account1 = new Account("333", 1000);
const account2 = new Account("2332", 2000);

accounts.push(account1, account2);

account1.deposit(700);
account1.withdraw(200);
account1.transfer(100, account2);
account1.showHistory();
account2.showHistory();
