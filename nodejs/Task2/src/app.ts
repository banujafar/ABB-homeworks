import { v4 as uuidv4 } from "uuid";

export enum CurrencyEnum {
  USD,
  UAH,
}

export class Transaction {
  ID: string;
  Amount: number;
  Currency: CurrencyEnum;

  constructor(Amount: number, Currency: CurrencyEnum) {
    this.ID = uuidv4();
    this.Amount = Amount;
    this.Currency = Currency;
  }
}

export class Card {
  transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }

  AddTransaction(Transaction: Transaction) {
    this.transactions.push(Transaction);
    return Transaction.ID;
  }

  AddTransactionOverLoad(Currency: CurrencyEnum, Amount: number) {
    const transaction = new Transaction(Amount, Currency);
    this.transactions.push(transaction);
    return transaction.ID;
  }

  GetTransaction(ID: string) {
    const transaction = this.transactions.find(
      (transaction) => transaction.ID === ID
    );
    return transaction;
  }

  GetBalance(Currency: CurrencyEnum) {
    let totalAmount = 0;
    this.transactions.map((transation) => {
      if (transation.Currency === Currency) {
        totalAmount += transation.Amount;
      }
    });
    return totalAmount;
  }
}
