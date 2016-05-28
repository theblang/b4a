import { Category } from './category';

export class Budget {
    public name: string;
    public categories: Category[];
    
    constructor(name: string, categories: Category[]=[]) {
        this.name = name;
        this.categories = categories;
    }
}
