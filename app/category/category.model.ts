import {LovefieldModel} from "../common/lovefield.model";

export class Category implements LovefieldModel {
    public static TABLE_NAME = 'categories';

    constructor(public name: string,
                public id?: number) {
    }

    toRow(): Object {
        const row = Object.assign({}, this);
        return row;
    }

    public static parseRows(rows): Category[] {
        let categories: Category[] = [];
        for (let row of rows) {
            categories.push(new Category(
                row['name'],
                row['id']
            ));
        }
        return categories;
    }
}
