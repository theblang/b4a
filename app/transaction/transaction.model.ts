import { Category } from '../category/category.model';

export class Transaction {
    public static TABLE_NAME = 'transactions';

    constructor(
        public amount: number,
        public categoryId: number = null,
        public id: number = null) { }

    toJson() {
        const copy = Object.assign({}, this);
        // delete copy['id'];
        return copy;
    }

    public static parseJsonArray(jsonArray): Transaction[] {
        let transactions: Transaction[] = [];
        for (let json of jsonArray) {
            transactions.push(Transaction.parseJson(json));
        }
        return transactions;
    }

    public static parseJson(json): Transaction {
        return new Transaction(
            json['amount'],
            json['categoryId'],
            json['id']
        )
    }
}
