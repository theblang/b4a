import {LovefieldModel} from '../../shared/lovefield.model';

export class Category implements LovefieldModel {
    public static TABLE_NAME = 'categories';

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

    constructor(public name: string,
                public id?: number) {
    }

    toRow(): Object {
        return Object.assign({}, this);
    }
}
