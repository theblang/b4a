export class Account {
    public name: string;
    public id: string;
    
    constructor(name: string, id: string=null) {
        this.name = name;
        this.id = id;
    }
}