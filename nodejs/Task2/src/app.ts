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

  AddTransaction(transaction: Transaction | CurrencyEnum, Amount?: number) {
    if (transaction instanceof Transaction && !Amount) {
      this.transactions.push(transaction);
      return transaction.ID;
    } else if (typeof transaction === "number" && Amount) {
      const newTransaction = new Transaction(Amount, transaction);
      this.transactions.push(newTransaction);
      return newTransaction.ID;
    } else {
      throw new Error(
        "Invalid transaction data. Please provide a valid Transaction and Amount."
      );
    }
  }

  GetTransaction(ID: string) {
    return this.transactions.find((transaction) => transaction.ID === ID);
  }

  GetBalance(Currency: CurrencyEnum) {
    const balance = this.transactions.reduce((prev, curr) => {
      if (Currency === curr.Currency) {
        return prev + curr.Amount;
      }
      return prev;
    }, 0);
    return balance;
  }
}
