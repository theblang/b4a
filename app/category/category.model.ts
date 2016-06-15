export class Category {
    public static DB_NAME = '/categories';

    constructor(
        public name: string,
        public allocated: number = 0.0,
        public description: string = null,
        public transactions: Object = null,
        public $key?: string) { }

    toJSON() {
        const copy = Object.assign({}, this);
        delete copy['$key'];
        return copy;
    }

    get spent(): number {
        var amount = 0;
        for (var key in this.transactions) {
            if(this.transactions.hasOwnProperty(key)) {
                amount += this.transactions[key];
            }
        }

        return amount;
    }

    public static parseJsonArray(categoriesJson): Category[] {
        let categories: Category[] = [];
        for (let categoryJson of categoriesJson) {
            categories.push(Category.parseJson(categoryJson));
        }
        return categories;
    }

    public static parseJson(categoryJson): Category {
        return new Category(
            categoryJson['name'],
            categoryJson['allocated'],
            categoryJson['description'],
            categoryJson['transactions'],
            categoryJson['$key']);
    }
}