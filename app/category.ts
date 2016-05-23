export class Category {
    public name: string;
    public description: string;
    
    constructor(name: string, description: string=null) {
        this.name = name;
        this.description = description;
    }
}