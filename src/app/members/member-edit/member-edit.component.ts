import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    $event.returnValue = true ;
  }
  user : User | null = null ;
  member : Member | undefined ;
  constructor(private accountService : AccountService, private memberService : MembersService, private toastr : ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next : user => {
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
    if(this.user)
    this.loadMember(this.user.username)
   
  }

  loadMember(username : string){
    this.memberService.getMember(username).pipe(take(1)).subscribe({
      next : member => this.member = member
    })
  }
  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next : response => {
        this.toastr.success("member updated! ");
        this.editForm?.reset(this.member);
      }
    })
    
  }

}
