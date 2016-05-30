import { Category } from './category.model';

export class Budget {
    constructor(
        public name: string,
        public categories: Category[] = [],
        public $key?: string) { }

    toJSON() {
        let json = {};
        for(var property in this) {
            json[property] = this[property];
        }
        delete json['$key'];
        return json;
    }
}
