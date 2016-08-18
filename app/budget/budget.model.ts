export class Budget {

    constructor(public name: string,
                public categories: Object = null,
                public $key?: string) {
    }

    toJSON() {
        const copy = Object.assign({}, this);
        delete copy['$key'];
        return copy;
    }
}
