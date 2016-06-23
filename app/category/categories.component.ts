import { Component, Input, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Component({
    selector: 'categories',
    templateUrl: 'app/category/categories.component.html'
})
export class CategoriesComponent implements OnInit {
    private categoriesObservable: FirebaseListObservable<Category[]>;
    public categories: Category[];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoriesObservable = this.categoryService.getCategoriesObservable();

        this.categoriesObservable.subscribe((categoriesJson) => {
            this.categories = Category.parseJsonArray(categoriesJson);
        });
    }

    addCategory(name: string): firebase.database.ThenableReference {
        return this.categoryService.addCategory(new Category(name));
    }

    removeCategory($key: string): firebase.Promise<void> {
        return this.categoryService.removeCategory($key);
    }
}