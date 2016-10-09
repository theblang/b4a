import {LovefieldModel} from '../../shared/lovefield.model';

export class Account implements LovefieldModel {
    public static TABLE_NAME = 'accounts';

    public static parseRows(rows: Object[]): Account[] {
        let accounts: Account[] = [];
        for (let row of rows) {
            accounts.push(new Account(
                row['name'],
                row['id']
            ));
        }
        return accounts;
    }

    constructor(public name: string,
                public id?: number) {
    }

    toRow(): Object {
        return Object.assign({}, this);
    }
}
