import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePage } from '../home/home.page';
import { AppComponent } from '../app.component';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {
  singleCategory:any=[]
  category:any=[]
  userId: any;
  cartproduct: any = []
  totalQuantity:any
  CartaddPopup:boolean=false
  constructor(public route:Router,public api:ServiceService,public app:AppComponent) { }

  ngOnInit() {
    const singleCategoryJson = localStorage.getItem('products');
      if (singleCategoryJson) {
      this.category = JSON.parse(singleCategoryJson);
      console.log(this.category); 
    } else {
      console.log('No data found in localStorage.');
      this.category = []; 
    }
    this.userId = localStorage.getItem('userId');
  }
  
  ProductDetails(data:any){
console.log(data);
this.route.navigate(['/productDetail', data._id]);
const singleproduct = JSON.stringify(data);
localStorage.setItem('singleproduct',singleproduct)
  }

  AddCart(data: any) {
    // console.log(data);
    let post = {
        "productId": data._id,
        "quantity": data.productQuantity,
        "userId": this.userId
    };
    this.api.addCart(post).subscribe({
        next: (res => {
            console.log(res);
            this.cartproduct = res;
            this.totalQuantity = this.cartproduct?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0);
            // console.log(this.totalQuantity); 
            localStorage.setItem('cartquantity', this.totalQuantity.toString());
            this.CartaddPopup = true;
            setTimeout(() => {
                this.CartaddPopup = false;
            }, 3000);
        })
    });
}
}
