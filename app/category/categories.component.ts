import { Component, Input, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Component({
    selector: 'categories',
    templateUrl: 'app/category/categories.component.html'
})
export class CategoriesComponent implements OnInit {
    public categories: Category[];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoryService.getCategories();
    }

    addCategory(name: string) {
        this.categoryService.addCategory(new Category(name));
    }

    removeCategory($key: string) {
        this.categoryService.removeCategory($key);
    }
}