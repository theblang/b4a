import {LovefieldModel} from "../common/lovefield.model";
import {Category} from "../category/category.model";
import {Account} from "../account/account.model";

export class Transaction implements LovefieldModel {
    public static TABLE_NAME = 'transactions';

    constructor(public amount: number,
                public category?,
                public account?,
                public id?) {
    }

    toRow(): Object {
        const row = Object.assign({}, this);
        row['categoryId'] = row.category.id;
        row['accountId'] = row.account.id;
        delete row.category;
        return row;
    }

    public static parseRows(rows: Object[]): Transaction[] {
        const transactions: Transaction[] = [];

        for (const row of rows) {
            transactions.push(new Transaction(
                row[this.TABLE_NAME]['amount'],
                row[Category.TABLE_NAME],
                row[Account.TABLE_NAME],
                row[this.TABLE_NAME]['id']
            ));
        }
        return transactions;
    }
}
