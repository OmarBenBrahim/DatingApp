import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsaveedChangsGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent): boolean {
    if(component.editForm?.dirty){
      return confirm('Are you sure you wat continue?');
    }
    return true;
  }
}
