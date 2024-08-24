import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent  implements OnInit {
  name:string | any
  email:any
  subject:any
  phone:any
  message:any
  successPopup:boolean=false
  constructor(public api:ServiceService,public app:AppComponent) { }

  ngOnInit() {}
  contact(){
    let post={
      "name": this.name,
      "email": this.email,
      "mobile": this.phone,
      "query": this.message
  }
  console.log(post);
  this.api.Contact(post).subscribe({
    next:((res: any)=>{
      console.log(res);
      this.successPopup = true
      
    }),
    error: (err: any) => {
      alert("This field is not required")
    }
  })
  
  }
  closesuccess(){
    this.successPopup=false;
     this.name=undefined
    this.email=undefined
    this.phone=undefined
    this.message=undefined
  }
}
