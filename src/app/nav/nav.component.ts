import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any = {};
  user: User | null = null;

  constructor(public accountService :AccountService, private router: Router, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe().subscribe({
      next : user => {
        this.user = user;
      }
    })
   }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next : () => this.router.navigateByUrl('/members')
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
