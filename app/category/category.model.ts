export class Category {
    public static DB_NAME = '/categories';

    constructor(
        public name: string,
        public allocated: number = 0.0,
        public description: string = null,
        public $key?: string) { }

    toJSON() {
        const copy = Object.assign({}, this);
        delete copy['$key'];
        return copy;
    }

    public static parseJsonArray(categoriesJson): Category[] {
        let categories:Category[] = [];
        for(let categoryJson of categoriesJson) {
            categories.push(Category.parseJson(categoryJson));
        }
        return categories;
    }

    public static parseJson(categoryJson): Category {
        return new Category(categoryJson['name'], categoryJson['allocated'], categoryJson['description'], categoryJson['$key']);
    }
}