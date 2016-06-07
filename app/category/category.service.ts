import { Injectable } from '@angular/core';
import { AngularFire, FirebaseDatabase, FirebaseListObservable } from 'angularfire2';
import { Category } from './category.model'

@Injectable()
export class CategoryService {
    private database: FirebaseDatabase;

    constructor(private angularFire: AngularFire) {
        this.database = this.angularFire.database;
    }

    getCategoriesObservable(startAt: number = 0, endAt: number = 50): FirebaseListObservable<Category[]> {
        return this.database.list(Category.DB_NAME);
    }

    addCategory(category: Category): FirebaseWithPromise<void> {
        return this.database.list(Category.DB_NAME).push(category.toJSON());
    }
    
    removeCategory($key: string): Promise<void> {
        return this.database.list(Category.DB_NAME).remove($key);
    }
}