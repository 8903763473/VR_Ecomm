import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  constructor(public api: ServiceService, public route: Router) { }
  userDetails: any
  Id: any
  User: any = []
  cartproduct: any = []
  cartTotal: number = 0;
  DeleteAlertpopup: boolean = false
  EmptyCart: boolean = false
  ngOnInit() {
    this.Id = localStorage.getItem('userId');
    console.log('User Details:', this.userDetails);
    console.log(this.Id);
    // this.cartproduct.items = []
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
        this.EmptyCart = this.cartproduct.items.length === 0;
        this.calculateTotal();
     
      },
      error: (err) => {
        console.error('Error fetching cart products:', err);
        this.EmptyCart=true
      }
    });
  }

  calculateTotal() {
    this.cartTotal = this.cartproduct.items.reduce((accumulator: any, item: any) => {
      return accumulator + item.productCurrentRate * item.quantity;
    }, 0);
  }


  RemoveCart(item: any) {
    let productId = item.productId;
    this.api.removeCartItem(productId, this.Id).subscribe({
      next: (res: any) => {
        // this.getcartproduct();
        window.location.reload()
        console.log('Item removed:', res);
      },
      error: (err) => {
        console.error('Error removing cart item:', err);
      }
    });
  }

  deleteAllCart() {
    console.log('jsjjj');

    this.api.clearMyCart(this.Id).subscribe({
      next: (res: any) => {
        console.log('Cart cleared:', res);
        this.DeleteAlertpopup = false
      },
      error: (err) => {
        console.error('Error removing cart item:', err);
      }
    });
  }

  continueCart() {
    this.route.navigate(['/home']);
  }

  RouteCheckout() {
    this.route.navigate(['/CheckOut']);
  }

}
