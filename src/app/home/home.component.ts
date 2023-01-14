import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  regesterMode = false;

  constructor() { }

  ngOnInit(): void {
   
  }

  regesterToggle(){
    this.regesterMode = !this.regesterMode;
  }

}
