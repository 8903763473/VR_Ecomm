import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {
  singleCategory:any=[]
  category:any=[]
  constructor(public route:Router) { }

  ngOnInit() {
    const singleCategoryJson = localStorage.getItem('products');
      if (singleCategoryJson) {
      this.category = JSON.parse(singleCategoryJson);
      console.log(this.category); 
    } else {
      console.log('No data found in localStorage.');
      this.category = []; 
    }
  }
  
  ProductDetails(data:any){
console.log(data);
this.route.navigate(['/productDetail', data._id]);
const singleproduct = JSON.stringify(data);
localStorage.setItem('singleproduct',singleproduct)
  }
}
