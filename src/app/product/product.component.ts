import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {
  singleCategory:any=[]
  category:any=[]
  constructor() { }

  ngOnInit() {
    // Retrieve the JSON string from localStorage
    const singleCategoryJson = localStorage.getItem('products');
  
    // Check if the data exists and parse it
    if (singleCategoryJson) {
      this.category = JSON.parse(singleCategoryJson);
      console.log(this.category); // This should log the array of products
    } else {
      console.log('No data found in localStorage.');
      this.category = []; // Initialize to an empty array if no data found
    }
  }
  

}
