import { Category } from './category.model';

export class Budget {
    constructor(
        public name: string,
        public categories: Category[] = []) { }
}
