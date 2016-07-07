import { Injectable } from '@angular/core';
import { Category } from './category.model'
import { Transaction } from '../transaction/transaction.model'

@Injectable()
export class CategoryService {
    constructor() {}

    getCategories(startAt: number = 0, endAt: number = 50) {

    }

    addCategory(category: Category) {

    }
    
    removeCategory(id: string) {

    }
}