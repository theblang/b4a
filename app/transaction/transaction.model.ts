import { Category } from '../budget/category.model';

export class Transaction {

    constructor(
        public amount: number,
        public payee: string,
        public date: Date,
        public memo: string = null,
        public category: Category = null
    ) { }
}
