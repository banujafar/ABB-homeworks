import { Card, CurrencyEnum } from "./app";
const transactionToAdd = [{
        ID: "12345",
        Amount: 100,
        Currency: CurrencyEnum.USD,
    }];
const test = new Card(transactionToAdd);
//test.AddTransaction(transactionToAdd)
console.log(test);
