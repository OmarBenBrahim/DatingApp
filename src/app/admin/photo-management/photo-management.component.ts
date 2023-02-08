import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {

  constructor(private adminService : AdminService) { }
  photos : Photo[] = [];

  ngOnInit(): void {
    this.getPhotosToApprove();
  }

  getPhotosToApprove(){
    this.adminService.getPhotosForApproval().pipe(take(1)).subscribe({
      next : photos => {
        this.photos = photos;
        console.log(this.photos);
      }
    })
  }

  approvePhoto(photoId : Number){
    this.adminService.approvePhoto(photoId).subscribe({
      next : () => {
        this.photos.find(x => x.id === photoId)!.isApproved = true;
        var index = this.photos.findIndex((obj) => obj.id === photoId);
        this.photos.splice(index, 1);
      }
    })
  }

  rejectPhoto(photoId : Number){
    this.adminService.rejectPhoto(photoId).subscribe({
      next : () => {
        var index = this.photos.findIndex((obj) => obj.id === photoId);
        this.photos.splice(index, 1);
      }
    })
  }

}
