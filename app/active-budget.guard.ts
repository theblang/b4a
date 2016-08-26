import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {LocalStorageService} from "./common/local-storage.service";

@Injectable()
export class ActiveBudgetGuard implements CanActivate {

    constructor(private router: Router, private localStorageService: LocalStorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if(!this.localStorageService.getActiveBudget()) {
            this.router.navigate(['/budget-select']);
            return false;
        }

        return true;
    }
}
