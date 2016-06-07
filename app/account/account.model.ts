export class Account {
    
    constructor(public name: string, public $key?: string) {}
    
    toJSON() {
        const copy = Object.assign({}, this);
        delete copy['$key'];
        return copy;
    }

    public static parseJsonArray(accountsJson): Account[] {
        let accounts: Account[] = [];
        for(let accountJson of accountsJson) {
            accounts.push(new Account(accountJson['name'], accountJson['$key']));
        }
        return accounts;
    }
}