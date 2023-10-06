import { v4 as uuidv4 } from 'uuid';
export var CurrencyEnum;
(function (CurrencyEnum) {
    CurrencyEnum[CurrencyEnum["USD"] = 0] = "USD";
    CurrencyEnum[CurrencyEnum["UAH"] = 1] = "UAH";
})(CurrencyEnum || (CurrencyEnum = {}));
export class Transaction {
    constructor(Amount, Currency) {
        this.ID = uuidv4();
        this.Amount = Amount;
        this.Currency = Currency;
    }
}
export class Card {
    constructor(transactions) {
        this.transactions = transactions;
    }
    AddTransaction(Transaction) {
        Transaction.ID = uuidv4();
        this.transactions.push(Transaction);
        console.log(this.transactions);
        return Transaction.ID;
    }
    GetTransaction(ID) {
        // const transaction = this.transactions.find((transaction) => transaction.ID === ID)
        // return transaction
        console.log(ID);
    }
    GetBalance(Currency) {
        let totalAmount = 0;
        this.transactions.map(transation => {
            if (transation.Currency === Currency) {
                totalAmount += transation.Amount;
            }
        });
        return totalAmount;
    }
}
