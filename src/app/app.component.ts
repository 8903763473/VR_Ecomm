import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor() {}
  successPopup:boolean=false
  failedpopup:boolean=false
  warningpopup:boolean=false
  scrolled: boolean = false;
  ngOnInit(): void {
  }
  

  @HostListener("window:scroll", [])
  onWindowScroll() {
      this.scrolled = window.scrollY > 0;
  }  }

