import { Category } from '../budget/category.model';

export class Transaction {
    public static DB_NAME = '/transactions';

    constructor(
        public amount: number,
        public payee: string,
        public date: Date,
        public memo: string = null,
        public category: Category = null,
        public accountId: string = null) { }
}
