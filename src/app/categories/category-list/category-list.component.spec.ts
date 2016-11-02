import {CategoryListComponent} from "./category-list.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {BudgetNavComponent} from "../../budget-nav/budget-nav.component";
import {DatabaseService} from "../../shared/database.service";
import {CategoryService} from "../shared/category.service";

// FIXME: Think about where to put this as there doesn't seem to be mention in the style guide
let databaseServiceStub = {
    connect: () => {
        return true;
    }
};
let categoryServiceStub = {
    observe: () => {
        return true;
    },
    unobserve: () => {
        return true;
    },
    add: () => {
        return true;
    },
    remove: () => {
        return true;
    }
};

let component: CategoryListComponent;
let fixture: ComponentFixture<CategoryListComponent>;
let debugElement: DebugElement;

beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [CategoryListComponent, BudgetNavComponent],
        providers: [
            {provide: DatabaseService, useValue: databaseServiceStub},
            {provide: CategoryService, useValue: categoryServiceStub}
        ]
    });

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
});

it('should have an input to create new categories', () => {
    debugElement = fixture.debugElement.query(By.css('#new-category'));
    expect(debugElement.nativeElement).toBeTruthy();
});
