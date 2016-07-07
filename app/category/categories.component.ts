import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../common/database.service';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Component({
    selector: 'categories',
    templateUrl: 'app/category/categories.component.html'
})
export class CategoriesComponent implements OnInit, OnDestroy {
    public categories: Category[];

    constructor(
        private databaseService: DatabaseService,
        private categoryService: CategoryService) { }

    ngOnInit() {
        this.databaseService
            .connect()
            .then((database) => {
                this.categoryService.init(database);
                this.categoryService.observe((changes: Object[]) => {
                    this.categories = Category.parseJsonArray(changes.pop()['object']);
                }).then((jsonArray) => {
                    this.categories = Category.parseJsonArray(jsonArray);
                });
            })
    }

    ngOnDestroy() {
        this.databaseService
            .connect()
            .then((database) => {
                this.categoryService.unobserve();
            })
    }

    addCategory(name: string) {
        this.categoryService.add(new Category(name));
    }

    removeCategory(category: Category) {
        this.categoryService.remove(category);
    }
}