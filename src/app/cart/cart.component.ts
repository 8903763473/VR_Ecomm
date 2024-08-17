import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent  implements OnInit {

  constructor(public api:ServiceService) { }
  userDetails:any=[]
  Id:any
  User:any=[]
  ngOnInit() {
    this.userDetails = localStorage.getItem('userId');
    console.log('User Details:', this.userDetails);
    this.Id = this.userDetails;
    console.log( this.Id );
    
    this.getcartproduct();
  }
  
 
  
  getcartproduct() {
    this.api.GetCart(this.Id).subscribe({
      next: (res) => {
        console.log('Cart Products:', res);
      },
      error: (err) => {
        console.error('Error fetching cart products:', err);
      }
    });
  }
  
}
