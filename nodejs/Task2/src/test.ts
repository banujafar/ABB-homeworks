import { Card, CurrencyEnum, Transaction } from "./app.ts";

const test = new Card();

const firstTransaction = new Transaction(300, CurrencyEnum.USD);
const secondTransaction = new Transaction(600, CurrencyEnum.USD);
const thirdTransaction = new Transaction(900, CurrencyEnum.USD);
const forthTransaction = new Transaction(1200, CurrencyEnum.UAH);

const firstTrID = test.AddTransaction(firstTransaction);
console.log(firstTrID);
test.AddTransaction(secondTransaction);
test.AddTransaction(thirdTransaction);
test.AddTransaction(forthTransaction);

console.log(test.GetTransaction(firstTrID))

test.AddTransaction(CurrencyEnum.UAH, 3000);
test.AddTransaction(CurrencyEnum.UAH, 6000);

console.log(test.GetBalance(CurrencyEnum.USD));
console.log(test.GetBalance(CurrencyEnum.UAH));

console.log(test);