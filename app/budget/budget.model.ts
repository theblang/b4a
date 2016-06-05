import { Category } from './category.model';

export class Budget {
    
    constructor(
        public name: string,
        public categories: Category[] = [],
        public $key?: string
    ) { }

    toJSON() {
        const copy = Object.assign({}, this);
        delete copy['$key'];
        return copy;
    }
}
