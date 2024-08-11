import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  // Name:any;
  name=''
  email=''
  password=''
  mobile=''
  constructor(public api:ServiceService,public app:AppComponent) { }

  ngOnInit() {}
  submitForm() {
    // Validate input fields
    if (!this.email || !this.password || !this.mobile || !this.name) {
      this.app.warningpopup = true;
      return;
    }
  
    // Prepare the POST data
    let post = {
      "name": this.name,
      "image": "7424d1636a69c6c7e73588ab9a57d975e85c2b69dd2a90b3ca846bf6bedff179eaf0dc5952022c56b3b70964dab787f301978ab8493af71a97d3c13c83663a2b064221094c0e1858e7d6701933725ec7ba8e45091a228017fab001db00cf1c9cd9c72e7dca1bc3dd7f2f7957130a59b69af0546226cc7429666ae4cc46122d79e00fd86f5a7517aefb2b7c8527dca180963b088d70e32c04abf90c02c9b80ef45f3f6d7973fe2f96c158087931b27d985f5713a42540e2d2c9700f44c25e9c50bc6dbf9db248d4501e00340b9232839f7ec94f5c2db29d18962576ebc642289b322523ada3ce9e2f4d6d57d1552743056c8d63d3a749f0d25f954e7b7ea7214dd27c14120b1f6e9642626bb685c5c2e76ad6abeb44813f1290466379b03d0d953d02ba6af7034a3877f80f3f85a537a8f51ec03863f6afe9c9df99cf4fd34d9837c79d74ba0d1a1d0e7790539af460f3d0e274c1d58eb37152808ddaa03f1d6331c34be67e88d22a7d061314f0cffba857e552bc59f81ff6900b3901fa01078bb854aebc581a3d3b88a063e632cd84a5",
      "email": this.email,
      "mobile": this.mobile,
      "password": this.password
    };
  
    console.log(post);
      this.api.registerUser(post).subscribe({
      next: (res: any) => {
        console.log('Registration successful', res);
        this.app.successPopup = true;
      },
      error: (err: any) => {
        console.error('Registration failed', err);
        this.app.failedpopup = true;
      }
    });
  }
  
}
