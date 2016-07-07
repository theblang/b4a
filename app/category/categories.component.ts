import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Component({
    selector: 'categories',
    templateUrl: 'app/category/categories.component.html'
})
export class CategoriesComponent implements OnInit, OnDestroy {
    public categories: Category[];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoryService.getCategories();
    }

    ngOnDestroy() {
        
    }

    addCategory(name: string) {
        this.categoryService.addCategory(new Category(name));
    }

    removeCategory($key: string) {
        this.categoryService.removeCategory($key);
    }
}