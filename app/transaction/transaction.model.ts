import { Category } from '../category/category.model';

export class Transaction {
    public static TABLE_NAME = 'transactions';

    constructor(
        public amount: number,
        public category?,
        public id?) { }

    toJson() {
        const json = Object.assign({}, this);
        return json;
    }

    toRow() {
        const row = Object.assign({}, this);
        row['categoryId'] = row.category.id;
        delete row.category;
        return row;
    }

    public static parseRows(rows: Object[]): Transaction[] {
        let transactions: Transaction[] = [];
        for (let row of rows) {
            transactions.push(new Transaction(
                row[this.TABLE_NAME]['amount'],
                row[Category.TABLE_NAME],
                row[this.TABLE_NAME]['id']
            ));
        }
        return transactions;
    }
}
