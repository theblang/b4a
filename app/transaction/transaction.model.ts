import { Category } from '../category/category.model';

export class Transaction {
    public static DB_NAME = '/transactions';

    constructor(
        public amount: number,
        public payee: string,
        public date: Date,
        public memo: string = null,
        public category: string = null,
        public account: string = null,
        public $key: string = null) { }

    toJSON() {
        const copy = Object.assign({}, this);
        delete copy['$key'];
        return copy;
    }

    public static parseJsonArray(transactionsJson): Transaction[] {
        let transactions: Transaction[] = [];
        for(let transactionJson of transactionsJson) {
            transactions.push(Transaction.parseJson(transactionJson));
        }
        return transactions;
    }

    public static parseJson(transactionJson): Transaction {
        return new Transaction(
            transactionJson['amount'],
            transactionJson['payee'],
            transactionJson['date'],
            transactionJson['memo'],
            transactionJson['category'],
            transactionJson['account'],
            transactionJson['$key']
        )
    }
}
