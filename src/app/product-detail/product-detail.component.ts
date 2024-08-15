import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnDestroy{
  constructor(private renderer: Renderer2) {}
  singleproduct:any
  productdetails:any=[]
  
  ngAfterViewInit() {
    this.Details()
  }

  Details(): void {
    this.singleproduct = localStorage.getItem('singleproduct');
    this.productdetails = JSON.parse(this.singleproduct);
    console.log('Product Details:', this.productdetails);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('singleproduct');
  }

}
