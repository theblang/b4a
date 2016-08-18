import {Component, OnInit, OnDestroy} from "@angular/core";
import {DatabaseService} from "../common/database.service";
import {CategoryService} from "./category.service";
import {Category} from "./category.model";

@Component({
    selector: 'categories',
    templateUrl: 'app/category/categories.component.html'
})
export class CategoriesComponent implements OnInit, OnDestroy {
    public categories: Category[];

    constructor(private databaseService: DatabaseService,
                private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.databaseService.connect()
            .flatMap((database) => {
                this.categoryService.init(database);

                const handler = (changes: Object[]) => {
                    this.categories = Category.parseRows(changes.pop()['object']);
                };

                return this.categoryService.observe(handler);
            })
            .subscribe((categoriesJson) => {
                this.categories = Category.parseRows((categoriesJson));
            });
    }

    ngOnDestroy() {
        this.categoryService.unobserve();
    }

    addCategory(name: string) {
        this.categoryService.add(new Category(name));
    }

    removeCategory(category: Category) {
        this.categoryService.remove(category);
    }
}
