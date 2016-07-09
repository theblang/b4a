export class Category {
    public static TABLE_NAME = 'categories';

    constructor(
        public name: string,
        public id?: number) { }

    toJson() {
        const copy = Object.assign({}, this);
        return copy;
    }

    // get spent(): number {
    //     var amount = 0;
    //     for (var key in this.transactions) {
    //         if (this.transactions.hasOwnProperty(key)) {
    //             amount += this.transactions[key];
    //         }
    //     }

    //     return amount;
    // }

    public static parseJsonArray(jsonArray): Category[] {
        let categories: Category[] = [];
        for (let json of jsonArray) {
            categories.push(Category.parseJson(json));
        }
        return categories;
    }

    public static parseJson(json): Category {
        return new Category(
            json['name'],
            json['id']
        )
    }
}