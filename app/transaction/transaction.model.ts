import { Category } from '../category/category.model';

export class Transaction {
    public static DB_NAME = '/transactions';

    constructor(
        public amount: number,
        public payee: string,
        public date: Date,
        public memo: string = null,
        public category: Category = null,
        public accountId: string = null) { }

    public static parseJsonArray(transactionsJson): Transaction[] {
        let transactions: Transaction[] = [];
        for(let transactionJson of transactionsJson) {
            transactions.push(Transaction.parseJson(transactionJson));
        }
        return transactions;
    }

    public static parseJson(transactionJson): Transaction {
        return new Transaction(
            transactionJson['number'],
            transactionJson['payee'],
            transactionJson['date'],
            transactionJson['memo'],
            transactionJson['category'],
            transactionJson['accoundId']
        )
    }
}
