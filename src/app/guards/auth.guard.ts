import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountServive : AccountService,private toastr: ToastrService){}


  canActivate() :Observable<boolean> {
    return this.accountServive.currentUser$.pipe(
      map(user =>{
        if(user) return true;
        else{
          this.toastr.error('You shall not pass!');
          return false;
        }

      }) 
    )
  }
  
}
