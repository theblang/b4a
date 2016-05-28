export class Category {
    public name: string;
    public description: string;
    public targetAmount: number;
    
    constructor(name: string, description: string=null, targetAmount: number=0.0) {
        this.name = name;
        this.description = description;
        this.targetAmount = targetAmount;
    }
}