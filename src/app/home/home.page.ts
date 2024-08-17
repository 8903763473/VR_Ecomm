import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  sliderInit3: any;
  category: any = []
  products: any = []
  singleCategory: any = []
  FilterId: string = '1';
  filterproduct: any = []
  highProduct: any = []
  private latestProductCache: any[] = [];
  private bestProductCache: any[] = [];
  private newProductCache: any[] = [];
  cartproduct: any = []
  cartAddproduct: any = []
  userId: any
  constructor(private renderer: Renderer2, public api: ServiceService, public route: Router) { }

  ngAfterViewInit() {
    this.Filter(this.FilterId);
    // this.loadScripts();
    this.getcategory();
    this.productcategory()
    this.HighOfferProduct();
    this.userId = localStorage.getItem('userId');
  }


  // GetCategory
  getcategory() {
    this.api.GetAllCategory().subscribe({
      next: (res) => {
        this.category = res
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
  // click category//
  productcategory() {
    this.api.getCategory().subscribe({
      next: (res) => {
        this.products = res
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  // single product
  singleproduct(data: any) {
    if (data === 'Vegetables') {
      this.singleCategory = this.products
      const singleCategoryJson = JSON.stringify(this.singleCategory);
      localStorage.setItem('products', singleCategoryJson)
      this.route.navigate(['/product', data]);
    }
  }

  // filter
  Filter(data: string) {
    this.FilterId = data;
    let cache: any[];
    this.filterproduct = []
    let apiCall;
    if (this.FilterId === '1') {
      cache = this.latestProductCache;
      apiCall = this.api.GetlatestProduct();
    } else if (this.FilterId === '2') {
      cache = this.bestProductCache;
      apiCall = this.api.GetbestProduct();
    } else if (this.FilterId === '3') {
      cache = this.newProductCache;
      apiCall = this.api.GetnewProduct();
    } else {
      console.log('Invalid FilterId');
      return;
    }
    if (cache.length > 0) {
      this.filterproduct = cache;
    } else {
      apiCall.subscribe({
        next: (res) => {
          if (this.FilterId === '1') {
            this.latestProductCache = res;
          } else if (this.FilterId === '2') {
            this.bestProductCache = res;
          } else if (this.FilterId === '3') {
            this.newProductCache = res;
          }
          this.filterproduct = res;
        },
        error: (err) => {
          console.error('Failed to fetch products', err);
        }
      });
    }
  }

  // high OfferProduct
  HighOfferProduct() {
    this.api.GethighOfferProduct().subscribe({
      next: (res => {
        this.highProduct = res

      })
    })
  }

  // productDetails
  ProductDetails(product: any) {
    this.route.navigate(['/productDetail', product._id]);
    const singleproduct = JSON.stringify(product);
    localStorage.setItem('singleproduct', singleproduct)
  }

  AddCart(data: any) {
    console.log(data);
    let post = {
      "productId": data._id,
      "quantity": data.productQuantity,
      "userId": this.userId
    }
    this.api.addCart(post).subscribe({
      next: (res => {
        console.log(res);
        this.cartproduct = res
        //  this.cartAddproduct = JSON.stringify(this.cartproduct);
        // localStorage.setItem('cart',this.cartAddproduct)
      })
    })
  }
}
