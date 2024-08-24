import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  constructor(public api: ServiceService) { }
  userDetails: any
  Id: any
  User: any = []
  cartproduct: any = []
  cartTotal: number = 0;
  ngOnInit() {
    this.Id = localStorage.getItem('userId');
    console.log('User Details:', this.userDetails);
    console.log(this.Id);
    this.getcartproduct();
  }

  getcartproduct() {
    let post = {
      "userId": this.Id
    }
    this.api.GetCart(post).subscribe({
      next: (res: any) => {
        this.cartproduct = res;
        console.log(this.cartproduct);

        this.calculateTotal();
        console.log('Cart Products:', res);
      },
      error: (err) => {
        console.error('Error fetching cart products:', err);
      }
    });
  }

  calculateTotal() {
    this.cartTotal = this.cartproduct.items.reduce((accumulator: any, item: any) => {
      return accumulator + item.productCurrentRate * item.quantity;
    }, 0);
  }


  RemoveCart(item: any) {
    console.log('Removing item:', item);
    
    let productId = item.productId;
  let post={
    "userId":this.Id
  }
    this.api.removeCartItem(productId,post).subscribe({
      next: (res: any) => {
        console.log('Item removed:', res);
      },
      error: (err) => {
        console.error('Error removing cart item:', err);
      }
    });
  }
  

}
