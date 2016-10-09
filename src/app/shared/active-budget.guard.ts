import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from './local-storage.service';
import {Observable} from 'rxjs';

@Injectable()
export class ActiveBudgetGuard implements CanActivate {

    constructor(private router: Router, private localStorageService: LocalStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (!this.localStorageService.getActiveBudget()) {
            this.router.navigate(['/b4a-root-budget-select']);
            return false;
        }

        return true;
    }
}
