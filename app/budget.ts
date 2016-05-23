import { Category } from './category';

export class Budget {
    public name: string;
    public categories: Category[];
    
    constructor(name: string) {
        this.name = name;
    }
}
